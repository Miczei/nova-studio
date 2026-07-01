"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Region } from "./globe/globeData";

// WebGL scene is client-only and lazy-loaded so it never blocks first paint.
const GlobeScene = dynamic(() => import("./globe/GlobeScene"), { ssr: false });

/**
 * 05 GLOBAL REACH — interactive 3D globe (dark contrast section).
 * The canvas mounts only when the section approaches the viewport, and its
 * render loop pauses when it scrolls away, to protect Core Web Vitals.
 */
export default function InteractiveGlobe({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [region, setRegion] = useState<Region>("dach");
  const g = dict.sections.globe;

  // Mount the WebGL canvas once, when the section first approaches the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".globe__reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".globe__canvas", {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 68%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const active = g.regions.find((r) => r.id === region) ?? g.regions[0];

  return (
    <section ref={root} id="globe" className="globe">
      <div className="shell globe__grid">
        <div className="globe__text">
          <p className="section-eyebrow globe__eyebrow globe__reveal">
            <span className="idx">05</span>
            <span>{g.label}</span>
          </p>
          <h2 className="section-title globe__title globe__reveal">{g.title}</h2>

          <div className="globe__tabs globe__reveal" role="tablist">
            {g.regions.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={region === r.id}
                className={`globe__tab ${region === r.id ? "is-active" : ""}`}
                onClick={() => setRegion(r.id as Region)}
              >
                {r.tab}
              </button>
            ))}
          </div>

          <h3 className="globe__subhead globe__reveal">{active.heading}</h3>
          <p className="globe__body globe__reveal">{active.text}</p>
        </div>

        <div className="globe__canvas">
          {mounted ? (
            <GlobeScene activeRegion={region} labels={g.locations} />
          ) : (
            <div className="globe__placeholder" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
