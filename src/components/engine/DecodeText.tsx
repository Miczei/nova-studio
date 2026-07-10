"use client";

import { useEffect, useRef } from "react";

const CHARS = "01<>/=+*#$%&@ΞΣΨ";

export default function DecodeText({
  text,
  className,
  duration = 900,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let failSafe = 0;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        failSafe = window.setTimeout(() => {
          el.textContent = text;
        }, duration + 400);
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const lock = Math.floor(p * text.length);
          let out = text.slice(0, lock);
          for (let i = lock; i < text.length; i++) {
            out += text[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
          }
          el.textContent = out;
          if (p < 1) raf = requestAnimationFrame(tick);
          else el.textContent = text;
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failSafe);
      io.disconnect();
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
