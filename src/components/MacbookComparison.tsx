"use client";

import { useCallback, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 03 THE TRANSFORMATION — MacBook before/after comparison slider.
 *
 * Layout: a pure-CSS MacBook Pro. The display is a column: a photorealistic
 * macOS menu bar (part of the "machine", never clipped by the slider), and
 * below it the comparison area — dated site (before) vs a full dev
 * environment (VS Code + Simple Browser preview of the redesign, after).
 *
 * Interactions: drag/click anywhere (0–100%), arrow keys on the handle,
 * handle pulses until first touch, and when the cursor leaves the MacBook
 * chassis the slider glides back to 50/50.
 */

/** Fake-but-plausible editor content (our own Hero component, meta). */
function CodeBlock() {
  const lines: React.ReactNode[] = [
    <>
      <span className="tk-k">import</span> <span className="tk-p">{"{"}</span>{" "}
      <span className="tk-v">gsap</span> <span className="tk-p">{"}"}</span>{" "}
      <span className="tk-k">from</span> <span className="tk-s">"@/lib/gsap"</span>
      <span className="tk-p">;</span>
    </>,
    <>
      <span className="tk-k">import</span> <span className="tk-p">{"{"}</span>{" "}
      <span className="tk-v">useRef</span> <span className="tk-p">{"}"}</span>{" "}
      <span className="tk-k">from</span> <span className="tk-s">"react"</span>
      <span className="tk-p">;</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="tk-k">export default function</span>{" "}
      <span className="tk-f">Hero</span>
      <span className="tk-p">() {"{"}</span>
    </>,
    <>
      {"  "}
      <span className="tk-k">const</span> <span className="tk-v">root</span>{" "}
      <span className="tk-p">=</span> <span className="tk-f">useRef</span>
      <span className="tk-p">(</span>
      <span className="tk-k">null</span>
      <span className="tk-p">);</span>
    </>,
    <>
      {"  "}
      <span className="tk-f">useLayoutEffect</span>
      <span className="tk-p">{"(() => {"}</span>
    </>,
    <>
      {"    "}
      <span className="tk-v">gsap</span>
      <span className="tk-p">.</span>
      <span className="tk-f">timeline</span>
      <span className="tk-p">()</span>
    </>,
    <>
      {"      "}
      <span className="tk-p">.</span>
      <span className="tk-f">from</span>
      <span className="tk-p">(</span>
      <span className="tk-s">".hero-line"</span>
      <span className="tk-p">, {"{"}</span> <span className="tk-v">yPercent</span>
      <span className="tk-p">:</span> <span className="tk-s">120</span>{" "}
      <span className="tk-p">{"})"}</span>
    </>,
    <>
      {"      "}
      <span className="tk-p">.</span>
      <span className="tk-f">from</span>
      <span className="tk-p">(</span>
      <span className="tk-s">".hero-sub"</span>
      <span className="tk-p">, {"{"}</span> <span className="tk-v">autoAlpha</span>
      <span className="tk-p">:</span> <span className="tk-s">0</span>{" "}
      <span className="tk-p">{"});"}</span>
    </>,
    <>
      {"  "}
      <span className="tk-p">{"}, []);"}</span>
    </>,
    <>
      {"  "}
      <span className="tk-k">return</span> <span className="tk-p">&lt;</span>
      <span className="tk-f">section</span> <span className="tk-v">ref</span>
      <span className="tk-p">={"{"}</span>
      <span className="tk-v">root</span>
      <span className="tk-p">{"}"} /&gt;;</span>
    </>,
    <>
      <span className="tk-p">{"}"}</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="tk-c">{"// AI agent: online"}</span>
    </>,
  ];

  return (
    <>
      {lines.map((l, i) => (
        <div className="cl" key={i}>
          <span className="ln">{i + 1}</span>
          {l}
        </div>
      ))}
    </>
  );
}

const FILES = [
  "Hero.tsx",
  "MatrixRain.tsx",
  "MacbookComparison.tsx",
  "InteractiveGlobe.tsx",
  "dictionaries.ts",
  "globals.css",
];

export default function MacbookComparison({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const compare = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // slider position, % from left
  const [interacted, setInteracted] = useState(false);
  const [smoothReset, setSmoothReset] = useState(false);
  const dragging = useRef(false);
  const t = dict.sections.transform;

  const posFromX = useCallback((clientX: number) => {
    const el = compare.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setInteracted(true);
    setSmoothReset(false); // dragging is 1:1, no easing
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // capture is a nice-to-have; dragging still works without it
    }
    posFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) posFromX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  // Cursor left the MacBook chassis → glide back to 50/50.
  const onChassisLeave = () => {
    if (dragging.current) return;
    setSmoothReset(true);
    setPos(50);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setInteracted(true);
    setSmoothReset(false);
    setPos((p) => Math.min(100, Math.max(0, p + (e.key === "ArrowRight" ? 3 : -3))));
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tf__reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
      gsap.from(".macbook", {
        scale: 0.92,
        y: 44,
        autoAlpha: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const anim = smoothReset ? " tf-anim" : "";

  return (
    <section ref={root} id="transform" className="tf">
      <div className="shell">
        <div className="tf__head">
          <p className="section-eyebrow tf__reveal">
            <span className="idx">03</span>
            <span>{t.label}</span>
          </p>
          <h2 className="section-title tf__reveal">{t.title}</h2>
          <p className="tf__sub tf__reveal">{t.sub}</p>
        </div>

        <div className="macbook" onMouseLeave={onChassisLeave}>
          <div className="macbook__screen">
            <div className="macbook__notch" aria-hidden="true" />
            <div className="macbook__display">
              {/* macOS menu bar — part of the machine, above the comparison */}
              <div className="macbook__menubar" aria-hidden="true">
                <div className="mb__left">
                  <span className="mb__apple">
                    <svg viewBox="0 0 14 17" aria-hidden="true">
                      <path d="M11.62 8.99c0-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.3 2-1.4 2.44-.36 6.05 1.01 8.03.67.97 1.47 2.06 2.52 2.02 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.99 2.44-1.96.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.14-3.22zM9.6 2.88c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.56-.85 2.48.9.07 1.82-.46 2.39-1.14z" />
                    </svg>
                  </span>
                  <span className="mb__app">Opera</span>
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>History</span>
                  <span>Bookmarks</span>
                  <span>Developer</span>
                  <span>Window</span>
                  <span>Help</span>
                </div>
                <div className="mb__right">
                  <span className="mb__glyph">✳</span>
                  <span className="mb__glyph">◎</span>
                  <svg className="mb__icon" viewBox="0 0 24 16" aria-hidden="true">
                    {/* battery */}
                    <rect x="1" y="3" width="19" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
                    <rect x="3" y="5" width="13" height="6" rx="1.2" fill="currentColor" />
                    <path d="M21.5 6.5v3c1-.3 1.6-.9 1.6-1.5s-.6-1.2-1.6-1.5z" fill="currentColor" opacity="0.5" />
                  </svg>
                  <svg className="mb__icon" viewBox="0 0 16 12" aria-hidden="true">
                    {/* wifi */}
                    <path d="M8 10.4l1.7-2.1a2.7 2.7 0 0 0-3.4 0L8 10.4z" fill="currentColor" />
                    <path d="M3.6 5.9a6.4 6.4 0 0 1 8.8 0l-1.3 1.6a4.4 4.4 0 0 0-6.2 0L3.6 5.9z" fill="currentColor" opacity="0.75" />
                    <path d="M1 2.9a10 10 0 0 1 14 0l-1.3 1.6a8 8 0 0 0-11.4 0L1 2.9z" fill="currentColor" opacity="0.45" />
                  </svg>
                  <svg className="mb__icon" viewBox="0 0 14 14" aria-hidden="true">
                    {/* search */}
                    <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9.4 9.4L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="mb__time">Thu 2 Jul 12:02</span>
                </div>
              </div>

              {/* Comparison area — everything below the menu bar */}
              <div
                ref={compare}
                className="macbook__compare"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                {/* AFTER — full dev environment (base layer) */}
                <div className="site site--after" aria-hidden="true">
                  <div className="vs">
                    <div className="vs__titlebar">
                      <span className="vs__dot vs__dot--r" />
                      <span className="vs__dot vs__dot--y" />
                      <span className="vs__dot vs__dot--g" />
                      <span className="vs__title">Hero.tsx — nova-studio</span>
                    </div>
                    <div className="vs__body">
                      <div className="vs__activity">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="vs__sidebar">
                        <div className="vs__sideTitle">EXPLORER</div>
                        {FILES.map((f, i) => (
                          <div key={f} className={`vs__file ${i === 0 ? "is-active" : ""}`}>
                            {f}
                          </div>
                        ))}
                      </div>
                      <div className="vs__editor">
                        <div className="vs__tabs">
                          <span className="vs__tab is-active">Hero.tsx</span>
                          <span className="vs__tab">globals.css</span>
                        </div>
                        <div className="vs__code">
                          <div className="vs__codeScroll">
                            <CodeBlock />
                            <CodeBlock />
                          </div>
                        </div>
                      </div>
                      <div className="vs__browser">
                        <div className="vs__urlbar">
                          <span className="vs__urlDot" />
                          localhost:3000
                        </div>
                        <div className="sa-embed">
                          <div className="sa__nav">
                            <span className="sa__brand">{t.neo.eyebrow}</span>
                            <span className="sa__navlinks">
                              <span>01</span>
                              <span>02</span>
                              <span>03</span>
                            </span>
                          </div>
                          <div className="sa__hero">
                            <div className="sa__eyebrow">{t.neo.eyebrow}</div>
                            <div className="sa__h">{t.neo.headline}</div>
                            <div className="sa__p">{t.neo.sub}</div>
                            <span className="sa__btn">{t.neo.btn}</span>
                          </div>
                          <div className="sa__cards">
                            <span className="sa__card" />
                            <span className="sa__card" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="vs__status">
                      <span>main*</span>
                      <span>TypeScript React</span>
                    </div>
                  </div>
                </div>

                {/* BEFORE — dated site (top layer, clipped from the right) */}
                <div
                  className={`site site--before${anim}`}
                  aria-hidden="true"
                  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                >
                  <div className="sb__bar">{t.old.url}</div>
                  <div className="sb__nav">
                    {t.old.links.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </div>
                  <div className="sb__content">
                    <div className="sb__h">{t.old.welcome}</div>
                    <div className="sb__p">{t.old.body}</div>
                    <span className="sb__btn">{t.old.btn}</span>
                    <div className="sb__meta">{t.old.updated}</div>
                  </div>
                </div>

                {/* Labels — bottom corners, clear of both headers */}
                <span
                  className="tf-chip tf-chip--before"
                  style={{ opacity: pos > 14 ? 1 : 0 }}
                >
                  {t.before}
                </span>
                <span
                  className="tf-chip tf-chip--after"
                  style={{ opacity: pos < 86 ? 1 : 0 }}
                >
                  {t.after}
                </span>

                {/* Divider + handle */}
                <div
                  className={`tf-divider${anim}`}
                  style={{ left: `${pos}%` }}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className={`tf-handle${anim} ${interacted ? "" : "tf-handle--pulse"}`}
                  style={{ left: `${pos}%` }}
                  role="slider"
                  aria-label={t.hint}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(pos)}
                  onKeyDown={onKeyDown}
                >
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                    <path d="M6 1L1.5 6L6 11" stroke="#0b0b0c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 1L16.5 6L12 11" stroke="#0b0b0c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="macbook__base" aria-hidden="true" />
          <p className="tf__hint">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}
