"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MusicToggle from "@/components/MusicToggle";
import ThemeLogo from "@/components/ThemeLogo";
import InquireButton from "@/components/InquireButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "process", "skills", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Process", href: "/#process", id: "process" },
    { name: "Gallery", href: "/thumbnails", id: "gallery" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <>
      <nav className={`fixed top-10 left-1/2 z-[100] flex w-[90%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/5 bg-black/20 px-6 py-4 backdrop-blur-3xl transition-all duration-1000 md:px-10 ${scrolled ? "top-6 !w-[95%] bg-black/40 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : ""}`}>
        <div className="flex items-center gap-10">
          <ThemeLogo />
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <span className="hidden font-ui text-[8px] uppercase tracking-[0.6em] text-gold/40 md:block">
            Lord Anos Voldigoad
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-5 py-2 font-ui text-[9px] uppercase tracking-[0.3em] transition-all duration-500 hover:text-gold ${activeSection === link.id ? "text-gold" : "text-cream-soft"}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(var(--secondary-color-rgb),0.8)]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-8">
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <MusicToggle />
          <InquireButton className="hidden md:flex !px-8 !py-3.5" label="Inquire" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-cream-soft transition-all duration-500 hover:border-gold/40 hover:text-gold lg:hidden"
          >
            <div className="flex flex-col gap-1.5 items-end">
               <span className={`h-px bg-current transition-all ${mobileMenuOpen ? "w-6 rotate-45 translate-y-1.5" : "w-6"}`} />
               <span className={`h-px bg-current transition-all ${mobileMenuOpen ? "opacity-0" : "w-4"}`} />
               <span className={`h-px bg-current transition-all ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-1" : "w-5"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-background-void/98 backdrop-blur-3xl lg:hidden"
          >
             <div className="flex items-center justify-between p-10">
                <ThemeLogo />
                <button onClick={() => setMobileMenuOpen(false)} className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-cream">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={1.5} /></svg>
                </button>
             </div>
             
             <ul className="flex flex-col gap-6 px-10 mt-20">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-display italic text-cream hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                
                {/* Mobile Inquire Action */}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.1 + 0.3 }}
                  className="mt-6 pt-6 border-t border-white/5"
                >
                  <InquireButton 
                    label="Start Project" 
                    className="w-full !py-4 text-center justify-center font-ui text-[10px] tracking-[0.3em] font-semibold"
                  />
                </motion.li>
             </ul>
             
             <div className="mt-auto p-10 border-t border-white/5 flex items-center justify-between">
                <MusicToggle />
                <span className="font-ui text-[8px] uppercase tracking-[0.5em] text-gold/40">Raj H Chavda</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
