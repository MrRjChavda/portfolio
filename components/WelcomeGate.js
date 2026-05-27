"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeGate() {
  const [visible, setVisible] = useState(true);

  const enterSite = () => {
    window.dispatchEvent(new Event("portfolio-music-start"));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-background-void px-6"
        >
          {/* Cinematic Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,var(--theme-wash),transparent_40%),linear-gradient(135deg,var(--theme-bg),var(--theme-ink)_50%,var(--theme-bg))]" />
          <div className="cinematic-vignette" />
          
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[180px] animate-pulse-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold/3 blur-[200px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

          {/* Decorative Corner Details */}
          <div className="absolute top-12 left-12 h-24 w-24 border-t-2 border-l-2 border-gold/20" />
          <div className="absolute bottom-12 right-12 h-24 w-24 border-b-2 border-r-2 border-gold/20" />

          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card relative w-full max-w-2xl rounded-[3rem] border border-white/10 p-12 text-center shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] md:p-24"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mx-auto mb-10 flex items-center justify-center gap-4">
                 <span className="h-px w-8 bg-gold/30" />
                 <p className="editorial-eyebrow !text-gold/60 !tracking-[0.6em]">System Initialized</p>
                 <span className="h-px w-8 bg-gold/30" />
              </div>

              <h2 className="editorial-header !text-6xl md:!text-8xl !leading-[0.85] tracking-tighter">
                Raj H Chavda <br />
                <span className="editorial-subheader mt-6 block">
                  aka LORD ANOS VOLDIGOAD
                </span>
              </h2>
              
              <p className="editorial-copy mx-auto mt-12 max-w-md italic opacity-60 !text-base leading-relaxed">
                A high-fidelity creative archive engineered with atmospheric depth, motion, and reactive visual acoustics.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={enterSite}
              className="premium-button mt-16 bg-gold text-background-void min-w-[240px]"
            >
              Begin Experience
            </motion.button>
            
            <div className="mt-14 flex justify-center gap-4 opacity-20">
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span className="h-8 w-px bg-gold" />
              <span className="h-1 w-1 rounded-full bg-gold" />
            </div>
          </motion.div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
             <div className="h-16 w-px bg-gradient-to-b from-transparent to-gold" />
             <p className="font-ui text-[9px] uppercase tracking-[0.5em] text-gold">Audio Recommended</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
