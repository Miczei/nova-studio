import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowCanvas from "./WorkflowCanvas";
import BeforeAfterSlider from "./BeforeAfterSlider";
import RoiCalculator from "./RoiCalculator";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SolutionsContent } from "@/i18n/solutions";

/**
 * "Solutions" — dark sales page (scoped to .sub-shell), rendered at the
 * existing /methodology route. Proof-driven structure: hero, before/after,
 * bento use cases, proof demos, tech stack, ROI calculator, FAQ, final CTA.
 * Not a pillar silo page, so it does not reuse SubPage's fixed layout.
 */
export default function SolutionsPage({
  locale,
  dict,
  solutions,
}: {
  locale: Locale;
  dict: Dictionary;
  solutions: SolutionsContent;
}) {
  const home = `/${locale}`;
  const { hero, beforeAfter, bento, demos, stack, calculator, faq, finalCta } = solutions;

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
              <span>{solutions.breadcrumb}</span>
            </nav>

            {/* 01 Hero */}
            <header className="sol__hero">
              <div className="sol__heroCanvasWrap" aria-hidden="true">
                <WorkflowCanvas />
              </div>
              <div className="sol__heroBody">
                <p className="section-eyebrow">
                  <span>{hero.eyebrow}</span>
                </p>
                <h1 className="sub__h1">{hero.h1}</h1>
                <p className="sub__intro">{hero.sub}</p>
                <div className="hero-actions">
                  <a className="btn btn--primary" href={`${home}#contact`}>
                    {hero.ctaPrimary}
                  </a>
                  <a className="btn btn--ghost" href="#sol-demos">
                    {hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </header>

            {/* 02 Before / After */}
            <section className="sol__section" aria-labelledby="sol-ba-h">
              <p className="section-eyebrow">
                <span className="idx">01</span>
                <span>{beforeAfter.eyebrow}</span>
              </p>
              <h2 id="sol-ba-h" className="section-title">
                {beforeAfter.title}
              </h2>
              <BeforeAfterSlider ba={beforeAfter} />
            </section>

            {/* 03 Bento use cases */}
            <section className="sol__section" aria-labelledby="sol-bento-h">
              <p className="section-eyebrow">
                <span className="idx">02</span>
                <span>{bento.eyebrow}</span>
              </p>
              <h2 id="sol-bento-h" className="section-title">
                {bento.title}
              </h2>
              <div className="sol__bento">
                {bento.tiles.map((tile) => (
                  <article className="sol__tile" key={tile.title}>
                    <div className="sol__tileIcon" aria-hidden="true">
                      {tile.icon}
                    </div>
                    <h3 className="sol__tileTitle">{tile.title}</h3>
                    <p className="sol__tileBody">{tile.body}</p>
                    <div className="sol__tileRoi">{tile.roi}</div>
                  </article>
                ))}
              </div>
            </section>

            {/* 04 Proof demos */}
            <section className="sol__section" id="sol-demos" aria-labelledby="sol-demos-h">
              <p className="section-eyebrow">
                <span className="idx">03</span>
                <span>{demos.eyebrow}</span>
              </p>
              <h2 id="sol-demos-h" className="section-title">
                {demos.title}
              </h2>
              <div className="sol__demos">
                {demos.items.map((demo) => (
                  <div className="sol__demo" key={demo.title}>
                    <div className="sol__demoFrame">
                      <span className="sol__demoTag">{demo.tag}</span>
                      <div className="sol__demoPlay" aria-hidden="true">
                        &#9654;
                      </div>
                      <span className="sol__demoDur">{demo.duration}</span>
                    </div>
                    <h3 className="sol__demoTitle">{demo.title}</h3>
                    <p className="sol__demoBody">{demo.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 Tech stack */}
            <section className="sol__section" aria-labelledby="sol-stack-h">
              <p className="section-eyebrow">
                <span className="idx">04</span>
                <span>{stack.eyebrow}</span>
              </p>
              <h2 id="sol-stack-h" className="section-title sr-only">
                {stack.eyebrow}
              </h2>
              <p className="sol__stackLead">{stack.lead}</p>
              <div className="sol__stackRow">
                {stack.tools.map((tool) => (
                  <span className="sol__stackChip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* 06 ROI calculator */}
            <section className="sol__section" aria-labelledby="sol-calc-h">
              <p className="section-eyebrow">
                <span className="idx">05</span>
                <span>{calculator.eyebrow}</span>
              </p>
              <h2 id="sol-calc-h" className="section-title">
                {calculator.title}
              </h2>
              <RoiCalculator calc={calculator} locale={locale} />
            </section>

            {/* 07 FAQ */}
            <section className="sol__section" aria-labelledby="sol-faq-h">
              <p className="section-eyebrow">
                <span className="idx">06</span>
                <span>{faq.eyebrow}</span>
              </p>
              <h2 id="sol-faq-h" className="section-title">
                {faq.title}
              </h2>
              <div className="sol__faq">
                {faq.items.map((item, i) => (
                  <details key={item.q} open={i === 0}>
                    <summary>{item.q}</summary>
                    <div className="sol__faqA">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* 08 Final CTA */}
            <section className="sub__cta" aria-labelledby="sol-cta-h">
              <h2 id="sol-cta-h" className="sub__ctaTitle">
                {finalCta.title}
              </h2>
              <p className="sub__lead">{finalCta.body}</p>
              <div className="hero-actions">
                <a className="btn btn--primary" href={`${home}#contact`}>
                  {finalCta.primary}
                </a>
              </div>
              <p className="sol__ctaMicro">{finalCta.micro}</p>
            </section>
          </div>
        </article>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
