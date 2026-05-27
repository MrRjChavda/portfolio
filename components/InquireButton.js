"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function InquireButton({ className = "", label = "Inquire Project" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Push factor: 0.3 for smooth, premium magnetic feel
    setPosition({ x: x * 0.3, y: y * 0.3 });
    setMouseCoords({ x: clientX - left, y: clientY - top });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Dispatch custom event to trigger global transition after showing ripple slightly
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("trigger-inquiry-redirect"));
    }, 150);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <motion.button
      type="button"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gold/20 bg-gold/5 px-6 py-3.5 font-ui text-[9px] uppercase tracking-[0.25em] text-gold cursor-pointer shadow-[0_0_20px_rgba(201,163,93,0.02)] select-none group transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,163,93,0.12)] backdrop-blur-md ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Click Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-gold/30 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 120,
            height: 120,
            animation: "ripple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          }}
        />
      ))}

      {/* Internal Glass Reflection Sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-0" />
      
      {/* Cursor-Reactive Lighting Reflection */}
      <span 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(80px circle at ${mouseCoords.x}px ${mouseCoords.y}px, rgba(255, 255, 255, 0.12), transparent)`,
        }}
      />

      {/* Hover Background Accent Slide */}
      <motion.span 
        className="absolute inset-0 bg-gold -z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
      
      {/* Button Label Text */}
      <span className={`relative z-10 transition-colors duration-300 font-semibold ${isHovered ? "text-background-void" : "text-gold"}`}>
        {label}
      </span>
      
      {/* Subtle border illumination on hover */}
      <div className="absolute inset-0 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />
    </motion.button>
  );
}
