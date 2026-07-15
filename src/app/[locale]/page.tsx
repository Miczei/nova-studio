import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoudersHero from "@/components/couders/CoudersHero";
import ImpactTelemetry from "@/components/couders/ImpactTelemetry";
import ProcessSection from "@/components/couders/ProcessSection";
import LogoTicker from "@/components/couders/LogoTicker";
import RoiEstimator from "@/components/couders/RoiEstimator";
import ReachBento from "@/components/couders/ReachBento";
import Commitments from "@/components/couders/Commitments";
import CtaSection from "@/components/couders/CtaSection";
import { getDictionary } from "@/i18n/dictionaries";
import { getCouders } from "@/i18n/couders";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

// See layout.tsx: params must be typed as `string` to match the type Next.js
// generates from generateStaticParams; narrow to Locale here instead.
function toLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value)
    ? (value as Locale)
    : defaultLocale;
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const couders = getCouders(locale);

  return (
    <div className="sub-shell couders-shell">
      <Navbar locale={locale} dict={dict} />
      <main>
        <CoudersHero content={couders.hero} />
        <ProcessSection content={couders.process} />
        <ImpactTelemetry content={couders.telemetry} />
        <LogoTicker content={couders.logoTicker} />
        <RoiEstimator content={couders.roiEstimator} locale={locale} />
        <ReachBento content={couders.reach} />
        <Commitments content={couders.commitments} />
        <CtaSection content={couders.cta} email={dict.sections.contact.email} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
