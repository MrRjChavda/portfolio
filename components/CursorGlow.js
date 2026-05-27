"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let frameId;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: pointer.x, y: pointer.y };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const render = () => {
      current.x += (pointer.x - current.x) * 0.12;
      current.y += (pointer.y - current.y) * 0.12;
      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[4] hidden h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--theme-wash),transparent_62%)] opacity-70 blur-xl mix-blend-screen md:block"
      aria-hidden="true"
    />
  );
}
