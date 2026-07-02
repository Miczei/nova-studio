"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 04 PROCESS — vertical timeline. Steps reveal on enter; a vertical progress
 * line fills as the reader scrolls through the list.
 */
export default function Process({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const p = dict.sections.process;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proc-step", {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.to(".proc__line-fill", {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".proc__list",
          start: "top 75%",
          end: "bottom 65%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="proc">
      <div className="shell">
        <p className="section-eyebrow">
          <span className="idx">05</span>
          <span>{p.label}</span>
        </p>
        <h2 className="section-title">{p.title}</h2>

        <div className="proc__list">
          <div className="proc__line">
            <div className="proc__line-fill" />
          </div>
          {p.steps.map((s, i) => (
            <div className="proc-step" key={i}>
              <div className="proc-step__no">{s.no}</div>
              <div className="proc-step__content">
                <h3 className="proc-step__title">{s.title}</h3>
                <p className="proc-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
