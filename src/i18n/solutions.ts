import type { Locale } from "./config";

/**
 * Content for the "Solutions" sales page. Rendered at the existing
 * /methodology route (URL and nav label unchanged, page content replaced).
 * Not a pillar page: hero, before/after slider, bento use cases, proof
 * demos, tech stack, ROI calculator and FAQ. Bilingual, no dashes.
 */

export type BentoTile = { icon: string; title: string; body: string; roi: string };
export type DemoItem = { tag: string; duration: string; title: string; body: string };
export type FaqItem = { q: string; a: string };

export type SolutionsContent = {
  slug: string; // "methodology" (existing route, content replaced)
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumb: string;
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    beforeLabel: string;
    beforeItems: string[];
    afterLabel: string;
    afterItems: string[];
    hint: string;
  };
  bento: { eyebrow: string; title: string; tiles: BentoTile[] };
  demos: { eyebrow: string; title: string; items: DemoItem[] };
  stack: { eyebrow: string; lead: string; tools: string[] };
  calculator: {
    eyebrow: string;
    title: string;
    hoursLabel: string;
    costLabel: string;
    outLabel: string;
    hoursSuffix: string;
    outNote: string;
    defaultHours: number;
    defaultCost: number;
  };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  finalCta: { title: string; body: string; primary: string; micro: string };
};

const en: SolutionsContent = {
  slug: "methodology",
  metaTitle: "Automation & AI Solutions: Scraping, Workflows, Growth | NOVA",
  metaDescription:
    "NOVA builds scraping, marketing automation and n8n workflow systems that replace manual work with measurable ROI. Proof of concept in days, not quarters.",
  keywords: [
    "workflow automation agency",
    "web scraping at scale",
    "marketing automation proxies",
    "n8n orchestration",
    "AI automation ROI",
  ],
  breadcrumb: "Methodology",
  hero: {
    eyebrow: "NOVA Studio, AI & Automation",
    h1: "You're paying people to do work code finishes in a second.",
    sub: "We design and ship automation systems that replace manual busywork in weeks, not quarters. No theory. No slide decks. Working code from day one.",
    ctaPrimary: "Book a free Automation Audit",
    ctaSecondary: "See our systems in action",
  },
  beforeAfter: {
    eyebrow: "Before / after",
    title: "Same business, two different ways of running it.",
    beforeLabel: "Chaos",
    beforeItems: [
      "17 spreadsheet tabs, none of them current.",
      "Someone copies data from one system to another. Every single day.",
      "Leads sit in an inbox, a Messenger thread and one person's head.",
      "The monthly report takes 3 days and is outdated the moment it lands.",
    ],
    afterLabel: "After",
    afterItems: [
      "One dashboard, one source of truth, updated by the minute.",
      "Systems talk to each other over API. Zero copy-paste, zero errors.",
      "Leads land exactly where they should, the moment they appear.",
      "The report builds itself before you'd think to ask for it.",
    ],
    hint: "Drag to compare",
  },
  bento: {
    eyebrow: "What we build",
    title: "Three engines, one scale.",
    tiles: [
      {
        icon: "◎",
        title: "Data scraping & lead generation",
        body: "Python and Apify pull data from sites, directories and social platforms at a scale no manual team can match.",
        roi: "Thousands of verified leads before a rep opens a single profile",
      },
      {
        icon: "▤",
        title: "Social media & marketing automation",
        body: "We manage dozens of accounts at once through residential and ISP proxies, within platform rules.",
        roi: "Scale reach without ban risk or another hire",
      },
      {
        icon: "⌁",
        title: "Workflow orchestration in n8n",
        body: "We wire your CRM, inbox, payments and inventory into one automated flow between systems.",
        roi: "Dozens of manual hours handed back to your team every week",
      },
    ],
  },
  demos: {
    eyebrow: "Proof, not promises",
    title: "See our systems in action",
    items: [
      {
        tag: "Scraping",
        duration: "0:14",
        title: "1,000 leads in under a second",
        body: "The script queries the source, dedupes, and saves a ready contact list before you'd click refresh.",
      },
      {
        tag: "Social AI",
        duration: "0:22",
        title: "A bot that runs your social media",
        body: "One agent schedules, posts and replies across a dozen accounts at once, without a single manual login.",
      },
      {
        tag: "LLM Pipeline",
        duration: "0:19",
        title: "Documents read and processed by AI",
        body: "Invoices and contracts go in as PDFs, structured data comes out in your system. Zero manual entry.",
      },
    ],
  },
  stack: {
    eyebrow: "Tech stack",
    lead: "SaaS ends where your process begins. Python, n8n, Apify, OpenAI, AWS and Oxylabs start exactly there, with no ceiling on scale.",
    tools: ["Python", "n8n", "Apify", "OpenAI", "AWS", "Oxylabs"],
  },
  calculator: {
    eyebrow: "ROI calculator",
    title: "How much is manual work really costing you?",
    hoursLabel: "Manual hours lost / week",
    costLabel: "Cost per hour",
    outLabel: "Projected annual savings",
    hoursSuffix: "hours reclaimed / year",
    outNote:
      "Estimate assumes a 48-week working year. That's real budget you can put toward growth instead of spreadsheets.",
    defaultHours: 15,
    defaultCost: 80,
  },
  faq: {
    eyebrow: "FAQ",
    title: "The questions you'd ask anyway",
    items: [
      {
        q: "How fast do we see automation actually working?",
        a: "You get a working Proof of Concept in 5 to 10 business days, not after a quarter of meetings. A typical process goes fully live in 2 to 6 weeks, depending on how many integrations it touches.",
      },
      {
        q: "Why a small, agile team instead of a large corporate agency?",
        a: "A large agency sells you layers of management first: an account manager, an analyst, an engineer somewhere further down the chain. We're engineers from the first call. Fewer layers means faster decisions, lower cost, and working code before the competition finishes writing the proposal.",
      },
      {
        q: "Will this integrate with our existing systems (CRM, ERP, warehouse)?",
        a: "Yes. We don't sell a closed platform, we build on APIs and webhooks, so we connect to whatever you already run, from Salesforce to your own internal system.",
      },
      {
        q: "What about data security and scaling under heavy traffic, like web scraping?",
        a: "Every scraping system we build runs on rotating residential and ISP proxies, respecting source rate limits and legal compliance. Infrastructure on AWS scales with your traffic, so 10x the data doesn't mean 10x the problems.",
      },
    ],
  },
  finalCta: {
    title: "We'll diagnose your most expensive manual process. Free. In 15 minutes.",
    body: "No sales rep with a deck. You talk directly to an engineer who tells you exactly what to automate, how, and what it will actually save.",
    primary: "Book your Automation Audit",
    micro: "15 minutes, zero commitment, a concrete plan by the end of the call.",
  },
};

const pl: SolutionsContent = {
  slug: "methodology",
  metaTitle: "Automatyzacja i AI: Scraping, Workflow, Wzrost | NOVA",
  metaDescription:
    "NOVA buduje systemy scrapingu, automatyzacji marketingu i orkiestracji n8n, które zastępują ręczną pracę mierzalnym ROI. Proof of concept w dni, nie kwartały.",
  keywords: [
    "automatyzacja procesów agencja",
    "web scraping na skalę",
    "automatyzacja marketingu proxy",
    "orkiestracja n8n",
    "ROI automatyzacji AI",
  ],
  breadcrumb: "Metodologia",
  hero: {
    eyebrow: "NOVA Studio, AI i automatyzacja",
    h1: "Płacisz ludziom za pracę, którą kod wykona w sekundę.",
    sub: "Projektujemy i wdrażamy systemy automatyzacji, które zastępują ręczną robotę w tygodnie, nie kwartały. Bez teorii. Bez slajdów. Działający kod od pierwszego dnia.",
    ctaPrimary: "Zarezerwuj darmowy Audyt Automatyzacji",
    ctaSecondary: "Zobacz systemy w akcji",
  },
  beforeAfter: {
    eyebrow: "Przed / po",
    title: "Ten sam biznes, dwa różne sposoby działania.",
    beforeLabel: "Chaos",
    beforeItems: [
      "17 zakładek w Excelu, z których żadna nie jest aktualna.",
      "Ktoś ręcznie kopiuje dane z jednego systemu do drugiego. Codziennie.",
      "Leady siedzą w mailu, w Messengerze i w głowie jednej osoby.",
      "Raport miesięczny gotowy po 3 dniach i już nieaktualny w chwili wysłania.",
    ],
    afterLabel: "Po",
    afterItems: [
      "Jeden dashboard, jedna prawda o firmie, aktualizowana co minutę.",
      "Systemy rozmawiają ze sobą przez API. Zero kopiowania, zero błędów.",
      "Leady trafiają dokładnie tam, gdzie mają, w chwili gdy się pojawią.",
      "Raport generuje się sam, zanim zdążysz o niego poprosić.",
    ],
    hint: "Przeciągnij, żeby porównać",
  },
  bento: {
    eyebrow: "Co budujemy",
    title: "Trzy silniki, jedna skala.",
    tiles: [
      {
        icon: "◎",
        title: "Scraping danych i pozyskiwanie leadów",
        body: "Python i Apify wyciągają dane ze stron, katalogów i social media na skalę, jakiej ręcznie nie osiągnie żaden zespół.",
        roi: "Tysiące zweryfikowanych leadów, zanim handlowiec otworzy jeden profil",
      },
      {
        icon: "▤",
        title: "Automatyzacja social media i marketingu",
        body: "Zarządzamy dziesiątkami kont jednocześnie przez rezydencjalne i ISP proxy, zgodnie z regułami platform.",
        roi: "Skalujesz zasięg bez ryzyka bana i bez kolejnego etatu",
      },
      {
        icon: "⌁",
        title: "Orkiestracja procesów w n8n",
        body: "Spinamy CRM, maile, płatności i magazyn w jeden automatyczny przepływ pracy między systemami.",
        roi: "Dziesiątki godzin ręcznej roboty oddane zespołowi co tydzień",
      },
    ],
  },
  demos: {
    eyebrow: "Dowód, nie obietnica",
    title: "Zobacz nasze systemy w akcji",
    items: [
      {
        tag: "Scraping",
        duration: "0:14",
        title: "1000 leadów w mniej niż sekundę",
        body: "Skrypt odpytuje źródło, filtruje duplikaty i zapisuje gotową bazę kontaktów, zanim zdążysz kliknąć „odśwież”.",
      },
      {
        tag: "Social AI",
        duration: "0:22",
        title: "Bot, który prowadzi social media za Ciebie",
        body: "Jeden agent planuje, publikuje i odpowiada na komentarze na kilkunastu kontach jednocześnie, bez ręcznego logowania.",
      },
      {
        tag: "LLM Pipeline",
        duration: "0:19",
        title: "Dokumenty czytane i przetwarzane przez AI",
        body: "Faktury i umowy wchodzą jako PDF, na wyjściu masz ustrukturyzowane dane w swoim systemie. Zero ręcznego wpisu.",
      },
    ],
  },
  stack: {
    eyebrow: "Tech stack",
    lead: "SaaS-y kończą się tam, gdzie zaczyna się Twój proces. Python, n8n, Apify, OpenAI, AWS i Oxylabs zaczynają dokładnie w tym miejscu, i nie mają górnego limitu skali.",
    tools: ["Python", "n8n", "Apify", "OpenAI", "AWS", "Oxylabs"],
  },
  calculator: {
    eyebrow: "Kalkulator ROI",
    title: "Ile realnie tracisz na ręcznej pracy?",
    hoursLabel: "Godziny ręcznej pracy / tydzień",
    costLabel: "Koszt roboczogodziny",
    outLabel: "Projektowana oszczędność rocznie",
    hoursSuffix: "godzin odzyskanych / rok",
    outNote:
      "Szacunek przy założeniu 48 tygodni roboczych w roku. To realny budżet, który możesz przenieść na wzrost, nie na klikanie w Excelu.",
    defaultHours: 15,
    defaultCost: 80,
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pytania, które i tak zadasz",
    items: [
      {
        q: "Jak szybko zobaczymy efekty automatyzacji?",
        a: "Pierwszy działający prototyp (Proof of Concept) dostajesz w 5 do 10 dni roboczych, nie po kwartale spotkań. Pełne wdrożenie typowego procesu zamykamy w 2 do 6 tygodni, zależnie od liczby integracji.",
      },
      {
        q: "Dlaczego mały, zwinny zespół zamiast dużej agencji korporacyjnej?",
        a: "Duża agencja sprzedaje Ci najpierw warstwy zarządzania: account managera, analityka, dopiero potem inżyniera. My jesteśmy inżynierami od pierwszej rozmowy. Mniej pośredników to szybsze decyzje, niższy koszt i kod, który działa, zanim konkurencja skończy pisać ofertę.",
      },
      {
        q: "Czy zintegrujecie się z naszymi obecnymi systemami (CRM, ERP, magazyn)?",
        a: "Tak. Nie sprzedajemy zamkniętej platformy, budujemy na API i webhookach, więc łączymy się z tym, czego już używacie, od Salesforce po własny, wewnętrzny system.",
      },
      {
        q: "Co z bezpieczeństwem danych i skalowaniem przy dużym ruchu, na przykład przy web scrapingu?",
        a: "Każdy system scrapujący budujemy na rotowanych proxy rezydencjalnych i ISP, z poszanowaniem limitów źródła i zgodności prawnej. Infrastruktura na AWS skaluje się wraz z ruchem, więc 10x więcej danych nie znaczy 10x więcej problemów.",
      },
    ],
  },
  finalCta: {
    title: "Zdiagnozujemy Twój najdroższy ręczny proces. Za darmo. W 15 minut.",
    body: "Żadnego handlowca z prezentacją. Rozmawiasz bezpośrednio z inżynierem, który powie wprost, co i jak zautomatyzować, i ile to realnie oszczędzi.",
    primary: "Zarezerwuj Audyt Automatyzacji",
    micro: "15 minut, zero zobowiązań, konkretny plan na koniec rozmowy.",
  },
};

const SOLUTIONS: Record<Locale, SolutionsContent> = { en, pl };

export const getSolutions = (locale: Locale): SolutionsContent => SOLUTIONS[locale] ?? en;
