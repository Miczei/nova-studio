"use client";

import { useCallback, useRef, useState } from "react";
import type { SolutionsContent } from "@/i18n/solutions";

/**
 * Drag/click (0-100%) comparison slider, same interaction model as the home
 * page's MacbookComparison: pointer capture for 1:1 dragging, arrow keys on
 * the handle, and no snap-back (unlike the MacBook, this one stays where the
 * visitor leaves it, since there's no chassis to "leave").
 */
export default function BeforeAfterSlider({ ba }: { ba: SolutionsContent["beforeAfter"] }) {
  const compare = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);

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
    setPos((p) => Math.min(100, Math.max(0, p + (e.key === "ArrowRight" ? 4 : -4))));
  };

  return (
    <div className="sol__ba">
      <div
        ref={compare}
        className="sol__baCompare"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="sol__baPanel sol__baBefore">
          <span className="sol__baLabel">{ba.beforeLabel}</span>
          <ul>
            {ba.beforeItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="sol__baPanel sol__baAfter" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <span className="sol__baLabel">{ba.afterLabel}</span>
          <ul>
            {ba.afterItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="sol__baDivider" style={{ left: `${pos}%` }} aria-hidden="true" />
        <button
          type="button"
          className={`sol__baHandle ${interacted ? "" : "sol__baHandle--pulse"}`}
          style={{ left: `${pos}%` }}
          role="slider"
          aria-label={ba.hint}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
        >
          <svg width="16" height="11" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="M6 1L1.5 6L6 11" stroke="#0b0b0c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 1L16.5 6L12 11" stroke="#0b0b0c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="sol__baHint">{ba.hint}</p>
    </div>
  );
}
