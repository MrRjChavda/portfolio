"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

const trophyItem = {
  title: "Editing With Lord Anos Voldigoad Is Live",
  image: "/anos-trophy.png",
  note: "Featured premiere thumbnail showcase with advanced lighting, composition, and high-impact color psychology.",
  section: "Masterpiece Trophy"
};

function ThumbnailCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="gallery-card-shell"
    >
      <article className="gallery-card glass-card group relative aspect-video w-full overflow-hidden rounded-[2rem] border border-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 50vw, (min-width: 768px) 70vw, 100vw"
          className="gallery-card-image beat-image object-cover opacity-90"
        />
        <div className="gallery-card-shade absolute inset-0" />
        <div className="gallery-card-sheen absolute inset-0" />
        <div className="pointer-events-none absolute inset-5 rounded-[1.45rem] border border-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="gallery-card-meta pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
          <span className="h-px flex-1 bg-gold/35" />
          <span className="font-ui text-[8px] uppercase tracking-[0.42em] text-gold/70">
            Ref. {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </article>
    </motion.div>
  );
}

function ThumbnailSection({ id, title, copy, items }) {
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
      
      <div className="gallery-grid grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, itemIndex) => (
          <ThumbnailCard 
            key={item.title} 
            item={item} 
            index={itemIndex}
          />
        ))}
      </div>
    </section>
  );
}

export default function PortfolioGallery() {
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
        
        <div className="featured-hover-wrap gallery-grid max-w-4xl mx-auto">
        <article 
          className="featured-gallery-card gallery-card glass-card group relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-gold/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        >
          <Image
            src={trophyItem.image}
            alt={trophyItem.title}
            fill
            priority
            sizes="(min-width: 1280px) 1000px, 100vw"
            className="gallery-card-image beat-image object-cover opacity-95"
          />
          <div className="gallery-card-shade absolute inset-0" />
          <div className="gallery-card-sheen absolute inset-0" />
          
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
        </article>
        </div>
      </section>

      <div className="h-px w-48 bg-gold/20 mx-auto" />

      {/* Classic Archive Section */}
      <ThumbnailSection
        id="classic-poster"
        title="Classical Archive"
        copy="A definitive collection of high-contrast thumbnail artwork and gaming posters, engineered for maximum visual command."
        items={classicPosters}
      />

      <div className="h-px w-48 bg-gold/20 mx-auto" />

      {/* Experimental AI Section */}
      <ThumbnailSection
        id="ai-thumbnail"
        title="Experimental AI"
        copy="Pushing the boundaries of generative aesthetics and cinematic lighting in modern creator visuals."
        items={aiThumbnails}
      />
    </div>
  );
}
