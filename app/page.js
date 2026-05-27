"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import InquireButton from "@/components/InquireButton";

const heroLines = [
  "Thumbnail Architecture",
  "Cinematic Poster Design",
  "Creative Visual Engineering",
];

const processSteps = [
  { step: "01", title: "Discovery", copy: "Analyzing the creator's vision and target audience psychology." },
  { step: "02", title: "Conceptualization", copy: "Drafting high-impact layouts with focus on hierarchy and flow." },
  { step: "03", title: "Engineering", copy: "Meticulous pixel-work involving lighting, textures, and depth." },
  { step: "04", title: "Refinement", copy: "Final color grading and sharpening for maximum visual punch." },
];

const contactLinks = [
  { label: "Discord", value: "lord_anos_voldigoad", href: "https://discord.gg/954eYvkRtC", mark: "D" },
  { label: "Instagram", value: "Lord_Anos_Voldigoad", href: "https://www.instagram.com/mr_rjchavda", mark: "I" },
  { label: "Email", value: "rajchavda120039@gmail.com", href: "mailto:rajchavda120039@gmail.com", mark: "@" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(15px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function Home() {

  return (
    <main className="relative z-10 flex-grow">
      {/* Hero Section - AAA Cinematic Entrance */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-12 lg:px-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/raj-hero.png"
            alt="Raj H Chavda hero portrait"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-10 blur-[8px] transition-all duration-[5000ms] hover:scale-110 hover:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-void via-background-void/60 to-background-void" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background-void via-background-void/40 to-transparent" />
        </div>
        
        <div className="mx-auto w-full max-w-7xl">
          <div className="cinematic-grid items-center">
            <motion.div
              className="col-span-12 lg:col-span-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <span className="h-px w-12 bg-gold/40" />
                <p className="editorial-eyebrow">
                  Cinematic Creative Portfolio
                </p>
              </motion.div>
              
              <motion.h1
                variants={fadeUp}
                className="editorial-header mt-10 beat-text"
              >
                Raj H Chavda <br />
                <span className="editorial-subheader mt-4 block">
                  aka LORD ANOS VOLDIGOAD
                </span>
              </motion.h1>
              
              <motion.div variants={fadeUp} className="mt-14 space-y-4">
                {heroLines.map((line, index) => (
                  <div
                    key={line}
                    className="group flex items-center gap-6 font-display text-2xl italic text-cream-soft/80 md:text-4xl transition-all duration-700 hover:text-gold hover:translate-x-4 beat-shake"
                    style={{ paddingLeft: `${index * 2}rem` }}
                  >
                    <span className="h-px w-12 bg-gold/15 transition-all group-hover:w-20 group-hover:bg-gold/60" />
                    {line}
                  </div>
                ))}
              </motion.div>
              
              <motion.p variants={fadeUp} className="editorial-copy mt-16 border-l border-gold/20 pl-10 italic leading-relaxed beat-text">
                Engineering high-fidelity visual artifacts for creators who demand 
                a cinematic edge. Specializing in high-contrast thumbnails, 
                poster artwork, and professional brand aesthetics.
              </motion.p>
              
              <motion.div variants={fadeUp} className="mt-16 flex flex-wrap gap-8">
                <a href="/thumbnails" className="premium-button bg-gold text-background-void">
                  Launch Archive
                </a>
                <InquireButton label="Secure Inquiry" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80, filter: "blur(30px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="col-span-12 lg:col-span-4 hidden lg:block"
            >
              <div className="relative aspect-[3/4] w-full max-w-[400px] ml-auto">
                <div className="absolute -inset-10 bg-gold/5 blur-[100px] animate-pulse-glow" />
                <div className="glass-card relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-gold/10">
                  <Image
                    src="/raj-hero.png"
                    alt="Raj H Chavda"
                    fill
                    priority
                    sizes="400px"
                    className="beat-image object-cover transition-all duration-[4000ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-void/80 via-transparent to-transparent" />
                </div>
                {/* Visual Details */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 border-b-2 border-r-2 border-gold/30 beat-border" />
                <div className="absolute -top-6 -left-6 h-24 w-24 border-t-2 border-l-2 border-gold/30 beat-border" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Identity & Philosophy */}
      <section id="about" className="relative px-6 py-32 md:px-12 lg:px-16 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="cinematic-grid gap-20 lg:items-center">
            <div className="col-span-12 lg:col-span-5">
              <SectionHeader
                eyebrow="The Identity"
                title="Lord Anos Voldigoad."
                copy="A darker, sharper visual signature tailored for premium digital presence. Established to bridge the gap between simple design and cinematic engineering."
              />
              <div className="mt-12 space-y-8">
                 <div className="flex gap-6">
                    <span className="text-gold font-display italic text-4xl">01</span>
                    <div>
                       <h4 className="text-cream font-ui text-xs uppercase tracking-widest mb-2">Cinematic Depth</h4>
                       <p className="text-cream-soft/70 text-sm leading-relaxed">Focusing on volumetric lighting and high-contrast composition to create immersion.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <span className="text-gold font-display italic text-4xl">02</span>
                    <div>
                       <h4 className="text-cream font-ui text-xs uppercase tracking-widest mb-2">Editorial Precision</h4>
                       <p className="text-cream-soft/70 text-sm leading-relaxed">Applying high-end magazine layout principles to digital thumbnails and posters.</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
               <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { title: "Visual Mastery", icon: "✧", desc: "Commanding attention through specialized visual psychology." },
                    { title: "Color Science", icon: "❈", desc: "Sophisticated grading that defines the mood of every project." },
                    { title: "Texture & Grain", icon: "⁂", desc: "Adding tactile, high-end feel to digital surfaces." },
                    { title: "Motion Flow", icon: "∿", desc: "Fluid transitions that guide the viewer's eye with intent." },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-10 group"
                    >
                      <span className="text-gold text-3xl mb-6 block transition-transform group-hover:scale-125 group-hover:rotate-12">{item.icon}</span>
                      <h4 className="text-cream font-display text-2xl italic mb-4">{item.title}</h4>
                      <p className="text-cream-soft/60 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - High-End Workflow */}
      <section id="process" className="relative px-6 py-32 md:px-12 lg:px-16 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="The Workflow"
            title="Surgical Process."
            copy="Meticulous steps taken to ensure every deliverable meets the AAA standard."
            align="center"
          />
          <div className="mt-24 grid gap-12 md:grid-cols-4">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="flex flex-col gap-6">
                  <span className="text-gold/20 font-display text-7xl italic leading-none transition-colors group-hover:text-gold/40">{item.step}</span>
                  <h4 className="text-cream font-ui text-[11px] uppercase tracking-[0.4em]">{item.title}</h4>
                  <p className="text-cream-soft/60 text-xs leading-relaxed max-w-[200px]">{item.copy}</p>
                </div>
                {i < 3 && <div className="absolute top-1/2 -right-6 h-px w-12 bg-gold/10 hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Final Call to Action */}
      <section id="contact" className="px-6 py-32 md:px-12 lg:px-16">
        <div className="glass-card mx-auto max-w-5xl overflow-hidden rounded-[3rem] p-12 md:p-24 text-center">
          <SectionHeader
            eyebrow="Get in touch"
            title="Inaugurate a Collaboration."
            copy="Secure a slot for your next high-fidelity creative project. Available for select commissions only."
            align="center"
          />
          <div className="mt-12 mb-16 flex justify-center">
            <InquireButton label="Start Project" className="!px-10 !py-5 text-[10px] font-semibold" />
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-12">
            {contactLinks.map((link) => {
              const isEmail = link.label === "Email";
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (isEmail) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent("trigger-inquiry-redirect"));
                    }
                  }}
                  target={isEmail ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-3 max-w-[280px]"
                >
                  <div className="h-16 w-16 flex items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-all duration-500 group-hover:bg-gold group-hover:text-background-void group-hover:shadow-[0_0_30px_rgba(var(--secondary-color-rgb),0.4)]">
                    <span className="font-display text-2xl italic">{link.mark}</span>
                  </div>
                  <span className="text-cream-muted font-ui text-[9px] uppercase tracking-widest">{link.label}</span>
                  <span className="text-gold/80 font-ui text-[10px] break-all opacity-60 transition-opacity duration-300 group-hover:opacity-100">{link.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>



      <footer className="px-6 py-20 text-center">
        <div className="h-px w-32 bg-gold/20 mx-auto mb-12" />
        <p className="font-ui text-[9px] uppercase tracking-[0.5em] text-gold/40">
          © 2026 RAJ H CHAVDA // LORD ANOS VOLDIGOAD // ESTABLISHED FOR CINEMATIC EXCELLENCE
        </p>
      </footer>
    </main>
  );
}
