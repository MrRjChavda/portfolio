"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);
  const audioGraphRef = useRef(null);
  const rafRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audioGraphRef.current?.context?.close();
    };
  }, []);

  const fadeVolume = useCallback((targetVolume, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const startVolume = audio.volume;
    const startTime = performance.now();
    const duration = 560;

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, startVolume + (targetVolume - startVolume) * eased));

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    };

    fadeRef.current = requestAnimationFrame(tick);
  }, []);

  const startAnalyzer = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioGraphRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioGraphRef.current = {
        analyser,
        context,
        data: new Uint8Array(analyser.frequencyBinCount),
      };
    }

    const graph = audioGraphRef.current;
    graph.context.resume();

    const tick = () => {
      graph.analyser.getByteFrequencyData(graph.data);
      // Focus strictly on deep bass (kick drum) for punchier sync
      const bassRange = graph.data.slice(0, 8); 
      const bassAverage = bassRange.reduce((sum, value) => sum + value, 0) / bassRange.length / 255;
      
      // Add 'punch' - non-linear mapping for more explosive, premium beats
      const punch = Math.pow(bassAverage, 1.6) * 2.8;

      window.dispatchEvent(
        new CustomEvent("music-pulse", {
          detail: { 
            intensity: Math.min(1.2, punch),
            frequencies: Array.from(graph.data)
          },
        })
      );
      rafRef.current = requestAnimationFrame(tick);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    tick();
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    if (audio.paused) {
      audio.volume = 0;
    }
    try {
      startAnalyzer();
      await audio.play();
      fadeVolume(0.62);
      setMuted(false);
    } catch {
      setMuted(true);
    }
  }, [fadeVolume, startAnalyzer]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeVolume(0, () => {
      audio.pause();
      audio.muted = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.dispatchEvent(new CustomEvent("music-pulse", { detail: { intensity: 0 } }));
    });
    setMuted(true);
  }, [fadeVolume]);

  useEffect(() => {
    window.addEventListener("portfolio-music-start", startMusic);
    return () => window.removeEventListener("portfolio-music-start", startMusic);
  }, [startMusic]);

  const toggleMusic = async () => {
    if (muted) {
      await startMusic();
      return;
    }

    stopMusic();
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/music/background.mp3" loop preload="metadata" />
      <button
        type="button"
        onClick={toggleMusic}
        className="theme-glass group inline-flex h-10 items-center gap-2 rounded-full border px-3 font-ui text-[10px] uppercase tracking-[0.2em] text-cream-soft backdrop-blur-xl transition hover:border-cream/25 hover:text-cream"
        aria-label={muted ? "Play background music" : "Mute background music"}
        title="Play or mute background music"
      >
        <span className="flex h-4 w-5 items-end justify-center gap-[3px]">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className={`w-[3px] rounded-full bg-cream transition-all duration-300 ${
                muted ? "h-1 opacity-35" : "h-3 opacity-80"
              }`}
              style={{ transitionDelay: `${bar * 55}ms` }}
            />
          ))}
        </span>
        {muted ? "Muted" : "Playing"}
      </button>
    </>
  );
}
