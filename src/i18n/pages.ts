import type { Locale } from "./config";

/**
 * Content for the topical-silo sub-pages. Each page is a self-contained silo
 * for the "13 Pillars of Full-Stack AI"; pillar bodies are written as ~40-60
 * word self-contained answers (GEO/AI-search citability) with question-style
 * H3s. Home holds Pillar 1 (AI Interface Layer).
 */

export type Pillar = { no: number; title: string; question: string; body: string };
export type Contrast = { beginner: string; fullstack: string };
export type RelatedLink = { slug: string; label: string };

export type PageContent = {
  slug: string; // path under /[locale]
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  imageAlt: string;
  fomoH2: string;
  fomoIntro: string;
  contrastBeginnerLabel: string;
  contrastFullstackLabel: string;
  contrast: Contrast[];
  pillarsH2: string;
  pillars: Pillar[];
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  relatedH2: string;
  related: RelatedLink[];
};

export type PagesDict = {
  servicesLabel: string;
  aiEngine: PageContent;
  securityData: PageContent;
  // "methodology" moved to src/i18n/solutions.ts: the /methodology route now
  // renders the Solutions sales page, not a pillar silo.
};

const en: PagesDict = {
  servicesLabel: "Services",
  aiEngine: {
    slug: "services/ai-engine",
    metaTitle: "AI Engine & Agent Orchestration | Full-Stack AI Development | NOVA",
    metaDescription:
      "Multi-agent orchestration, long-term context and memory, connected tools and dynamic LLM routing. NOVA builds the reasoning core behind production AI, not a thin chatbot wrapper.",
    keywords: [
      "agent orchestration",
      "LLM routing",
      "AI memory and context",
      "connected tools MCP",
      "full-stack AI development",
    ],
    breadcrumb: "AI Engine",
    eyebrow: "AI Solutions & Orchestration",
    h1: "The AI engine that thinks, routes, and remembers.",
    intro:
      "Under every premium interface sits the part clients never see and competitors underestimate: the engine. NOVA builds multi-agent orchestration, persistent memory, tool connectivity and dynamic model routing, the reasoning layer that turns a demo into a system your business can run on.",
    imageAlt:
      "Dark-mode 3D visualization of an interconnected multi-agent AI orchestration network with glowing nodes",
    fomoH2: "What separates a real AI engine from a wrapper?",
    fomoIntro:
      "Most agencies ship a single prompt in front of one model and call it AI. It answers one question, forgets the next, and cannot touch your systems. When a competitor deploys real orchestration with memory and routing, that gap becomes visible in weeks, not years.",
    contrastBeginnerLabel: "Beginner AI wrapper",
    contrastFullstackLabel: "NOVA full-stack AI",
    contrast: [
      {
        beginner: "One prompt, one model, no fallback when it fails.",
        fullstack: "Dynamic LLM routing picks the right model per task and fails over automatically.",
      },
      {
        beginner: "Forgets the user the moment the chat closes.",
        fullstack: "Persistent context and memory recall every prior interaction.",
      },
      {
        beginner: "Can only talk. It cannot do anything.",
        fullstack: "Connected tools let the agent query APIs, databases and your stack.",
      },
      {
        beginner: "A single bot guessing at every task.",
        fullstack: "Specialized agents orchestrated by a planner that delegates work.",
      },
    ],
    pillarsH2: "The four pillars of our AI engine",
    pillars: [
      {
        no: 2,
        title: "Agent Orchestration",
        question: "How does multi-agent orchestration work?",
        body: "A planner agent decomposes a goal into subtasks and delegates each to a specialized agent, then merges the results. This beats one monolithic prompt because every step is scoped, testable and independently improvable, so complex workflows stay reliable at scale.",
      },
      {
        no: 4,
        title: "Context & Memory",
        question: "Why does AI memory matter for business?",
        body: "Without memory an agent restarts from zero on every message. NOVA gives agents short-term working context and long-term memory in a vector store, so the system recalls a customer's history, preferences and past decisions and responds like a team that knows them.",
      },
      {
        no: 6,
        title: "Connected Tools",
        question: "What are connected tools in an AI agent?",
        body: "Connected tools let an agent act, not just talk. Through typed function calls and the Model Context Protocol, our agents query live APIs, read your database and trigger real operations, turning conversation into completed work with auditable results.",
      },
      {
        no: 8,
        title: "LLM Routing",
        question: "What is dynamic LLM routing?",
        body: "Dynamic routing sends each request to the model that fits it best: a fast model for classification, a frontier model for hard reasoning. This cuts cost and latency while raising quality, and adds automatic fail-over so a single provider outage never takes your product down.",
      },
    ],
    ctaH2: "Build on an engine, not a wrapper.",
    ctaBody:
      "If your AI has to remember customers, use your tools and stay up under load, you need the engine, not a demo. Let's scope it.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See enterprise security",
    relatedH2: "Continue exploring",
    related: [
      { slug: "services/security-data", label: "Enterprise Security & Data" },
      { slug: "methodology", label: "Automation & ROI" },
    ],
  },
  securityData: {
    slug: "services/security-data",
    metaTitle: "Enterprise AI Security & Data Foundation | Guardrails & Access | NOVA",
    metaDescription:
      "Hardcoded business rules, encrypted vector data foundation, human-in-the-loop approval checkpoints and strict access controls. NOVA builds AI enterprises can actually trust.",
    keywords: [
      "enterprise AI security",
      "AI guardrails",
      "human in the loop approval",
      "vector database encryption",
      "AI access control",
    ],
    breadcrumb: "Enterprise Security & Data",
    eyebrow: "Enterprise Security & Data",
    h1: "AI your enterprise can actually trust.",
    intro:
      "An AI that can act is an AI that can act wrongly. NOVA wraps every agent in hardcoded business rules, encrypted data foundations, human approval checkpoints and strict access controls, so autonomy never means losing control of your business.",
    imageAlt:
      "Dark-mode 3D render of a metallic security vault protecting an encrypted data core with glowing lattice",
    fomoH2: "Why is unsecured AI a liability, not an asset?",
    fomoIntro:
      "A wrapper with your API keys and no guardrails is one bad prompt away from leaking data, approving a refund it should not, or acting on a hallucination. As regulators and enterprise buyers demand proof of control, ungoverned AI stops being a feature and becomes a reason you lose the deal.",
    contrastBeginnerLabel: "Ungoverned AI",
    contrastFullstackLabel: "NOVA governed AI",
    contrast: [
      {
        beginner: "The model decides the rules on the fly.",
        fullstack: "Core business rules are hardcoded and cannot be prompted away.",
      },
      {
        beginner: "High-stakes actions run with no oversight.",
        fullstack: "Approval checkpoints put a human in the loop before it matters.",
      },
      {
        beginner: "Data sits in plain text, exposed by design.",
        fullstack: "Encrypted vector and record stores protect every embedding.",
      },
      {
        beginner: "Everyone and every agent sees everything.",
        fullstack: "Role-based access scopes data to who and what needs it.",
      },
    ],
    pillarsH2: "The four pillars of enterprise trust",
    pillars: [
      {
        no: 3,
        title: "Core Business Rules",
        question: "How do you stop AI from breaking the rules?",
        body: "Critical constraints live in code, not in a prompt a user can override. Refund limits, compliance boundaries and brand rules are enforced deterministically around the model, so the AI stays creative where it should and rigid where it must.",
      },
      {
        no: 5,
        title: "Data Foundation",
        question: "How is AI training and memory data secured?",
        body: "Your knowledge lives in an encrypted vector database with access-scoped embeddings, not a public model's memory. Data is isolated per tenant, encrypted at rest and in transit, and never used to train third-party models, so your competitive edge stays yours.",
      },
      {
        no: 7,
        title: "Approval Checkpoints",
        question: "What is human-in-the-loop approval?",
        body: "For irreversible or high-value actions the agent pauses and requests a human decision, with full context attached. This keeps speed on routine work while guaranteeing that money moved, contracts sent and data deleted always cross a person first.",
      },
      {
        no: 10,
        title: "Security & Access",
        question: "How is access to the AI controlled?",
        body: "Every agent, tool and user operates under least-privilege, role-based access control. Permissions are explicit, auditable and revocable, so a compromised account or a misbehaving agent is contained to exactly what it was allowed to touch, and nothing more.",
      },
    ],
    ctaH2: "Autonomy without losing control.",
    ctaBody:
      "If your industry demands proof of guardrails, approvals and access control, we build AI that passes the audit. Let's talk security.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See the AI engine",
    relatedH2: "Continue exploring",
    related: [
      { slug: "services/ai-engine", label: "AI Solutions & Orchestration" },
      { slug: "methodology", label: "Automation & ROI" },
    ],
  },
};

const pl: PagesDict = {
  servicesLabel: "Usługi",
  aiEngine: {
    slug: "services/ai-engine",
    metaTitle: "Silnik AI i orkiestracja agentów | Full-Stack AI | NOVA",
    metaDescription:
      "Orkiestracja wielu agentów, długoterminowy kontekst i pamięć, podłączone narzędzia i dynamiczny routing modeli LLM. NOVA buduje rdzeń rozumowania produkcyjnego AI, a nie cienką nakładkę na chatbota.",
    keywords: [
      "orkiestracja agentów",
      "routing LLM",
      "pamięć i kontekst AI",
      "podłączone narzędzia MCP",
      "full-stack AI",
    ],
    breadcrumb: "Silnik AI",
    eyebrow: "Rozwiązania AI i orkiestracja",
    h1: "Silnik AI, który myśli, routuje i pamięta.",
    intro:
      "Pod każdym dopracowanym interfejsem jest część, której klienci nie widzą, a konkurencja ją lekceważy: silnik. NOVA buduje orkiestrację wielu agentów, trwałą pamięć, łączność z narzędziami i dynamiczny routing modeli, czyli warstwę rozumowania, która zamienia demo w system, na którym firma może polegać.",
    imageAlt:
      "Ciemna wizualizacja 3D połączonej sieci orkiestracji wielu agentów AI ze świecącymi węzłami",
    fomoH2: "Co odróżnia prawdziwy silnik AI od nakładki?",
    fomoIntro:
      "Większość agencji stawia jeden prompt przed jednym modelem i nazywa to AI. Odpowie na jedno pytanie, zapomni kolejne i nie dotknie Twoich systemów. Gdy konkurent wdroży prawdziwą orkiestrację z pamięcią i routingiem, ta różnica staje się widoczna w tygodnie, nie lata.",
    contrastBeginnerLabel: "Nakładka dla początkujących",
    contrastFullstackLabel: "Full-stack AI od NOVA",
    contrast: [
      {
        beginner: "Jeden prompt, jeden model, brak planu B przy awarii.",
        fullstack: "Dynamiczny routing LLM dobiera właściwy model do zadania i sam przełącza się przy awarii.",
      },
      {
        beginner: "Zapomina użytkownika w chwili zamknięcia czatu.",
        fullstack: "Trwały kontekst i pamięć przywołują każdą wcześniejszą interakcję.",
      },
      {
        beginner: "Potrafi tylko rozmawiać. Nic nie zrobi.",
        fullstack: "Podłączone narzędzia pozwalają agentowi odpytać API, bazy i Twój stack.",
      },
      {
        beginner: "Jeden bot zgadujący przy każdym zadaniu.",
        fullstack: "Wyspecjalizowani agenci orkiestrowani przez plannera, który deleguje pracę.",
      },
    ],
    pillarsH2: "Cztery filary naszego silnika AI",
    pillars: [
      {
        no: 2,
        title: "Orkiestracja agentów",
        question: "Jak działa orkiestracja wielu agentów?",
        body: "Agent-planner rozkłada cel na podzadania i deleguje każde do wyspecjalizowanego agenta, a potem scala wyniki. Bije to jeden monolityczny prompt, bo każdy krok jest ograniczony, testowalny i osobno ulepszany, więc złożone procesy pozostają niezawodne w skali.",
      },
      {
        no: 4,
        title: "Kontekst i pamięć",
        question: "Dlaczego pamięć AI jest ważna dla biznesu?",
        body: "Bez pamięci agent zaczyna od zera przy każdej wiadomości. NOVA daje agentom krótkoterminowy kontekst roboczy i długoterminową pamięć w bazie wektorowej, więc system przywołuje historię klienta, preferencje i decyzje, i odpowiada jak zespół, który go zna.",
      },
      {
        no: 6,
        title: "Podłączone narzędzia",
        question: "Czym są podłączone narzędzia w agencie AI?",
        body: "Podłączone narzędzia pozwalają agentowi działać, nie tylko mówić. Przez typowane wywołania funkcji i protokół Model Context Protocol nasi agenci odpytują żywe API, czytają Twoją bazę i uruchamiają realne operacje, zamieniając rozmowę w wykonaną pracę z audytowalnym wynikiem.",
      },
      {
        no: 8,
        title: "Routing LLM",
        question: "Czym jest dynamiczny routing modeli LLM?",
        body: "Dynamiczny routing kieruje każde zapytanie do modelu, który pasuje najlepiej: szybki model do klasyfikacji, model frontier do trudnego rozumowania. Obniża to koszt i opóźnienia, podnosząc jakość, i dodaje automatyczne przełączanie, więc awaria jednego dostawcy nie kładzie produktu.",
      },
    ],
    ctaH2: "Buduj na silniku, nie na nakładce.",
    ctaBody:
      "Jeśli Twoje AI ma pamiętać klientów, korzystać z narzędzi i działać pod obciążeniem, potrzebujesz silnika, nie demo. Ustalmy zakres.",
    ctaPrimary: "Rozpocznij projekt",
    ctaSecondary: "Zobacz bezpieczeństwo enterprise",
    relatedH2: "Zobacz dalej",
    related: [
      { slug: "services/security-data", label: "Bezpieczeństwo i dane enterprise" },
      { slug: "methodology", label: "Automatyzacja i ROI" },
    ],
  },
  securityData: {
    slug: "services/security-data",
    metaTitle: "Bezpieczeństwo AI i fundament danych enterprise | NOVA",
    metaDescription:
      "Twarde reguły biznesowe w kodzie, szyfrowany fundament danych wektorowych, punkty akceptacji z człowiekiem w pętli i ścisła kontrola dostępu. NOVA buduje AI, któremu enterprise faktycznie ufa.",
    keywords: [
      "bezpieczeństwo AI enterprise",
      "guardrails AI",
      "człowiek w pętli akceptacja",
      "szyfrowanie bazy wektorowej",
      "kontrola dostępu AI",
    ],
    breadcrumb: "Bezpieczeństwo i dane enterprise",
    eyebrow: "Bezpieczeństwo i dane enterprise",
    h1: "AI, któremu firma naprawdę może zaufać.",
    intro:
      "AI, które potrafi działać, potrafi też zadziałać źle. NOVA otacza każdego agenta twardymi regułami biznesowymi, szyfrowanym fundamentem danych, punktami akceptacji przez człowieka i ścisłą kontrolą dostępu, więc autonomia nigdy nie oznacza utraty kontroli nad firmą.",
    imageAlt:
      "Ciemny render 3D metalicznego sejfu chroniącego zaszyfrowany rdzeń danych ze świecącą siatką",
    fomoH2: "Dlaczego niezabezpieczone AI to obciążenie, nie atut?",
    fomoIntro:
      "Nakładka z Twoimi kluczami API i bez zabezpieczeń jest o jeden zły prompt od wycieku danych, zatwierdzenia zwrotu, którego nie powinna, albo działania na halucynacji. Gdy regulatorzy i kupujący z enterprise żądają dowodu kontroli, AI bez ładu przestaje być funkcją, a staje się powodem przegranej oferty.",
    contrastBeginnerLabel: "AI bez ładu",
    contrastFullstackLabel: "AI z ładem od NOVA",
    contrast: [
      {
        beginner: "Model ustala reguły w locie.",
        fullstack: "Kluczowe reguły biznesowe są w kodzie i nie da się ich obejść promptem.",
      },
      {
        beginner: "Ryzykowne akcje biegną bez nadzoru.",
        fullstack: "Punkty akceptacji stawiają człowieka w pętli, zanim zrobi się poważnie.",
      },
      {
        beginner: "Dane leżą jawnym tekstem, odsłonięte z założenia.",
        fullstack: "Szyfrowane magazyny wektorów i rekordów chronią każdy embedding.",
      },
      {
        beginner: "Każdy i każdy agent widzi wszystko.",
        fullstack: "Dostęp oparty na rolach zawęża dane do tego, kto i co ich potrzebuje.",
      },
    ],
    pillarsH2: "Cztery filary zaufania enterprise",
    pillars: [
      {
        no: 3,
        title: "Kluczowe reguły biznesowe",
        question: "Jak powstrzymać AI przed łamaniem reguł?",
        body: "Krytyczne ograniczenia żyją w kodzie, nie w promptcie, który użytkownik nadpisze. Limity zwrotów, granice compliance i zasady marki są egzekwowane deterministycznie wokół modelu, więc AI zostaje kreatywne tam, gdzie ma być, i sztywne tam, gdzie musi.",
      },
      {
        no: 5,
        title: "Fundament danych",
        question: "Jak zabezpieczone są dane treningowe i pamięć AI?",
        body: "Twoja wiedza żyje w szyfrowanej bazie wektorowej z embeddingami o zawężonym dostępie, nie w pamięci publicznego modelu. Dane są izolowane per klient, szyfrowane w spoczynku i w tranzycie i nigdy nie trenują cudzych modeli, więc Twoja przewaga zostaje Twoja.",
      },
      {
        no: 7,
        title: "Punkty akceptacji",
        question: "Czym jest akceptacja z człowiekiem w pętli?",
        body: "Przy akcjach nieodwracalnych lub o dużej wartości agent zatrzymuje się i prosi o decyzję człowieka, z pełnym kontekstem. Utrzymuje to szybkość przy rutynie, gwarantując, że przelane pieniądze, wysłane umowy i usunięte dane zawsze najpierw mijają człowieka.",
      },
      {
        no: 10,
        title: "Bezpieczeństwo i dostęp",
        question: "Jak kontrolowany jest dostęp do AI?",
        body: "Każdy agent, narzędzie i użytkownik działa w modelu najmniejszych uprawnień, opartym na rolach. Uprawnienia są jawne, audytowalne i odwoływalne, więc przejęte konto lub rozregulowany agent jest ograniczony dokładnie do tego, na co mu pozwolono, i niczego więcej.",
      },
    ],
    ctaH2: "Autonomia bez utraty kontroli.",
    ctaBody:
      "Jeśli Twoja branża wymaga dowodu zabezpieczeń, akceptacji i kontroli dostępu, budujemy AI, które przejdzie audyt. Porozmawiajmy o bezpieczeństwie.",
    ctaPrimary: "Rozpocznij projekt",
    ctaSecondary: "Zobacz silnik AI",
    relatedH2: "Zobacz dalej",
    related: [
      { slug: "services/ai-engine", label: "Rozwiązania AI i orkiestracja" },
      { slug: "methodology", label: "Automatyzacja i ROI" },
    ],
  },
};

const PAGES: Record<Locale, PagesDict> = { en, pl };

export const getPages = (locale: Locale): PagesDict => PAGES[locale] ?? en;
