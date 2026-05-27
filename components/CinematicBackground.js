"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CinematicBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      containerRef.current.style.setProperty("--mouse-x", `${x}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="theme-shell fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Base Cinematic Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(var(--secondary-color-rgb),0.08)_0%,transparent_60%)] transition-opacity duration-1000" />
      
      {/* Volumetric Lighting Layers */}
      <div className="volumetric-light opacity-40 mix-blend-screen" />
      
      {/* Moving Light Streaks */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
            y: ["0%", "20%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[10%] h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent blur-[2px]"
        />
        <motion.div
          animate={{
            x: ["100%", "-100%"],
            y: ["40%", "60%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-[3px]"
        />
        <motion.div
          animate={{
            x: ["-100%", "100%"],
            y: ["80%", "70%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[80%] h-[1px] w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-[2px]"
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" />

      {/* Grid Pattern with Depth */}
      <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_100%)]">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Ambient Fog / Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[180px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold/3 blur-[200px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
    </div>
  );
}
