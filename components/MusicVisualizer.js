"use client";

import { useEffect, useState } from "react";

export default function MusicVisualizer() {
  const [frequencies, setFrequencies] = useState(new Array(48).fill(0));

  useEffect(() => {
    const onPulse = (event) => {
      if (event.detail?.frequencies) {
        const raw = event.detail.frequencies;
        const sampled = [];
        const bars = 48;
        const step = Math.floor(raw.length / bars);
        for (let i = 0; i < bars; i++) {
          sampled.push(raw[i * step] / 255);
        }
        setFrequencies(sampled);
      }
    };

    window.addEventListener("music-pulse", onPulse);
    return () => window.removeEventListener("music-pulse", onPulse);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[5] flex h-64 items-end justify-center gap-1 overflow-hidden pointer-events-none opacity-40 px-6 lg:px-24">
      {frequencies.map((freq, i) => (
        <div
          key={i}
          className="flex-grow max-w-[3px] bg-gradient-to-t from-gold/50 via-gold/10 to-transparent transition-all duration-100 ease-out"
          style={{
            height: `${Math.max(5, freq * 100)}%`,
            opacity: 0.1 + freq * 0.9,
            filter: `blur(${Math.max(0, 2 - freq * 4)}px)`,
            boxShadow: freq > 0.6 ? `0 0 20px rgba(var(--secondary-color-rgb), ${freq * 0.3})` : 'none'
          }}
        />
      ))}
      {/* Cinematic Fog Overlay for Visualizer */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-void via-transparent to-transparent h-1/3" />
    </div>
  );
}
