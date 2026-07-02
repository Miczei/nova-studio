import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import MacbookComparison from "@/components/MacbookComparison";
import ChatbotShowcase from "@/components/ChatbotShowcase";
import Process from "@/components/Process";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/dictionaries";
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

  return (
    <main>
      <Navbar locale={locale} dict={dict} />
      <Hero dict={dict} />
      <Capabilities dict={dict} />
      <MacbookComparison dict={dict} />
      <ChatbotShowcase dict={dict} />
      <Process dict={dict} />
      <InteractiveGlobe dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
