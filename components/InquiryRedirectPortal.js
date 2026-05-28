"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const emailAddress = "rajchavda120039@gmail.com";
const mailtoUrl =
  "mailto:rajchavda120039@gmail.com?subject=Project%20Inquiry%20-%20Creative%20Collaboration&body=Hello%20Raj%20H%20Chavda,%0A%0AI%20would%20like%20to%20discuss%20a%20creative%20project.%0A%0AProject%20Type:%0ABudget:%0ATimeline:%0A%0ABest%20regards,";
const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=rajchavda120039@gmail.com&su=Project%20Inquiry%20-%20Creative%20Collaboration&body=Hello%20Raj%20H%20Chavda,%0A%0AI%20would%20like%20to%20discuss%20a%20creative%20project.%0A%0AProject%20Type:%0ABudget:%0ATimeline:%0A%0ABest%20regards,";

export default function InquiryRedirectPortal() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountFrame = requestAnimationFrame(() => setMounted(true));

    const handleTrigger = () => {
      setActive(true);

      setTimeout(() => {
        setActive(false);
      }, 2600);
    };

    window.addEventListener("trigger-inquiry-redirect", handleTrigger);
    return () => {
      cancelAnimationFrame(mountFrame);
      window.removeEventListener("trigger-inquiry-redirect", handleTrigger);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background-void/98 backdrop-blur-2xl px-6"
        >
          {/* Decal Accents */}
          <div className="absolute top-12 left-12 h-20 w-20 border-t-2 border-l-2 border-gold/10" />
          <div className="absolute bottom-12 right-12 h-20 w-20 border-b-2 border-r-2 border-gold/10" />
          
          <div className="text-center space-y-6 max-w-lg">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold/25 bg-gold/5 font-ui text-[9px] uppercase tracking-[0.4em] text-gold animate-pulse">
              Establishing Secured Connection
            </span>
            <h2 className="editorial-header !text-4xl md:!text-5xl italic leading-none">Opening Inquiry Channels</h2>
            <div className="h-px w-24 bg-gold/30 mx-auto" />
            <p className="text-cream-soft/60 text-xs leading-relaxed max-w-sm">
              Your email client should open now. If it does not, use one of the fallback actions below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 font-ui text-[9px] uppercase tracking-[0.24em]">
              <a
                href={mailtoUrl}
                className="rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-gold transition hover:border-gold/50 hover:bg-gold hover:text-background-void"
              >
                Email Client
              </a>
              <a
                href={gmailUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-cream-soft transition hover:border-gold/40 hover:text-gold"
              >
                Gmail
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(emailAddress)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-cream-soft transition hover:border-gold/40 hover:text-gold"
              >
                Copy Email
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
