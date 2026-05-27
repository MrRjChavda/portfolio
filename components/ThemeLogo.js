"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = ["cream", "grey", "crimson", "void"];

function getNextTheme(currentTheme) {
  const availableThemes = themes.filter((theme) => theme !== currentTheme);
  return availableThemes[Math.floor(Math.random() * availableThemes.length)];
}

export default function ThemeLogo() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("raj-portfolio-theme") || "cream";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const randomizeTheme = () => {
    const currentTheme = document.documentElement.dataset.theme || "cream";
    const nextTheme = getNextTheme(currentTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("raj-portfolio-theme", nextTheme);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 800);
  };

  return (
    <button
      type="button"
      onClick={randomizeTheme}
      className="group relative flex flex-col items-start outline-none"
      aria-label="Randomize cinematic theme"
    >
      <motion.div
        animate={pulse ? { scale: [1, 1.05, 1], rotate: [0, 2, 0] } : {}}
        className="flex items-center gap-2"
      >
        <span className="font-display text-2xl font-semibold tracking-tighter text-cream group-hover:text-gold transition-colors duration-500">
          Raj H <span className="italic">Chavda</span>
        </span>
      </motion.div>
      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold/40 transition-all duration-700 group-hover:w-full" />
      
      {/* Visual Feedback on Theme Switch */}
      <AnimatePresence>
        {pulse && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute -inset-4 rounded-full border border-gold/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </button>
  );
}
