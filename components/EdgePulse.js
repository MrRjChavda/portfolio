"use client";

import { useEffect } from "react";

export default function EdgePulse() {
  useEffect(() => {
    const root = document.documentElement;

    const onPulse = (event) => {
      const intensity = Math.max(0, Math.min(1, event.detail?.intensity || 0));
      root.style.setProperty("--edge-pulse", String(intensity));
    };

    window.addEventListener("music-pulse", onPulse);

    return () => {
      root.style.removeProperty("--edge-pulse");
      window.removeEventListener("music-pulse", onPulse);
    };
  }, []);

  return (
    <div className="edge-aura pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <div className="edge-aura-vignette" />
      <div className="edge-aura-glow edge-aura-glow-a" />
      <div className="edge-aura-glow edge-aura-glow-b" />
      <div className="edge-aura-glow edge-aura-glow-c" />
      <div className="edge-aura-flare edge-aura-flare-a" />
      <div className="edge-aura-flare edge-aura-flare-b" />
    </div>
  );
}
