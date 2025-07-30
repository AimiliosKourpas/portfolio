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

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let isMobile = window.innerWidth < 768;

    const STAR_COUNT = isMobile ? 120 : 180;
    const FOCAL_STAR_COUNT = isMobile ? 10 : 18;
    const FOV = 350;
    const GALAXY_DEPTH = 1200;

    function resize() {
      const c = canvasRef.current;
      if (!c) return;

      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;

      c.width = width * DPR;
      c.height = height * DPR;
      c.style.width = `${width}px`;
      c.style.height = `${height}px`;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(DPR, DPR);
    }

    resize();
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
      resize();
    });

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
    }

    const stars: Star[] = [];
    const focalStars: FocalStar[] = [];

    let GALAXY_RADIUS = Math.min(centerX, centerY) * 0.75;

    function createStar(): Star {
      let radius = 0;
      while (radius < GALAXY_RADIUS * 0.2) {
        radius = Math.random() * GALAXY_RADIUS;
      }
      return {
        angle: Math.random() * 2 * Math.PI,
        radius,
        z: (Math.random() - 0.5) * GALAXY_DEPTH,
        r: Math.random() * 1.4 + 0.5,
        opacity: 0,
        born: performance.now(),
        twinkleSpeed: Math.random() * 0.001 + 0.0005,
        speed: Math.random() * 0.0007 + 0.0003,
        zSpeed: Math.random() * 0.3 + 0.15,
        baseHue: 180 + (Math.random() - 0.5) * 20,
      };
    }

    function createFocalStar(): FocalStar {
      return {
        angle: Math.random() * 2 * Math.PI,
        radius: Math.random() * GALAXY_RADIUS * 0.3,
        z: (Math.random() - 0.5) * GALAXY_DEPTH * 0.3,
        r: Math.random() * 3 + 2.5,
        baseHue: 180 + (Math.random() - 0.5) * 10,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    }

    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
    for (let i = 0; i < FOCAL_STAR_COUNT; i++) focalStars.push(createFocalStar());

    const rotationSpeed = 0.00015;
    let galaxyRotation = 0;

    function drawStar(
      x: number,
      y: number,
      radius: number,
      opacity: number,
      hue: number,
      twinklePhase: number
    ) {
      const glowRadius = radius * (isMobile ? 2 : 3);
      const grad = ctx!.createRadialGradient(x, y, 0, x, y, glowRadius);
      const twinkle = 0.8 + 0.2 * Math.sin(twinklePhase);

      grad.addColorStop(0, `hsla(${hue}, 100%, 95%, ${opacity * twinkle})`);
      grad.addColorStop(0.4, `hsla(${hue}, 100%, 80%, ${opacity * 0.4})`);
      grad.addColorStop(1, `hsla(${hue}, 100%, 80%, 0)`);

      ctx!.shadowBlur = glowRadius * 0.7;
      ctx!.shadowColor = `hsla(${hue}, 100%, 85%, ${opacity})`;

      ctx!.beginPath();
      ctx!.fillStyle = grad;
      ctx!.arc(x, y, radius, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.shadowBlur = 0;
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      galaxyRotation += rotationSpeed;
      const now = performance.now();

      for (const s of stars) {
        s.angle += s.speed;
        s.z += s.zSpeed;

        if (s.z > GALAXY_DEPTH / 2) {
          Object.assign(s, createStar());
          s.z = -GALAXY_DEPTH / 2;
        }

        const perspective = FOV / (FOV + s.z);
        const x = centerX + s.radius * Math.cos(s.angle + galaxyRotation) * perspective;
        const y = centerY + s.radius * Math.sin(s.angle + galaxyRotation) * perspective;
        const radius = s.r * perspective * 2;

        if (now - s.born < 1000) {
          s.opacity = Math.min(1, (now - s.born) / 600);
        } else {
          s.opacity += (Math.random() - 0.5) * s.twinkleSpeed;
          s.opacity = Math.max(0.8, Math.min(1, s.opacity));
        }

        const opacity = s.opacity * perspective;
        if (radius > 0.1 && opacity > 0) {
          drawStar(x, y, radius, opacity, s.baseHue, now * 0.003 + s.radius);
        }
      }

      for (const f of focalStars) {
        f.pulsePhase += 0.01;
        const pulse = 0.6 + 0.4 * Math.sin(f.pulsePhase);
        const perspective = FOV / (FOV + f.z);
        const x = centerX + f.radius * Math.cos(f.angle + galaxyRotation) * perspective;
        const y = centerY + f.radius * Math.sin(f.angle + galaxyRotation) * perspective;
        const radius = f.r * perspective * (1 + 0.25 * pulse);
        const opacity = 0.85 * pulse * perspective;

        drawStar(x, y, radius, opacity, f.baseHue, now * 0.008 + f.radius);
      }

      requestAnimationFrame(animate);
    }

    animate();

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
        touchAction: 'none',
      }}
    />
  );
}
