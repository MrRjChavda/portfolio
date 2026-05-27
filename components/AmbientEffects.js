"use client";

import { useEffect, useRef } from "react";

export default function AmbientEffects() {
  const canvasRef = useRef(null);
  const pulseRef = useRef(0.18);
  const pointerRef = useRef({ x: 0.5, y: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    const isSmall = width < 768;
    const count = isSmall ? 26 : 48;

    const particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * (index % 4 === 0 ? 2.6 : 1.4),
      speed: 0.08 + Math.random() * 0.32,
      drift: -0.18 + Math.random() * 0.36,
      kind: index % 7 === 0 ? "rune" : index % 3 === 0 ? "ember" : "snow",
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getThemeRgb = (name, fallback) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return value || fallback;
    };

    const onMusicPulse = (event) => {
      pulseRef.current = Math.max(0.16, Math.min(1, event.detail?.intensity || 0.16));
    };

    const onPointerMove = (event) => {
      pointerRef.current.x = event.clientX / width;
      pointerRef.current.y = event.clientY / height;
    };

    const drawRune = (particle, accent, alpha) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(time * 0.006 + particle.phase);
      ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, particle.size * 2.8, 0, Math.PI * 2);
      ctx.moveTo(-particle.size * 2, 0);
      ctx.lineTo(particle.size * 2, 0);
      ctx.moveTo(0, -particle.size * 2);
      ctx.lineTo(0, particle.size * 2);
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      time += 1;
      const pulse = Math.max(0.16, pulseRef.current);
      pulseRef.current = Math.max(0.16, pulseRef.current * 0.95);

      const primary = getThemeRgb("--primary-color-rgb", "235, 235, 235");
      const accent = getThemeRgb("--secondary-color-rgb", "201, 163, 93");

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const mist = ctx.createRadialGradient(
        width * pointerRef.current.x,
        height * pointerRef.current.y,
        0,
        width * pointerRef.current.x,
        height * pointerRef.current.y,
        width * 0.52
      );
      mist.addColorStop(0, `rgba(${accent}, ${0.025 + pulse * 0.05})`);
      mist.addColorStop(0.4, `rgba(${accent}, ${0.01 + pulse * 0.02})`);
      mist.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const sway = Math.sin(time * 0.01 + particle.phase) * 0.5;
        particle.x += particle.drift + sway * 0.15;
        particle.y += particle.kind === "ember" ? -particle.speed * (1.1 + pulse * 1.5) : particle.speed * (0.8 + pulse * 0.6);

        if (particle.y > height + 40) particle.y = -40;
        if (particle.y < -40) particle.y = height + 40;
        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;

        const alpha = particle.kind === "snow" ? 0.04 + pulse * 0.08 : 0.06 + pulse * 0.2;

        if (particle.kind === "rune") {
          drawRune(particle, accent, alpha * 0.4);
          return;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (particle.kind === "ember" ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fillStyle =
          particle.kind === "ember"
            ? `rgba(${accent}, ${alpha})`
            : `rgba(${primary}, ${alpha * 0.6})`;
        ctx.fill();

        // High-performance glow simulation: draw a larger, faint circle instead of heavy shadowBlur
        if (alpha > 0.02) {
          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size * (particle.kind === "ember" ? 4.5 : 2.5),
            0,
            Math.PI * 2
          );
          ctx.fillStyle =
            particle.kind === "ember"
              ? `rgba(${accent}, ${alpha * 0.2})`
              : `rgba(${primary}, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      ctx.globalCompositeOperation = "source-over";
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("music-pulse", onMusicPulse);
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("music-pulse", onMusicPulse);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[3] opacity-70" aria-hidden="true" />;
}
