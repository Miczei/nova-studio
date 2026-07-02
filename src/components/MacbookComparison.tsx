"use client";

import { useCallback, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 03 THE TRANSFORMATION — MacBook before/after comparison slider.
 *
 * A CSS-built MacBook Pro frame; inside the display two full-bleed website
 * mockups (dated "before" vs premium "after") compared with a drag slider.
 * The "before" layer sits on top and is clipped from the right, so dragging
 * right reveals the old site, dragging left reveals the redesign.
 *
 * Apple-vibe motion: the whole MacBook scales up and fades in on scroll
 * (GSAP ScrollTrigger); the handle pulses until first interaction.
 */
export default function MacbookComparison({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const display = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // slider position, % from left
  const [interacted, setInteracted] = useState(false);
  const dragging = useRef(false);
  const t = dict.sections.transform;

  const posFromX = useCallback((clientX: number) => {
    const el = display.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setInteracted(true);
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setInteracted(true);
    setPos((p) =>
      Math.min(96, Math.max(4, p + (e.key === "ArrowRight" ? 3 : -3)))
    );
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

        <div className="macbook">
          <div className="macbook__screen">
            <div className="macbook__notch" aria-hidden="true" />
            <div
              ref={display}
              className="macbook__display"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {/* AFTER — premium redesign (base layer) */}
              <div className="site site--after" aria-hidden="true">
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
                  <span className="sa__card" />
                </div>
              </div>

              {/* BEFORE — dated site (top layer, clipped from the right) */}
              <div
                className="site site--before"
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

              {/* Labels */}
              <span className="tf-chip tf-chip--before" style={{ opacity: pos > 14 ? 1 : 0 }}>
                {t.before}
              </span>
              <span className="tf-chip tf-chip--after" style={{ opacity: pos < 86 ? 1 : 0 }}>
                {t.after}
              </span>

              {/* Divider + handle */}
              <div className="tf-divider" style={{ left: `${pos}%` }} aria-hidden="true" />
              <button
                type="button"
                className={`tf-handle ${interacted ? "" : "tf-handle--pulse"}`}
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
          <div className="macbook__base" aria-hidden="true" />
          <p className="tf__hint">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}
