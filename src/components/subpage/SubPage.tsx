import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaceCodeVideo from "@/components/subpage/FaceCodeVideo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PageContent } from "@/i18n/pages";

/**
 * Shared renderer for the topical-silo sub-pages. Emits a strict semantic
 * outline (single <h1>, <h2> section headings, <h3> question-style pillar
 * headings) for clean crawler parsing, plus internal links between silos.
 */
export default function SubPage({
  locale,
  dict,
  page,
  image,
  video,
}: {
  locale: Locale;
  dict: Dictionary;
  page: PageContent;
  image: string;
  /** Optional: when set, a native <video> hero replaces the static image. */
  video?: string;
}) {
  const home = `/${locale}`;
  const href = (slug: string) => `/${locale}/${slug}`;

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
              <span>{page.breadcrumb}</span>
            </nav>

            {/* Hero. With a video, the media stacks full-width UNDER the text
                (not beside it) via the --stacked modifier. */}
            <header className={`sub__hero${video ? " sub__hero--stacked" : ""}`}>
              <div className="sub__heroText">
                <p className="section-eyebrow">
                  <span>{page.eyebrow}</span>
                </p>
                <h1 className="sub__h1">{page.h1}</h1>
                <p className="sub__intro">{page.intro}</p>
                <div className="hero-actions">
                  <a className="btn btn--primary" href={`${home}#contact`}>
                    {page.ctaPrimary}
                  </a>
                </div>
              </div>
              {video ? (
                <FaceCodeVideo src={video} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="sub__heroImg"
                  src={image}
                  alt={page.imageAlt}
                  width={1280}
                  height={720}
                  loading="eager"
                />
              )}
            </header>

            {/* FOMO / contrast */}
            <section className="sub__fomo" aria-labelledby="fomo-h">
              <h2 id="fomo-h" className="section-title">
                {page.fomoH2}
              </h2>
              <p className="sub__lead">{page.fomoIntro}</p>
              <div className="sub__contrast">
                <div className="sub__col sub__col--bad">
                  <span className="sub__colLabel">{page.contrastBeginnerLabel}</span>
                  <ul>
                    {page.contrast.map((c, i) => (
                      <li key={i}>{c.beginner}</li>
                    ))}
                  </ul>
                </div>
                <div className="sub__col sub__col--good">
                  <span className="sub__colLabel">{page.contrastFullstackLabel}</span>
                  <ul>
                    {page.contrast.map((c, i) => (
                      <li key={i}>{c.fullstack}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Pillars */}
            <section className="sub__pillars" aria-labelledby="pillars-h">
              <h2 id="pillars-h" className="section-title">
                {page.pillarsH2}
              </h2>
              <div className="sub__pillarGrid">
                {page.pillars.map((p) => (
                  <section className="sub__pillar" key={p.no}>
                    <span className="sub__pillarNo">
                      {String(p.no).padStart(2, "0")}
                    </span>
                    <span className="sub__pillarTag">{p.title}</span>
                    <h3 className="sub__pillarH3">{p.question}</h3>
                    <p className="sub__pillarBody">{p.body}</p>
                  </section>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="sub__cta" aria-labelledby="cta-h">
              <h2 id="cta-h" className="sub__ctaTitle">
                {page.ctaH2}
              </h2>
              <p className="sub__lead">{page.ctaBody}</p>
              <div className="hero-actions">
                <a className="btn btn--primary" href={`${home}#contact`}>
                  {page.ctaPrimary}
                </a>
                <Link className="btn btn--ghost" href={href(page.related[0].slug)}>
                  {page.ctaSecondary}
                </Link>
              </div>
            </section>

            {/* Internal links between silos */}
            <nav className="sub__related" aria-label={page.relatedH2}>
              <h2 className="sub__relatedH2">{page.relatedH2}</h2>
              <div className="sub__relatedGrid">
                {page.related.map((r) => (
                  <Link key={r.slug} className="sub__relatedCard" href={href(r.slug)}>
                    <span>{r.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </article>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
