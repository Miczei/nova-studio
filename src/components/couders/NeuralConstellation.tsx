"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

const NODE_COUNT = 64;
const LINK_DIST = 150;
const HUB_EVERY = 9;

export default function NeuralConstellation({
  ariaLabel,
  className,
}: {
  ariaLabel?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: i % HUB_EVERY === 0 ? 2.6 : 1.3 + Math.random() * 0.9,
        hub: i % HUB_EVERY === 0,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) seed();
    };

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (advance) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = w + 10;
          if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          if (n.y > h + 10) n.y = -10;
        }
        if (pulses.length < 5 && Math.random() < 0.03) {
          const a = Math.floor(Math.random() * nodes.length);
          let best = -1;
          let bestD = LINK_DIST;
          for (let j = 0; j < nodes.length; j++) {
            if (j === a) continue;
            const d = Math.hypot(nodes[a].x - nodes[j].x, nodes[a].y - nodes[j].y);
            if (d < bestD) {
              bestD = d;
              best = j;
            }
          }
          if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.014 });
        }
        pulses = pulses.filter((p) => (p.t += p.speed) <= 1);
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(199, 204, 214, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pulses) {
        const na = nodes[p.a];
        const nb = nodes[p.b];
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        ctx.fillStyle = n.hub ? "rgba(245, 245, 247, 0.95)" : "rgba(199, 204, 214, 0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = "rgba(245, 245, 247, 0.18)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      draw(true);
      if (running) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(false); // first frame renders even before any animation tick

    const ro = new ResizeObserver(() => {
      resize();
      draw(false);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !reduced;
        if (shouldRun && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!shouldRun && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className={className ?? "h-full w-full"}
    />
  );
}
