"use client";

import { useEffect, useRef } from "react";

export default function AudioAuraBackdrop() {
  const canvasRef = useRef(null);
  const audioState = useRef({ bass: 0.1, mids: 0.1, treble: 0.1 });
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let time = 0;

    // Slow moving, luxury volumetric aurora gradients
    const auroras = [
      { 
        x: 0.2, 
        y: 0.3, 
        radius: 0.6, 
        baseColor: "215, 180, 100", // Gold
        speed: 0.0008, 
        phase: 0 
      },
      { 
        x: 0.8, 
        y: 0.7, 
        radius: 0.7, 
        baseColor: "185, 45, 45", // Crimson/Dark Red
        speed: 0.0006, 
        phase: Math.PI / 2 
      },
      { 
        x: 0.5, 
        y: 0.4, 
        radius: 0.55, 
        baseColor: "135, 80, 50", // Warm Copper
        speed: 0.0004, 
        phase: Math.PI 
      }
    ];

    // Cinematic floating dust particles
    const isSmall = width < 768;
    const dustCount = isSmall ? 25 : 55;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.6 + Math.random() * 1.8,
      speedX: -0.1 + Math.random() * 0.2,
      speedY: -0.15 - Math.random() * 0.3, // Slow upward drift
      alpha: 0.06 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      shimmerSpeed: 0.005 + Math.random() * 0.015,
      parallaxFactor: 0.15 + Math.random() * 0.7
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

    const onPulse = (event) => {
      const freqs = event.detail?.frequencies || [];
      const intensity = event.detail?.intensity || 0.1;

      if (freqs.length > 0) {
        // Calculate precise audio sub-bands
        let bassSum = 0;
        let midSum = 0;
        let trebleSum = 0;

        const bassCount = Math.floor(freqs.length * 0.18) || 1;
        const midCount = Math.floor(freqs.length * 0.45) || 1;

        for (let i = 0; i < freqs.length; i++) {
          const val = freqs[i] / 255;
          if (i < bassCount) bassSum += val;
          else if (i < bassCount + midCount) midSum += val;
          else trebleSum += val;
        }

        // Apply smooth decay/easing to audio inputs to prevent jerky motion
        audioState.current.bass += (bassSum / bassCount - audioState.current.bass) * 0.15;
        audioState.current.mids += (midSum / midCount - audioState.current.mids) * 0.12;
        audioState.current.treble += (trebleSum / (freqs.length - bassCount - midCount) - audioState.current.treble) * 0.18;
      } else {
        // Natural exponential decay if music stops
        audioState.current.bass += (intensity - audioState.current.bass) * 0.1;
        audioState.current.mids += (intensity * 0.8 - audioState.current.mids) * 0.08;
        audioState.current.treble += (intensity * 0.5 - audioState.current.treble) * 0.12;
      }
    };

    const onPointerMove = (e) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    const render = () => {
      time += 1;

      // Smoothly interpolate mouse coordinates for parallax damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Slowly decay audio state values
      audioState.current.bass *= 0.96;
      audioState.current.mids *= 0.96;
      audioState.current.treble *= 0.96;

      const bass = Math.max(0.06, audioState.current.bass);
      const mids = Math.max(0.06, audioState.current.mids);
      const treble = Math.max(0.04, audioState.current.treble);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      // 1. Draw Layered Volumetric Auroras (Light Waves)
      auroras.forEach((a) => {
        // mids speed up gradient wave drift
        a.phase += a.speed * (1 + mids * 3);
        const driftX = Math.sin(a.phase) * 0.18;
        const driftY = Math.cos(a.phase * 1.2) * 0.14;

        // Mouse Parallax Offset
        const mouseOffsetX = (mouseRef.current.x - 0.5) * 0.06;
        const mouseOffsetY = (mouseRef.current.y - 0.5) * 0.06;

        const cx = width * (a.x + driftX + mouseOffsetX);
        const cy = height * (a.y + driftY + mouseOffsetY);

        // Bass frequencies modulate size and glow intensity
        const radius = width * a.radius * (0.85 + bass * 0.35);
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

        // Elegant layered transparency gradients
        gradient.addColorStop(0, `rgba(${a.baseColor}, ${0.07 + bass * 0.14})`);
        gradient.addColorStop(0.3, `rgba(${a.baseColor}, ${0.03 + bass * 0.06})`);
        gradient.addColorStop(0.65, `rgba(${a.baseColor}, ${0.008 + bass * 0.015})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Floating Cinematic Dust Particles
      dustParticles.forEach((p) => {
        // Float speed is affected slightly by music bass pulses
        p.y += p.speedY * (1 + bass * 0.4);
        p.x += p.speedX;

        // Treble drives shimmer rates
        p.phase += p.shimmerSpeed * (1 + treble * 4);

        // Reset particle position when it drifts off-screen
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Apply mouse reactive parallax offset per particle depth factor
        const px = p.x + (mouseRef.current.x - 0.5) * 35 * p.parallaxFactor;
        const py = p.y + (mouseRef.current.y - 0.5) * 35 * p.parallaxFactor;

        // Treble triggers glowing shimmer alpha peaks
        const shimmer = Math.sin(p.phase) * 0.4 + 0.6;
        const alpha = p.alpha * shimmer * (1 + treble * 1.8);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        
        // Slightly warmer particle glow
        ctx.fillStyle = `rgba(235, 205, 140, ${Math.min(0.7, alpha)})`;
        ctx.fill();
      });

      // 3. Draw Luxury Glass Reflection Shimmer (Diagonal sweep)
      const sweepPosition = (time * 0.0003) % 2.5 - 0.5; // slow diagonal glide
      const gradSweep = ctx.createLinearGradient(
        width * (sweepPosition - 0.15), 0,
        width * (sweepPosition + 0.15), height
      );
      const shimmerAlpha = 0.003 + treble * 0.007;
      gradSweep.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradSweep.addColorStop(0.5, `rgba(255, 255, 255, ${shimmerAlpha})`);
      gradSweep.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = gradSweep;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("music-pulse", onPulse);
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("music-pulse", onPulse);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none fixed inset-0 z-[1] opacity-65 mix-blend-screen" 
      aria-hidden="true" 
    />
  );
}
