import type { Locale } from "./config";

/**
 * Content for the "About us" page. A storytelling silo (origin story + what we
 * build) rather than a pillar page, so it has its own shape. Copy is written
 * for the elite/enterprise tone: the "students from Kraków" angle is framed as
 * an engineering-prodigy origin story, dense with LSI keywords (enterprise AI
 * development, autonomous agents, full-stack engineering). Bilingual, no dashes.
 */

export type AboutValue = { title: string; body: string };

export type AboutContent = {
  slug: string; // "about"
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  storyH2: string;
  story: string[];
  imageAlt: string;
  valuesH2: string;
  values: AboutValue[];
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondarySlug: string;
};

const en: AboutContent = {
  slug: "about",
  metaTitle: "About NOVA: The Kraków Engineers Behind Enterprise AI | NOVA",
  metaDescription:
    "Meet NOVA, a close-knit team of engineers from Kraków building enterprise AI development, autonomous agents and full-stack engineering. The origin story of an AI-native studio.",
  keywords: [
    "enterprise AI development",
    "autonomous agents",
    "full-stack engineering",
    "AI studio Krakow",
    "AI-native web studio",
  ],
  breadcrumb: "About us",
  eyebrow: "About NOVA",
  h1: "The Kraków engineers redefining enterprise AI.",
  lead: "NOVA is a close-knit collective of computer science and engineering minds from Kraków, building full-stack AI systems and autonomous agents for companies that refuse to settle for a chatbot. We architect the interface, the engine and the guardrails as one.",
  storyH2: "The idea was born late at night, over a high-stakes game of cards.",
  story: [
    "It did not start in a boardroom. It started at a table in Kraków, long past midnight, mid-game, when a hand of cards turned into a whiteboard argument about why enterprise AI keeps breaking the moment it leaves the demo. By sunrise the core architecture had a name and a shape.",
    "We were the students everyone assumed would disappear into the big research labs. We chose the harder problem instead: autonomous agents that enterprises can actually trust, wrapped in hardcoded business rules, human approval checkpoints and real full-stack engineering behind every single decision.",
    "That late-night session became NOVA. Same obsession, same small team, now shipping production AI infrastructure and elite web experiences for clients across Europe and beyond.",
  ],
  imageAlt:
    "Detailed engraving of the Kraków skyline with Wawel Castle, the home city of the NOVA engineering team.",
  valuesH2: "What we actually build",
  values: [
    {
      title: "Enterprise AI development",
      body: "Full-stack AI systems engineered for scale, not demos. From the reasoning engine to the deployment pipeline, we build infrastructure that survives real production load.",
    },
    {
      title: "Autonomous agents",
      body: "Multi-agent networks that act, not just answer. Connected to your tools and data, governed by hardcoded rules and human approval checkpoints, so autonomy never means losing control.",
    },
    {
      title: "Full-stack engineering",
      body: "One team owning interface, engine, data and security. No handoffs, no wrappers, no thin veneer over someone else's model. Elite web experiences with real engineering underneath.",
    },
  ],
  ctaH2: "Let's build something the enterprise can trust.",
  ctaBody:
    "Whether you need autonomous agents, a secured data foundation or a flagship AI web platform, we scope it end to end. Start the conversation.",
  ctaPrimary: "Start a project",
  ctaSecondary: "See the AI engine",
  ctaSecondarySlug: "services/ai-engine",
};

const pl: AboutContent = {
  slug: "about",
  metaTitle: "O NOVA: krakowscy inżynierowie enterprise AI | NOVA",
  metaDescription:
    "Poznaj NOVA, zżyty zespół inżynierów z Krakowa budujący enterprise AI development, autonomicznych agentów i full-stack engineering. Historia studia AI-native.",
  keywords: [
    "enterprise AI development",
    "autonomiczni agenci",
    "full-stack engineering",
    "studio AI Kraków",
    "studio webowe AI",
  ],
  breadcrumb: "O nas",
  eyebrow: "O NOVA",
  h1: "Krakowscy inżynierowie, którzy redefiniują enterprise AI.",
  lead: "NOVA to zżyty zespół umysłów informatyki i inżynierii z Krakowa, budujący full-stackowe systemy AI i autonomicznych agentów dla firm, które nie godzą się na zwykłego chatbota. Projektujemy interfejs, silnik i zabezpieczenia jako jedną całość.",
  storyH2: "Pomysł narodził się późną nocą, przy partii kart o wysoką stawkę.",
  story: [
    "To nie zaczęło się w sali konferencyjnej. Zaczęło się przy stole w Krakowie, długo po północy, w trakcie gry, gdy rozdanie kart zamieniło się w spór przy tablicy o to, dlaczego enterprise AI wykłada się w chwili, gdy wychodzi z demo. Do świtu rdzeń architektury miał już nazwę i kształt.",
    "Byliśmy tymi studentami, o których wszyscy zakładali, że znikną w wielkich laboratoriach badawczych. Wybraliśmy trudniejszy problem: autonomicznych agentów, którym enterprise naprawdę może zaufać, otoczonych twardo zakodowanymi regułami biznesowymi, punktami akceptacji przez człowieka i prawdziwą full-stackową inżynierią za każdą decyzją.",
    "Tamta nocna sesja stała się NOVA. Ta sama obsesja, ten sam mały zespół, dziś dostarczający produkcyjną infrastrukturę AI i elitarne doświadczenia webowe klientom w Europie i poza nią.",
  ],
  imageAlt:
    "Szczegółowy sztych panoramy Krakowa z Wawelem, rodzinnego miasta zespołu inżynierów NOVA.",
  valuesH2: "Co naprawdę budujemy",
  values: [
    {
      title: "Enterprise AI development",
      body: "Full-stackowe systemy AI zaprojektowane pod skalę, nie pod demo. Od silnika rozumowania po pipeline wdrożeniowy budujemy infrastrukturę, która wytrzymuje realne obciążenie produkcyjne.",
    },
    {
      title: "Autonomiczni agenci",
      body: "Sieci wielu agentów, które działają, nie tylko odpowiadają. Podłączone do Twoich narzędzi i danych, rządzone twardymi regułami i akceptacją człowieka, więc autonomia nigdy nie oznacza utraty kontroli.",
    },
    {
      title: "Full-stack engineering",
      body: "Jeden zespół odpowiadający za interfejs, silnik, dane i bezpieczeństwo. Bez przekazań, bez nakładek, bez cienkiej fasady na cudzym modelu. Elitarny web z prawdziwą inżynierią pod spodem.",
    },
  ],
  ctaH2: "Zbudujmy coś, czemu enterprise zaufa.",
  ctaBody:
    "Czy potrzebujesz autonomicznych agentów, zabezpieczonego fundamentu danych, czy flagowej platformy AI, ustalamy zakres od początku do końca. Zacznij rozmowę.",
  ctaPrimary: "Rozpocznij projekt",
  ctaSecondary: "Zobacz silnik AI",
  ctaSecondarySlug: "services/ai-engine",
};

const ABOUT: Record<Locale, AboutContent> = { en, pl };

export const getAbout = (locale: Locale): AboutContent => ABOUT[locale] ?? en;
