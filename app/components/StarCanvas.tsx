'use client';

import { useEffect, useRef } from 'react';

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Fix #1: guard canvas null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Fix #2: guard ctx null

    const DPR = window.devicePixelRatio || 1;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    function resize() {
      // Guard again in case canvas became null (rare)
      const c = canvasRef.current;
      if (!c) return;

      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;

      c.width = width * DPR;
      c.height = height * DPR;

      const cCtx = c.getContext('2d');
      if (!cCtx) return;

      cCtx.setTransform(1, 0, 0, 1, 0, 0);
      cCtx.scale(DPR, DPR);
    }

    window.addEventListener('resize', resize);
    resize();

    // Your starfield logic unchanged from here...

    interface Star {
      angle: number;
      radius: number;
      z: number;
      r: number;
      opacity: number;
      born: number;
      twinkleSpeed: number;
      speed: number;
      zSpeed: number;
      baseHue: number;
    }

    interface FocalStar {
      angle: number;
      radius: number;
      z: number;
      r: number;
      baseHue: number;
      pulsePhase: number;
      opacity: number;
    }

    const STAR_COUNT = 500;
    const FOCAL_STAR_COUNT = 20;
    const FOV = 600;
    const GALAXY_DEPTH = 2000;
    let GALAXY_RADIUS = Math.min(centerX, centerY) * 0.8;

    function create3DStar(): Star {
      const minRadius = GALAXY_RADIUS * 0.2;
      let radius = 0;
      while (radius < minRadius) {
        radius = Math.random() * GALAXY_RADIUS;
      }
      return {
        angle: Math.random() * 2 * Math.PI,
        radius,
        z: (Math.random() - 0.5) * GALAXY_DEPTH,
        r: Math.random() * 1.5 + 0.7,
        opacity: 0,
        born: performance.now(),
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        speed: Math.random() * 0.001 + 0.0005,
        zSpeed: Math.random() * 0.5 + 0.2,
        baseHue: 180 + (Math.random() - 0.5) * 20,
      };
    }

    function createFocalStar(): FocalStar {
      return {
        angle: Math.random() * 2 * Math.PI,
        radius: Math.random() * GALAXY_RADIUS * 0.3,
        z: (Math.random() - 0.5) * GALAXY_DEPTH * 0.3,
        r: Math.random() * 3 + 2.5,
        baseHue: 180 + (Math.random() - 0.5) * 15,
        pulsePhase: Math.random() * Math.PI * 2,
        opacity: 1,
      };
    }

    const stars: Star[] = [];
    const focalStars: FocalStar[] = [];

    for (let i = 0; i < STAR_COUNT; i++) stars.push(create3DStar());
    for (let i = 0; i < FOCAL_STAR_COUNT; i++) focalStars.push(createFocalStar());

    const rotationSpeed = 0.0002;
    let galaxyRotation = 0;

    function drawStar(
      x: number,
      y: number,
      radius: number,
      opacity: number,
      hue: number,
      twinklePhase: number
    ) {
      // Guard ctx again before using
      if (!ctx) return;

      const glowRadius = radius * 3;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      const twinkleFactor = 0.7 + 0.3 * Math.sin(twinklePhase);
      grad.addColorStop(0, `hsla(${hue}, 100%, 95%, ${opacity * twinkleFactor})`);
      grad.addColorStop(0.3, `hsla(${hue}, 100%, 85%, ${opacity * twinkleFactor * 0.4})`);
      grad.addColorStop(1, `hsla(${hue}, 100%, 85%, 0)`);

      ctx.shadowBlur = glowRadius;
      ctx.shadowColor = `hsla(${hue}, 100%, 90%, ${opacity * twinkleFactor})`;

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function draw() {
      // Guard ctx again
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const now = performance.now();
      galaxyRotation += rotationSpeed;

      for (const star of stars) {
        star.angle += star.speed;
        star.z += star.zSpeed;

        if (star.z > GALAXY_DEPTH / 2) {
          star.z = -GALAXY_DEPTH / 2;
          star.angle = Math.random() * 2 * Math.PI;

          let newRadius = 0;
          const minRadius = GALAXY_RADIUS * 0.2;
          while (newRadius < minRadius) {
            newRadius = Math.random() * GALAXY_RADIUS;
          }
          star.radius = newRadius;

          star.r = Math.random() * 1.5 + 0.7;
          star.born = now;
          star.baseHue = 180 + (Math.random() - 0.5) * 20;
        }

        const perspective = FOV / (FOV + star.z);
        const x = centerX + star.radius * Math.cos(star.angle + galaxyRotation) * perspective;
        const y = centerY + star.radius * Math.sin(star.angle + galaxyRotation) * perspective;
        const radius = star.r * perspective * 2;
        const elapsed = now - star.born;

        if (elapsed < 1000) {
          star.opacity = Math.min(1, elapsed / 600);
        } else {
          star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
          star.opacity = Math.max(0.8, Math.min(1, star.opacity));
        }

        const opacity = star.opacity * perspective;
        if (radius > 0.1 && opacity > 0) {
          drawStar(x, y, radius, opacity, star.baseHue, now * 0.005 + star.radius);
        }
      }

      for (const fStar of focalStars) {
        fStar.pulsePhase += 0.01;
        const pulse = 0.5 + 0.5 * Math.sin(fStar.pulsePhase);
        const perspective = FOV / (FOV + fStar.z);
        const x = centerX + fStar.radius * Math.cos(fStar.angle + galaxyRotation) * perspective;
        const y = centerY + fStar.radius * Math.sin(fStar.angle + galaxyRotation) * perspective;
        const radius = fStar.r * perspective * (1 + 0.3 * pulse);
        const opacity = 0.8 * pulse * perspective;

        drawStar(x, y, radius, opacity, fStar.baseHue, now * 0.01 + fStar.radius);
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
}
