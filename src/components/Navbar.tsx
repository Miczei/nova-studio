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
 *
 * Below 768px the horizontal `.nav__links` (hidden by the existing
 * `min-width: 900px` rule with no fallback) is replaced by a hamburger +
 * slide-in drawer. All of the drawer's visible/open-state CSS lives inside
 * `@media (max-width: 768px)` in globals.css, so it cannot affect anything
 * above that width even if `mobileOpen` were somehow still true there.
 */
export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, on Escape, and if the viewport is
  // resized past the mobile breakpoint (so a locked body scroll can never
  // get stranded once the hamburger itself is no longer reachable).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", onResize);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

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

  const mobileLabel = locale === "pl" ? "Menu mobilne" : "Mobile menu";
  const openLabel = locale === "pl" ? "Otwórz menu" : "Open menu";
  const closeLabel = locale === "pl" ? "Zamknij menu" : "Close menu";

  const navItems = [
    { href: home, path: "", label: dict.nav.home },
    { href: `${home}/about`, path: "/about", label: dict.nav.about },
    { href: `${home}/services/ai-engine`, path: "/services/ai-engine", label: dict.nav.aiEngine },
    {
      href: `${home}/services/security-data`,
      path: "/services/security-data",
      label: dict.nav.securityData,
    },
    { href: `${home}/methodology`, path: "/methodology", label: dict.nav.methodology },
    { href: `${home}/contact`, path: "/contact", label: dict.nav.contact },
  ];

  return (
    <>
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__left">
        <button
          type="button"
          className={`nav__burger ${mobileOpen ? "nav__burger--open" : ""}`}
          aria-label={mobileOpen ? closeLabel : openLabel}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <Link className="nav__brand" href={home}>
          Couders
        </Link>
      </div>

      <nav className="nav__links" aria-label="Primary">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.href}
            className={cls(item.path)}
            aria-current={cur(item.path)}
          >
            {item.label}
          </Link>
        ))}
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
      </div>
    </header>

    {/*
      Rendered as siblings of <header>, not children: `.nav--scrolled`
      applies `backdrop-filter` once the page scrolls, and any ancestor
      with `filter`/`backdrop-filter` becomes the containing block for
      `position: fixed` descendants. Nesting the drawer inside <header>
      made it resize to the header's own (thin) box the moment you
      scrolled and opened it — this keeps its fixed positioning anchored
      to the viewport regardless of scroll/header state.
    */}
    <div
      className={`nav__mobile-backdrop ${mobileOpen ? "nav__mobile-backdrop--open" : ""}`}
      onClick={() => setMobileOpen(false)}
      aria-hidden="true"
    />

    <nav
      id="mobile-nav-panel"
      className={`nav__mobile-panel ${mobileOpen ? "nav__mobile-panel--open" : ""}`}
      aria-label={mobileLabel}
    >
      <div className="nav__mobile-head">
        <span className="nav__brand">Couders</span>
        <button
          type="button"
          className="nav__mobile-close"
          aria-label={closeLabel}
          onClick={() => setMobileOpen(false)}
        >
          &times;
        </button>
      </div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.href}
          className={cls(item.path)}
          aria-current={cur(item.path)}
          onClick={() => setMobileOpen(false)}
        >
          {item.label}
        </Link>
      ))}

      {/* On mobile the language toggle lives here, not in the header row
          (there it collided with the brand on narrow phones). */}
      <div className="nav__mobile-lang" role="group" aria-label={dict.nav.languageLabel}>
        <Link
          href={`/pl${rest}`}
          hrefLang="pl"
          aria-current={locale === "pl" ? "true" : undefined}
          className={`lang ${locale === "pl" ? "lang--active" : ""}`}
          onClick={() => setMobileOpen(false)}
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
          onClick={() => setMobileOpen(false)}
        >
          EN
        </Link>
      </div>

      <a
        className="nav__cta nav__mobile-cta"
        href={`${home}#contact`}
        onClick={() => setMobileOpen(false)}
      >
        {dict.nav.cta}
      </a>
    </nav>
    </>
  );
}
