"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 06 CONTACT — closing CTA. Left transparent so the Matrix rain reappears as a
 * bookend to the hero before the footer caps the page.
 */
export default function Contact({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const c = dict.sections.contact;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" className="contact">
      <div className="shell contact__inner">
        <p className="section-eyebrow contact__reveal">
          <span className="idx">07</span>
          <span>{c.label}</span>
        </p>
        <h2 className="contact__title contact__reveal">{c.title}</h2>
        <div className="contact__actions contact__reveal">
          <a className="btn btn--primary" href={`mailto:${c.email}`}>
            {c.cta}
          </a>
          <span className="contact__email">
            {c.emailLabel}{" "}
            <a href={`mailto:${c.email}`}>{c.email}</a>
          </span>
        </div>
      </div>
    </section>
  );
}
