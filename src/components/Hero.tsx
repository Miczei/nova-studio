"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * HERO — minimal, text-first, SEO-semantic, over the white Matrix rain.
 *
 * Semantics: a single <h1> carrying the high-intent keywords, plus an <h2> for
 * the AI-chatbot value line. Copy comes from the locale dictionary (server-
 * rendered), so both /en and /pl ship crawlable, translated markup.
 *
 * Motion: two Apple-style beats — intro mask-reveal, then a pinned + scrubbed
 * timeline that fades the headline out and reveals the h2 before releasing.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Beat 1: intro reveal --------------------------------------
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { yPercent: 120, autoAlpha: 0, duration: 0.8 })
        .from(
          ".hero-line > span",
          { yPercent: 120, autoAlpha: 0, duration: 1, stagger: 0.12 },
          "-=0.45"
        )
        .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-actions .btn",
          { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        )
        .from(".hero-cue", { autoAlpha: 0, duration: 0.6 }, "-=0.2");

      // ---- Beat 2: pinned, scroll-scrubbed timeline ------------------
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: pin.current,
            pinSpacing: true,
          },
        })
        .to(".hero-content", { yPercent: -14, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-cue", { autoAlpha: 0, ease: "none" }, 0)
        .fromTo(
          tagline.current,
          { autoAlpha: 0, yPercent: 40 },
          { autoAlpha: 1, yPercent: 0, ease: "none" },
          0.3
        );
    }, root);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const t = dict.hero;

  return (
    <section ref={root} className="hero" aria-label={t.eyebrow}>
      <div ref={pin} className="hero-pin">
        {/* Beat 1 content */}
        <div className="hero-content">
          <span className="hero-eyebrow">{t.eyebrow}</span>
          <h1 className="hero-title">
            <span className="hero-line">
              <span>{t.h1a}</span>
            </span>
            <span className="hero-line">
              <span className="soft">{t.h1b}</span>
            </span>
          </h1>
          <p className="hero-sub">{t.sub}</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#contact">
              {t.ctaPrimary}
            </a>
            <a className="btn btn--ghost" href="#transform">
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-cue">
          <span className="hero-cue__track">
            <span className="hero-cue__dot" />
          </span>
          {t.scroll}
        </div>

        {/* Beat 2 — AI-chatbot value line as a real <h2> for SEO */}
        <h2 ref={tagline} className="hero-tagline">
          {t.h2} <span className="soft">{t.h2soft}</span>
        </h2>
      </div>
    </section>
  );
}
