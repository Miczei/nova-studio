"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Transparent, sticky navbar. Links the topical-silo pages and (home) section
 * anchors. The PL / EN toggle preserves the current path across languages, so
 * switching on /en/methodology lands on /pl/methodology (SEO-friendly).
 */
export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Path without the leading locale segment, so the toggle can re-prefix it.
  let rest = pathname;
  for (const l of locales) {
    if (pathname === `/${l}`) rest = "";
    else if (pathname.startsWith(`/${l}/`)) rest = pathname.slice(l.length + 1);
  }
  const home = `/${locale}`;

  // Active state keyed on the locale-stripped path (rest): "" is home,
  // "/about" etc. for the silos. Drives styling + aria-current for a11y/SEO.
  const cls = (p: string) => `nav__link${rest === p ? " nav__link--active" : ""}`;
  const cur = (p: string) => (rest === p ? "page" : undefined);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <Link className="nav__brand" href={home}>
        NOVA
      </Link>

      <nav className="nav__links" aria-label="Primary">
        <Link href={home} className={cls("")} aria-current={cur("")}>
          {dict.nav.home}
        </Link>
        <Link href={`${home}/about`} className={cls("/about")} aria-current={cur("/about")}>
          {dict.nav.about}
        </Link>
        <Link
          href={`${home}/services/ai-engine`}
          className={cls("/services/ai-engine")}
          aria-current={cur("/services/ai-engine")}
        >
          {dict.nav.aiEngine}
        </Link>
        <Link
          href={`${home}/services/security-data`}
          className={cls("/services/security-data")}
          aria-current={cur("/services/security-data")}
        >
          {dict.nav.securityData}
        </Link>
        <Link
          href={`${home}/methodology`}
          className={cls("/methodology")}
          aria-current={cur("/methodology")}
        >
          {dict.nav.methodology}
        </Link>
      </nav>

      <div className="nav__right">
        <div className="lang-toggle" role="group" aria-label={dict.nav.languageLabel}>
          <Link
            href={`/pl${rest}`}
            hrefLang="pl"
            aria-current={locale === "pl" ? "true" : undefined}
            className={`lang ${locale === "pl" ? "lang--active" : ""}`}
          >
            PL
          </Link>
          <span className="lang-sep" aria-hidden="true">
            /
          </span>
          <Link
            href={`/en${rest}`}
            hrefLang="en"
            aria-current={locale === "en" ? "true" : undefined}
            className={`lang ${locale === "en" ? "lang--active" : ""}`}
          >
            EN
          </Link>
        </div>

        <a className="nav__cta" href={`${home}#contact`}>
          {dict.nav.cta}
        </a>
      </div>
    </header>
  );
}
