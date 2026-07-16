import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Footer — server component. Caps the page with brand, cross-silo links, and
 * copyright. Section anchors are locale-prefixed so they work from any page.
 */
export default function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const f = dict.sections.footer;
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <span className="nav__brand">Couders</span>
          <span className="footer__tagline">{f.tagline}</span>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link href={`${home}/about`}>{dict.nav.about}</Link>
          <Link href={`${home}/services/ai-engine`}>{dict.nav.aiEngine}</Link>
          <Link href={`${home}/services/security-data`}>{dict.nav.securityData}</Link>
          <Link href={`${home}/methodology`}>{dict.nav.methodology}</Link>
        </nav>

        <div className="footer__meta">
          © {year} Couders. {f.rights}
        </div>
      </div>
    </footer>
  );
}
