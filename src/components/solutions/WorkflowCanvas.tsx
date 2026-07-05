"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; r: number };
type Edge = { a: Node; b: Node; t: number };

/**
 * Hero background: a thin, monochrome workflow graph (nodes + edges, like an
 * n8n canvas) with a light pulse traveling each edge. Purely decorative
 * (aria-hidden), pauses on prefers-reduced-motion.
 */
export default function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;

    function resize() {
      if (!canvas || !wrap) return;
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = [];
      const cols = 6;
      const rows = 4;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.6) continue;
          nodes.push({
            x: (i / (cols - 1)) * width + (Math.random() - 0.5) * 60,
            y: (j / (rows - 1)) * height + (Math.random() - 0.5) * 60,
            r: 2 + Math.random() * 2,
          });
        }
      }
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < Math.max(width, height) * 0.32) {
            edges.push({ a: nodes[i], b: nodes[j], t: Math.random() });
          }
        }
      }
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (const e of edges) {
        ctx.strokeStyle = "rgba(238,241,246,0.10)";
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.b.x, e.b.y);
        ctx.stroke();
        if (!reduced) {
          const t = (time * 0.00012 + e.t) % 1;
          const px = e.a.x + (e.b.x - e.a.x) * t;
          const py = e.a.y + (e.b.y - e.a.y) * t;
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(238,241,246,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(238,241,246,0.25)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
      seed();
      draw(0);
    }

    resize();
    seed();
    draw(0);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="sol__heroCanvas" aria-hidden="true" />;
}
