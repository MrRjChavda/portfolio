"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import InquireButton from "@/components/InquireButton";

const classicOrder = [24, 1, 10, 14, 3, 20, 7, 12, 17, 5, 22, 9, 15, 2, 18, 11, 23, 4, 19, 6, 13, 8, 16, 21];
const aiOrder = [1, 5, 2, 7, 3, 6, 4];

const classicPosters = classicOrder.map((number) => ({
  title: `Classic Archive ${String(number).padStart(2, "0")}`,
  image: `/thumbnails/classic/classic ${number}.png`,
  note: "Premium thumbnail artwork engineered for maximum psychological impact and cinematic depth.",
}));

const aiThumbnails = aiOrder.map((number) => ({
  title: `AI Conceptual ${String(number).padStart(2, "0")}`,
  image: `/thumbnails/ai/ai ${number}.png`,
  note: "Generative art concepts exploring the future of gaming visuals and atmospheric storytelling.",
}));

// Masterpiece trophy item details
const trophyItem = {
  title: "Editing With Lord Anos Voldigoad Is Live",
  image: "/anos-trophy.png",
  note: "Featured premiere thumbnail showcase with advanced lighting, composition, and high-impact color psychology.",
  section: "Masterpiece Trophy"
};

// Combine all items in a master list for lightbox slider sequence
const allItems = [
  { ...trophyItem, globalIndex: 0 },
  ...classicPosters.map((item, index) => ({ ...item, section: "Classical Archive", globalIndex: index + 1 })),
  ...aiThumbnails.map((item, index) => ({ ...item, section: "Experimental AI", globalIndex: index + 1 + classicPosters.length }))
];

function ThumbnailCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card group relative aspect-video w-full overflow-hidden rounded-[2rem] border border-white/5 outline-none transition-all duration-700 beat-shake cursor-pointer text-left"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="beat-image object-cover opacity-90 transition-all duration-[2000ms] group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-110"
      />
      
      {/* Premium Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-void/90 via-background-void/25 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-50" />
      
      {/* Reflection Sweep Effect */}
      <div className="absolute inset-0 translate-x-[-150%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 translate-y-3 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
         <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <p className="editorial-eyebrow !text-[9px] !tracking-[0.5em] text-gold">Artifact Ref. {String(index + 1).padStart(2, '0')}</p>
         </div>
         <h4 className="font-display text-2xl italic text-cream leading-tight">{item.title}</h4>
         <div className="mt-6 flex items-center gap-4">
            <span className="font-ui text-[8px] uppercase tracking-[0.4em] text-cream-soft/50">Expand Artifact</span>
            <div className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5 group-hover:bg-gold group-hover:text-background-void transition-all duration-500">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </div>
         </div>
      </div>

      {/* Subtle Frame */}
      <div className="absolute inset-6 rounded-[1.5rem] border border-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
    </motion.button>
  );
}

function ThumbnailSection({ id, title, copy, items, globalStartIndex, onSelect }) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="mb-20 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <SectionHeader eyebrow="Curated Collection" title={title} copy={copy} />
        </div>
        <div className="glass-panel px-10 py-5 rounded-full border-gold/10 font-ui text-[10px] uppercase tracking-[0.4em] text-gold/80">
          <span className="opacity-30">Series:</span> {items.length} Artifacts
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, itemIndex) => (
          <ThumbnailCard 
            key={item.title} 
            item={item} 
            index={itemIndex} 
            onOpen={() => onSelect(globalStartIndex + itemIndex)}
          />
        ))}
      </div>
    </section>
  );
}

// Lightbox modal component with touch-drag swipe navigation, zoom details & email templates
function Lightbox({ index, items, onClose, onNext, onPrev }) {
  const item = items[index];
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Bind keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        onNext();
      }
      if (e.key === "ArrowLeft") {
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Mouse wheel zoom support
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomIntensity = 0.08;
    const delta = e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    setScale((prev) => Math.max(1, Math.min(3, prev + delta)));
  };

  // Follow cursor pan when zoomed in
  const handleMouseMove = (e) => {
    if (scale <= 1) return;
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const mouseX = (e.clientX - left) / width - 0.5;
    const mouseY = (e.clientY - top) / height - 0.5;

    // Pan bounds depending on current zoom scale
    const maxPanX = (scale - 1) * 200;
    const maxPanY = (scale - 1) * 150;

    setPan({
      x: -mouseX * maxPanX,
      y: -mouseY * maxPanY
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/90 backdrop-blur-2xl w-screen h-screen overflow-hidden select-none"
    >
      {/* Clickable Backdrop backdrop overlay */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Top Bar Controls */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 md:px-12 pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-gold/40" />
          <p className="editorial-eyebrow !text-[10px] text-gold">{item.section}</p>
          <span className="text-[10px] text-cream-soft/30 font-mono">[{index + 1} / {items.length}]</span>
        </div>
        
        <div className="flex items-center gap-6 pointer-events-auto">
          <span className="hidden md:inline font-mono text-[9px] text-gold/50 tracking-widest">
            {scale > 1 ? `ZOOMED ${Math.round(scale * 100)}%` : "SCROLL WHEEL TO ZOOM"}
          </span>
          <button 
            type="button"
            onClick={() => {
              setScale(scale > 1 ? 1 : 1.6);
              setPan({ x: 0, y: 0 });
            }} 
            className="text-[10px] uppercase tracking-[0.2em] text-cream-soft/60 hover:text-gold transition-colors font-ui outline-none cursor-pointer"
          >
            {scale > 1 ? "Reset [1x]" : "Zoom [1.6x]"}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-cream-soft hover:bg-gold hover:text-background-void transition-all duration-300 outline-none cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Viewport Center Workspace */}
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        className="relative flex-grow flex items-center justify-center overflow-hidden w-full h-full px-4 md:px-24"
      >
        {/* Floating Side Nav Controls */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 z-20 h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/40 text-cream-soft hover:border-gold/40 hover:text-gold hover:bg-gold/10 transition-all duration-300 outline-none cursor-pointer"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 z-20 h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/40 text-cream-soft hover:border-gold/40 hover:text-gold hover:bg-gold/10 transition-all duration-300 outline-none cursor-pointer"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fullscreen interactive image display */}
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: scale,
            x: pan.x,
            y: pan.y,
          }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ 
            type: "spring", 
            stiffness: 280, 
            damping: 26,
            x: { type: "tween", duration: 0.15 },
            y: { type: "tween", duration: 0.15 }
          }}
          drag={scale === 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, info) => {
            const threshold = 80;
            if (info.offset.x < -threshold) {
              onNext();
            } else if (info.offset.x > threshold) {
              onPrev();
            }
          }}
          className={`relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10 transition-shadow duration-300 ${
            scale > 1 ? "cursor-move shadow-[0_0_120px_rgba(var(--secondary-color-rgb),0.15)]" : "cursor-zoom-in"
          }`}
          onClick={(e) => {
            if (scale > 1) {
              setScale(1);
              setPan({ x: 0, y: 0 });
            } else {
              setScale(1.6);
            }
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="90vw"
            className="object-contain pointer-events-none select-none"
            priority
          />
        </motion.div>
      </div>

      {/* Bottom Info details */}
      <div className="relative z-10 px-6 pb-12 pt-6 md:px-12 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <h3 className="editorial-header !text-4xl md:!text-5xl !leading-tight">{item.title}</h3>
            <p className="mt-4 editorial-copy italic text-cream-soft/60 !text-sm leading-relaxed max-w-2xl">{item.note}</p>
          </div>
          
          <div className="flex items-center gap-6 font-ui text-[10px]">
             <button 
                type="button" 
                onClick={onClose} 
                className="premium-button border border-white/10 text-cream-soft !px-6 !py-3 cursor-pointer"
             >
                Close Gallery
             </button>
             <InquireButton 
                label="Inquire Project"
                className="!px-6 !py-3 font-semibold"
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGallery() {
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Lock body scroll when modal opens
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItemIndex]);

  // Set client mount flag
  useEffect(() => {
    const mountFrame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(mountFrame);
  }, []);



  return (
    <div id="thumbnails" className="space-y-28 pb-40">
      {/* Featured Trophy Section */}
      <section id="trophy-featured" className="scroll-mt-40">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/40" />
              <p className="editorial-eyebrow !text-gold">Masterpiece Trophy</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl italic text-cream leading-tight">Featured Showcase</h2>
            <p className="mt-4 text-cream-soft/60 text-sm leading-relaxed">
              The premier cinematic thumbnail: &quot;Editing With Lord Anos Voldigoad Is Live&quot;. Engineered for high-end engagement, lighting depth, and color psychology.
            </p>
          </div>
        </div>
        
        <div 
          onClick={() => setActiveItemIndex(0)}
          className="glass-card group relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-gold/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] max-w-4xl mx-auto cursor-pointer"
        >
          <Image
            src="/anos-trophy.png"
            alt="Editing With Lord Anos Voldigoad Is Live"
            fill
            priority
            sizes="(min-width: 1280px) 1000px, 100vw"
            className="beat-image object-cover opacity-95 transition-all duration-[3000ms] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-void/90 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle Cyber Decal elements */}
          <div className="absolute top-6 left-8 font-ui text-[8px] tracking-[0.4em] text-gold/40">CLASSIFIED // RECORD.01</div>
          <div className="absolute bottom-6 right-8 font-mono text-[8px] tracking-[0.2em] text-gold/40">SYSTEM.MASTERPIECE.v1</div>
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-auto">
            <div>
              <h3 className="font-display text-2xl md:text-3xl italic text-cream">Editing With Lord Anos Voldigoad Is Live</h3>
            </div>
            <div className="flex gap-4">
              <InquireButton 
                label="Inquire Project"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-48 bg-gold/20 mx-auto" />

      {/* Classic Archive Section */}
      <ThumbnailSection
        id="classic-poster"
        title="Classical Archive"
        copy="A definitive collection of high-contrast thumbnail artwork and gaming posters, engineered for maximum visual command."
        items={classicPosters}
        globalStartIndex={1}
        onSelect={setActiveItemIndex}
      />

      <div className="h-px w-48 bg-gold/20 mx-auto" />

      {/* Experimental AI Section */}
      <ThumbnailSection
        id="ai-thumbnail"
        title="Experimental AI"
        copy="Pushing the boundaries of generative aesthetics and cinematic lighting in modern creator visuals."
        items={aiThumbnails}
        globalStartIndex={1 + classicPosters.length}
        onSelect={setActiveItemIndex}
      />

      {/* Lightbox Gallery Modal with AnimatePresence rendered inside a React Portal */}
      <AnimatePresence>
        {activeItemIndex !== null && mounted && typeof window !== "undefined" && (
          createPortal(
            <Lightbox
              key={activeItemIndex}
              index={activeItemIndex}
              items={allItems}
              onClose={() => setActiveItemIndex(null)}
              onNext={() => setActiveItemIndex((activeItemIndex + 1) % allItems.length)}
              onPrev={() => setActiveItemIndex((activeItemIndex - 1 + allItems.length) % allItems.length)}
            />,
            document.body
          )
        )}
      </AnimatePresence>


    </div>
  );
}
