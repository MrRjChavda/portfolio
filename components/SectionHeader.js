"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, copy, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
      <p className="editorial-eyebrow">
        {eyebrow}
      </p>
      <h2 className={`mt-6 editorial-header beat-text ${align === "center" ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {copy && (
        <p className="editorial-copy mt-8">
          {copy}
        </p>
      )}
    </motion.div>
  );
}
