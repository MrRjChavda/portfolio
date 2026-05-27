"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CinematicPortrait() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    
    // Max 10 degrees tilt for premium, cinematic feel
    setRotate({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative group flex justify-center lg:justify-end select-none">
      {/* Background Ambient Red/Gold Glow Orb */}
      <div 
        className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-red-800/10 via-gold/5 to-transparent blur-[80px] opacity-70 transition-opacity duration-700 group-hover:opacity-100" 
        style={{
          transform: `translate3d(${rotate.x * 2.5}px, ${-rotate.y * 2.5}px, 0)`,
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      />
      
      {/* Parallax Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
        className="relative w-full max-w-[280px] aspect-[4/5] cursor-pointer drop-shadow-[0_0_35px_rgba(0,0,0,0.9)] filter"
      >
        {/* Outer Tech border with cut corners */}
        <div className="absolute inset-0 p-[1.5px] bg-gradient-to-br from-gold/30 via-red-950/20 to-gold/20 [clip-path:polygon(28px_0,100%_0,100%_calc(100%-28px),calc(100%-28px)_100%,0_100%,0_28px)] transition-all duration-500 group-hover:from-gold/55 group-hover:to-red-500/40">
          
          {/* Inner Card Container */}
          <div className="absolute inset-[1.5px] bg-background-void/90 overflow-hidden [clip-path:polygon(27px_0,100%_0,100%_calc(100%-27px),calc(100%-27px)_100%,0_100%,0_27px)]">
            
            {/* Graded Portrait Image */}
            <Image
              src="/raj-suit-graded.png"
              alt="Raj H Chavda Cinematic Portrait"
              fill
              priority
              sizes="280px"
              className="object-cover object-[center_30%]"
              style={{
                transform: `translate3d(${rotate.x * -0.6}px, ${-rotate.y * -0.6}px, 0) scale(${isHovered ? 1.15 : 1.1})`,
                transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            />

            {/* Inner Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(8,8,10,0.85)_100%)] pointer-events-none" />

            {/* Dark Red Ambient Overlay to blend with environment */}
            <div className="absolute inset-0 bg-red-950/10 mix-blend-color-burn pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-void via-transparent to-transparent opacity-80 pointer-events-none" />
            
            {/* Inset Shadow Overlay for Depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] pointer-events-none" />

            {/* Glass Flare Reflection */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-30 transition-opacity duration-500 group-hover:opacity-55" 
              style={{
                transform: `translate3d(${rotate.x * 2}px, ${-rotate.y * 2}px, 0)`,
                transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            />

            {/* Future UI Decals / Corner Markings */}
            <div className="absolute top-4 left-8 font-ui text-[7px] tracking-[0.3em] text-gold/30 font-semibold uppercase">PORTRAIT // RAJ</div>
            <div className="absolute bottom-4 right-8 font-mono text-[7px] tracking-[0.2em] text-gold/40">ANOS_VOLDIGOAD.SYS</div>

            {/* Top-Right Tick */}
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/40" />
            {/* Bottom-Left Tick */}
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/40" />
          </div>
        </div>

        {/* Outer corner frame brackets (Offset from the card itself) */}
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/25 pointer-events-none rounded-tl-lg transition-all duration-500 group-hover:-top-1.5 group-hover:-left-1.5 group-hover:border-gold/50" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/25 pointer-events-none rounded-br-lg transition-all duration-500 group-hover:-bottom-1.5 group-hover:-right-1.5 group-hover:border-gold/50" />
      </motion.div>
    </div>
  );
}
