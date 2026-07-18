"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DecodeText from "@/components/engine/DecodeText";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { AboutContent } from "@/i18n/about";

/**
 * "About us" — dark, elite storytelling page (scoped to .sub-shell). Semantic
 * outline: single <h1>, <h2> for the origin story and the "what we build" band,
 * <h3> per value. Left column carries the narrative, the right column holds a
 * premium image wrapper (rounded, vignette, inset shadow) that blends into the
 * black background. The image slot is a pulse placeholder until the real asset
 * lands, then swap the inner <div> for the <img> / next/image.
 *
 * Entrance animations deliberately reuse the exact mechanism from
 * EnginePage/SecurityPage (same EASE curve, same durations/delays, same
 * word-mask hero title) rather than a new one, so every page in the site
 * reads as one consistent motion language. RevealTitle/EASE are duplicated
 * (not imported) following this codebase's established convention for these
 * small per-page pieces; DecodeText is imported directly since it's already
 * generic and safe to share.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RevealTitle({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  return (
    <h1 aria-label={text} className={className}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-1 align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function AboutPage({
  locale,
  dict,
  about,
}: {
  locale: Locale;
  dict: Dictionary;
  about: AboutContent;
}) {
  const home = `/${locale}`;

  return (
    <div className="sub-shell">
      <Navbar locale={locale} dict={dict} />

      <main className="sub">
        <article>
          <div className="shell">
            {/* Breadcrumb (mirrors BreadcrumbList JSON-LD) */}
            <nav className="sub__crumbs" aria-label="Breadcrumb">
              <Link href={home}>Couders</Link>
              <span aria-hidden="true">/</span>
              <span>{about.breadcrumb}</span>
            </nav>

            {/* Hero: story on one side, premium image on the other */}
            <header className="about__hero">
              <div className="about__text">
                <p className="section-eyebrow">
                  <DecodeText text={about.eyebrow} />
                </p>
                <RevealTitle text={about.h1} className="sub__h1" />
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                  className="sub__intro"
                >
                  {about.lead}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="about__storyH2"
                >
                  {about.storyH2}
                </motion.h2>
                {about.story.map((p, i) => (
                  <motion.p
                    className="about__story"
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  >
                    {p}
                  </motion.p>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="hero-actions"
                >
                  <Link className="btn btn--primary" href={`${home}/contact`}>
                    {about.ctaPrimary}
                  </Link>
                  <Link className="btn btn--ghost" href={`${home}/${about.ctaSecondarySlug}`}>
                    {about.ctaSecondary}
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="about__media"
              >
                {/* Premium image wrapper: rounded, inset shadow + vignette so the
                    engraving's light paper edges melt into the black page. */}
                <figure className="about__imgWrap">
                  <div className="aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about-krakow.jpg"
                      alt={about.imageAlt}
                      width={1408}
                      height={768}
                      loading="eager"
                      className="h-full w-full rounded-3xl object-cover"
                    />
                  </div>
                  <div className="about__imgVignette" aria-hidden="true" />
                </figure>
              </motion.div>
            </header>

            {/* What we build */}
            <section className="about__values" aria-labelledby="about-values-h">
              <motion.h2
                id="about-values-h"
                className="section-title"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {about.valuesH2}
              </motion.h2>
              <div className="about__valueGrid">
                {about.values.map((v, i) => (
                  <motion.div
                    className="about__value"
                    key={v.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  >
                    <h3 className="about__valueTitle">{v.title}</h3>
                    <p className="about__valueBody">{v.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <motion.section
              className="sub__cta"
              aria-labelledby="about-cta-h"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h2 id="about-cta-h" className="sub__ctaTitle">
                {about.ctaH2}
              </h2>
              <p className="sub__lead">{about.ctaBody}</p>
              <div className="hero-actions">
                <Link className="btn btn--primary" href={`${home}/contact`}>
                  {about.ctaPrimary}
                </Link>
                <Link className="btn btn--ghost" href={`${home}/${about.ctaSecondarySlug}`}>
                  {about.ctaSecondary}
                </Link>
              </div>
            </motion.section>
          </div>
        </article>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
