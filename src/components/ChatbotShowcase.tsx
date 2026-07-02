"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 03 AI CHATBOTS — split layout, SEO <h2>, animated chat mockup.
 * Copy reveals on enter; chat bubbles stagger in as the mockup scrolls up.
 */
export default function ChatbotShowcase({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const cb = dict.sections.chatbot;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cb__reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.from(".chat .msg", {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: { trigger: ".chat", start: "top 78%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="agents" className="cb">
      <div className="shell cb__grid">
        <div className="cb__col">
          <p className="section-eyebrow cb__reveal">
            <span className="idx">04</span>
            <span>{cb.label}</span>
          </p>
          <h2 className="section-title cb__reveal">{cb.h2}</h2>
          <p className="cb__sub cb__reveal">{cb.sub}</p>
          <ul className="cb__features">
            {cb.features.map((f, i) => (
              <li className="cb__reveal" key={i}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="cb__col">
          <div className="chat cb__reveal" role="img" aria-label={cb.chat.title}>
            <div className="chat__bar">
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__title">{cb.chat.title}</span>
            </div>
            <div className="chat__body">
              {cb.chat.messages.map((m, i) => (
                <div className={`msg msg--${m.from}`} key={i}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="chat__input">
              <span>{cb.chat.placeholder}</span>
              <span className="chat__send" aria-hidden="true">
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
