import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
 */
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
              <Link href={home}>NOVA</Link>
              <span aria-hidden="true">/</span>
              <span>{about.breadcrumb}</span>
            </nav>

            {/* Hero: story on one side, premium image on the other */}
            <header className="about__hero">
              <div className="about__text">
                <p className="section-eyebrow">
                  <span>{about.eyebrow}</span>
                </p>
                <h1 className="sub__h1">{about.h1}</h1>
                <p className="sub__intro">{about.lead}</p>

                <h2 className="about__storyH2">{about.storyH2}</h2>
                {about.story.map((p, i) => (
                  <p className="about__story" key={i}>
                    {p}
                  </p>
                ))}

                <div className="hero-actions">
                  <a className="btn btn--primary" href={`${home}#contact`}>
                    {about.ctaPrimary}
                  </a>
                  <Link className="btn btn--ghost" href={`${home}/${about.ctaSecondarySlug}`}>
                    {about.ctaSecondary}
                  </Link>
                </div>
              </div>

              <div className="about__media">
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
              </div>
            </header>

            {/* What we build */}
            <section className="about__values" aria-labelledby="about-values-h">
              <h2 id="about-values-h" className="section-title">
                {about.valuesH2}
              </h2>
              <div className="about__valueGrid">
                {about.values.map((v) => (
                  <div className="about__value" key={v.title}>
                    <h3 className="about__valueTitle">{v.title}</h3>
                    <p className="about__valueBody">{v.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="sub__cta" aria-labelledby="about-cta-h">
              <h2 id="about-cta-h" className="sub__ctaTitle">
                {about.ctaH2}
              </h2>
              <p className="sub__lead">{about.ctaBody}</p>
              <div className="hero-actions">
                <a className="btn btn--primary" href={`${home}#contact`}>
                  {about.ctaPrimary}
                </a>
                <Link className="btn btn--ghost" href={`${home}/${about.ctaSecondarySlug}`}>
                  {about.ctaSecondary}
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
