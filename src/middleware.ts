import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  // Polish is the priority market: every unprefixed path (including "/")
  // always redirects to defaultLocale ("pl"), regardless of the visitor's
  // Accept-Language. English stays reachable via the navbar's PL/EN toggle
  // or a direct /en URL — it's just never auto-detected into anymore.
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension (assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
