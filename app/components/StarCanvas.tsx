'use client';

import { useEffect, useRef } from 'react';

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;
    let GALAXY_RADIUS = Math.min(centerX, centerY) * 0.8;

    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 150 : 500;
    const FOCAL_STAR_COUNT = isMobile ? 10 : 20;
    const FOV = 600;
    const GALAXY_DEPTH = 2000;

    let stars: Star[] = [];
    let focalStars: FocalStar[] = [];

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

    function initStars() {
      stars = [];
      focalStars = [];
      for (let i = 0; i < STAR_COUNT; i++) stars.push(create3DStar());
      for (let i = 0; i < FOCAL_STAR_COUNT; i++) focalStars.push(createFocalStar());
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
      GALAXY_RADIUS = Math.min(centerX, centerY) * 0.8;

      canvas!.width = width * DPR;
      canvas!.height = height * DPR;

      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(DPR, DPR);

      initStars();
    }

    resizeCanvas();

    const rotationSpeed = 0.0002;
    let galaxyRotation = 0;

    const FPS = isMobile ? 30 : 60;
    const frameDuration = 1000 / FPS;
    let lastFrameTime = performance.now();

    let animationRunning = true;
    document.addEventListener('visibilitychange', () => {
      animationRunning = !document.hidden;
      if (animationRunning) {
        lastFrameTime = performance.now();
        requestAnimationFrame(draw);
      }
    });

    function drawStar(
      x: number,
      y: number,
      radius: number,
      opacity: number,
      hue: number,
      twinklePhase: number
    ) {
      if (!ctx) return;

      const glowRadius = isMobile ? radius * 1.5 : radius * 3;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      const twinkleFactor = 0.7 + 0.3 * Math.sin(twinklePhase);
      grad.addColorStop(0, `hsla(${hue}, 100%, 95%, ${opacity * twinkleFactor})`);
      grad.addColorStop(0.3, `hsla(${hue}, 100%, 85%, ${opacity * twinkleFactor * 0.4})`);
      grad.addColorStop(1, `hsla(${hue}, 100%, 85%, 0)`);

      if (!isMobile) {
        ctx.shadowBlur = glowRadius;
        ctx.shadowColor = `hsla(${hue}, 100%, 90%, ${opacity * twinkleFactor})`;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function draw(now = performance.now()) {
      if (!animationRunning) return;

      if (now - lastFrameTime < frameDuration) {
        requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;

      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = '#000';
      ctx!.fillRect(0, 0, width, height);

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

        // progress from farthest to closest
        const progress = (star.z + GALAXY_DEPTH / 2) / GALAXY_DEPTH;
        const shrinkingRadius = star.radius * (1 - progress);

        const perspective = FOV / (FOV + star.z);
        const x = centerX + shrinkingRadius * Math.cos(star.angle + galaxyRotation) * perspective;
        const y = centerY + shrinkingRadius * Math.sin(star.angle + galaxyRotation) * perspective;
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

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout | null = null;
    function onResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 200);
    }

    window.addEventListener('resize', onResize);

    draw();

    return () => {
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('resize', onResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'black',
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
}
