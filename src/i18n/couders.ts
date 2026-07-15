import type { Locale } from "./config";

export type CoudersTelemetryCard = {
  /** null => a static/non-numeric metric (e.g. "24/7"), rendered via `display`. */
  value: number | null;
  decimals: number;
  suffix: string;
  display?: string;
  title: string;
  body: string;
  span: string;
  accent: boolean;
};

export type CoudersContent = {
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    morphAria: string;
  };
  telemetry: {
    eyebrow: string;
    h2: string;
    cards: CoudersTelemetryCard[];
  };
  roiEstimator: {
    eyebrow: string;
    h2: string;
    lead: string;
    slider1Label: string;
    slider2Label: string;
    hoursLabel: string;
    savingsLabel: string;
    ctaLabel: string;
  };
  logoTicker: {
    rowModels: string;
    rowInfra: string;
    marqueeAria: string;
  };
  process: {
    eyebrow: string;
    h2: string;
    steps: { no: string; title: string; body: string }[];
  };
  reach: {
    eyebrow: string;
    h2: string;
    tiles: { title: string; sub: string; body: string; span: string }[];
    stat: { value: string; label: string; span: string };
  };
  commitments: {
    eyebrow: string;
    h2: string;
    stats: { value: number; suffix: string; label: string; body: string; span: string }[];
  };
  cta: {
    h2: string;
    body: string;
    button: string;
    emailLabel: string;
  };
};

const en: CoudersContent = {
  hero: {
    eyebrow: "Bespoke AI Systems",
    h1: "Autonomous AI Agents & Next-Gen Enterprise Solutions",
    sub: "Couders engineers custom AI chatbots and autonomous agents, trained on your private data, fluent in your customers' languages, and bound by your rules. They answer, decide, and act around the clock.",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See the engine",
    scroll: "Scroll",
    morphAria:
      "A single continuous line morphing from an abstract face into the Couders wordmark",
  },
  telemetry: {
    eyebrow: "By The Numbers",
    h2: "Impact Telemetry",
    cards: [
      {
        value: 99.9,
        decimals: 1,
        suffix: "%",
        title: "Security & Uptime Compliance",
        body: "Engineered with private, secure LLM deployments and robust data protection to meet enterprise-level compliance.",
        span: "md:col-span-3 md:row-span-2",
        accent: false,
      },
      {
        value: -80,
        decimals: 0,
        suffix: "%",
        title: "Response Latency Reduction",
        body: "Autonomous workflows handle repetitive requests instantly, driving down average execution and resolution times.",
        span: "md:col-span-3",
        accent: false,
      },
      {
        value: null,
        decimals: 0,
        suffix: "",
        display: "24/7",
        title: "Continuous Autonomy",
        body: "Self-improving AI agents operating around the clock, eliminating operational bottlenecks seamlessly.",
        span: "md:col-span-3",
        accent: true,
      },
    ],
  },
  roiEstimator: {
    eyebrow: "ROI Calculator",
    h2: "Estimate your savings.",
    lead: "Drag the sliders to match your operation and see what autonomous agents could save you every month.",
    slider1Label: "Monthly repetitive inquiries / tasks",
    slider2Label: "Operations / Support team size (employees)",
    hoursLabel: "Hours Saved / Mo",
    savingsLabel: "Estimated Monthly Savings",
    ctaLabel: "Book an audit based on these estimates ➔",
  },
  logoTicker: {
    rowModels: "Intelligence · Foundation models",
    rowInfra: "Infrastructure · Orchestration & automation",
    marqueeAria:
      "Logos of supported AI technologies: OpenAI, Anthropic, Google Gemini, Meta Llama, Manus, OpenClaw, Ollama, LangChain, Copilot, n8n and Pinecone",
  },
  process: {
    eyebrow: "Implementation Process",
    h2: "From first call to autonomous scale.",
    steps: [
      {
        no: "01",
        title: "Discovery",
        body: "We map the conversations and workflows worth automating, define success metrics, and pick the highest-value starting point.",
      },
      {
        no: "02",
        title: "Data Integration & Training",
        body: "We connect your sources, build the private knowledge core, and evaluate the agent against real historical cases until it clears your bar.",
      },
      {
        no: "03",
        title: "Deployment",
        body: "Guardrails, approval checkpoints and monitoring go live with the agent. Rollout is gradual, observable and reversible at every step.",
      },
      {
        no: "04",
        title: "Autonomous Scaling",
        body: "Learning loops feed production experience back into the system. As trust compounds, the agent's scope widens from answering to acting.",
      },
    ],
  },
  reach: {
    eyebrow: "Global Reach",
    h2: "Intelligent systems across borders.",
    tiles: [
      {
        title: "DACH",
        sub: "Berlin · Vienna · Zurich",
        body: "German-speaking delivery of enterprise AI agents for the region's most demanding industries.",
        span: "md:col-span-3",
      },
      {
        title: "Poland",
        sub: "Kraków · Warsaw",
        body: "Our engineering home. Custom chatbots and agents for companies scaling from CEE to the world.",
        span: "md:col-span-3",
      },
      {
        title: "US & Canada",
        sub: "New York · Toronto",
        body: "North American deployments across every time zone.",
        span: "md:col-span-2",
      },
      {
        title: "APAC",
        sub: "Tokyo · Sydney",
        body: "Agents serving Asia-Pacific customers in their language, their hours.",
        span: "md:col-span-2",
      },
    ],
    stat: {
      value: "24/7",
      label: "Every time zone covered. Agents that never hand off.",
      span: "md:col-span-2",
    },
  },
  commitments: {
    eyebrow: "What You Can Hold Us To",
    h2: "Commitments, not marketing numbers.",
    stats: [
      {
        value: 0,
        suffix: "",
        label: "Vendor lock-in",
        body: "The model layer stays swappable. When a better model ships, we re-benchmark and swap the engine - no rebuild, no renegotiation.",
        span: "md:col-span-2",
      },
      {
        value: 100,
        suffix: "%",
        label: "Grounded, cited answers",
        body: "Retrieval with citations plus hardcoded business rules. When the data doesn't support an answer, the agent says so or escalates, instead of inventing one.",
        span: "md:col-span-2",
      },
      {
        value: 30,
        suffix: "+",
        label: "Markets, one knowledge core",
        body: "Polish, German, English or thirty markets at once, on the same private knowledge core, with no separate systems to maintain.",
        span: "md:col-span-2",
      },
    ],
  },
  cta: {
    h2: "Let's build something intelligent.",
    body: "Tell us what should never be answered slowly again. We will scope your first agent end to end.",
    button: "Start a conversation",
    emailLabel: "Or write to us directly",
  },
};

const pl: CoudersContent = {
  hero: {
    eyebrow: "Systemy AI na zamówienie",
    h1: "Autonomiczne Agenty AI i zaawansowane rozwiązania nowej generacji",
    sub: "Couders projektuje niestandardowe chatboty AI i autonomicznych agentów, trenowanych na Twoich prywatnych danych, mówiących językami Twoich klientów i związanych Twoimi regułami. Odpowiadają, decydują i działają całą dobę.",
    ctaPrimary: "Zacznij rozmowę",
    ctaSecondary: "Zobacz silnik",
    scroll: "Przewiń",
    morphAria:
      "Pojedyncza ciągła linia przekształcająca się z abstrakcyjnej twarzy w logotyp Couders",
  },
  telemetry: {
    eyebrow: "W Liczbach",
    h2: "Mierzalne rezultaty",
    cards: [
      {
        value: 99.9,
        decimals: 1,
        suffix: "%",
        title: "Gwarancja Bezpieczeństwa & Uptime",
        body: "Nasze systemy projektujemy w oparciu o prywatne, bezpieczne środowiska chmurowe z pełną ochroną danych wrażliwych.",
        span: "md:col-span-3 md:row-span-2",
        accent: false,
      },
      {
        value: -80,
        decimals: 0,
        suffix: "%",
        title: "Skrócenie czasu reakcji",
        body: "Autonomiczne agenty przejmują powtarzalne zapytania, skracając czas obsługi klienta i procesów wewnętrznych do minimum.",
        span: "md:col-span-3",
        accent: false,
      },
      {
        value: null,
        decimals: 0,
        suffix: "",
        display: "24/7",
        title: "Nieprzerwana optymalizacja",
        body: "Systemy AI pracujące bez przerw, eliminujące wąskie gardła w operacjach Twojej firmy.",
        span: "md:col-span-3",
        accent: true,
      },
    ],
  },
  roiEstimator: {
    eyebrow: "Kalkulator ROI",
    h2: "Oszacuj swoje oszczędności.",
    lead: "Przesuń suwaki, aby dopasować kalkulator do skali Twojej firmy i zobacz, ile miesięcznie mogą zaoszczędzić autonomiczni agenci.",
    slider1Label: "Liczba powtarzalnych zapytań / zadań w miesiącu",
    slider2Label: "Wielkość zespołu obsługi / operacji",
    hoursLabel: "Zaoszczędzone godziny miesięcznie",
    savingsLabel: "Szacowana oszczędność finansowa",
    ctaLabel: "Zarezerwuj audyt na podstawie tych wyliczeń ➔",
  },
  logoTicker: {
    rowModels: "Inteligencja · Modele bazowe",
    rowInfra: "Infrastruktura · Orkiestracja i automatyzacja",
    marqueeAria:
      "Logotypy wspieranych technologii AI: OpenAI, Anthropic, Google Gemini, Meta Llama, Manus, OpenClaw, Ollama, LangChain, Copilot, n8n i Pinecone",
  },
  process: {
    eyebrow: "Proces wdrożenia",
    h2: "Od pierwszej rozmowy do autonomicznej skali.",
    steps: [
      {
        no: "01",
        title: "Discovery",
        body: "Mapujemy rozmowy i procesy warte automatyzacji, definiujemy metryki sukcesu i wybieramy punkt startowy o najwyższej wartości.",
      },
      {
        no: "02",
        title: "Integracja danych i trening",
        body: "Podłączamy Twoje źródła, budujemy prywatny rdzeń wiedzy i oceniamy agenta na prawdziwych historycznych przypadkach, aż przekroczy Twoją poprzeczkę.",
      },
      {
        no: "03",
        title: "Wdrożenie",
        body: "Zabezpieczenia, punkty akceptacji i monitoring startują razem z agentem. Rollout jest stopniowy, obserwowalny i odwracalny na każdym kroku.",
      },
      {
        no: "04",
        title: "Autonomiczne skalowanie",
        body: "Pętle uczenia oddają produkcyjne doświadczenie z powrotem do systemu. Wraz z zaufaniem rośnie zakres agenta: od odpowiadania do działania.",
      },
    ],
  },
  reach: {
    eyebrow: "Zasięg globalny",
    h2: "Inteligentne systemy ponad granicami.",
    tiles: [
      {
        title: "DACH",
        sub: "Berlin · Wiedeń · Zurych",
        body: "Niemieckojęzyczne wdrożenia agentów AI klasy enterprise dla najbardziej wymagających branż regionu.",
        span: "md:col-span-3",
      },
      {
        title: "Polska",
        sub: "Kraków · Warszawa",
        body: "Nasz inżynierski dom. Chatboty i agenci dla firm skalujących się z CEE na świat.",
        span: "md:col-span-3",
      },
      {
        title: "USA i Kanada",
        sub: "Nowy Jork · Toronto",
        body: "Wdrożenia w Ameryce Północnej we wszystkich strefach czasowych.",
        span: "md:col-span-2",
      },
      {
        title: "APAC",
        sub: "Tokio · Sydney",
        body: "Agenci obsługujący klientów Azji i Pacyfiku w ich języku i ich godzinach.",
        span: "md:col-span-2",
      },
    ],
    stat: {
      value: "24/7",
      label: "Każda strefa czasowa pokryta. Agenci, którzy nigdy nie przekazują zmiany.",
      span: "md:col-span-2",
    },
  },
  commitments: {
    eyebrow: "Za co możesz nas rozliczyć",
    h2: "Zobowiązania, nie liczby marketingowe.",
    stats: [
      {
        value: 0,
        suffix: "",
        label: "Uzależnienia od dostawcy",
        span: "md:col-span-2",
        body: "Warstwa modeli pozostaje wymienna. Gdy wyjdzie lepszy model, robimy ponowny benchmark i wymieniamy silnik - bez przebudowy, bez renegocjacji.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Odpowiedzi ugruntowane i cytowane",
        span: "md:col-span-2",
        body: "Wyszukiwanie z cytowaniami plus twarde reguły biznesowe w kodzie. Gdy dane nie potwierdzają odpowiedzi, agent mówi to wprost albo przekazuje sprawę dalej, zamiast zmyślać.",
      },
      {
        value: 30,
        suffix: "+",
        label: "Rynków, jeden rdzeń wiedzy",
        span: "md:col-span-2",
        body: "Polski, niemiecki, angielski albo trzydzieści rynków naraz, na tym samym prywatnym rdzeniu wiedzy, bez osobnych systemów do utrzymania.",
      },
    ],
  },
  cta: {
    h2: "Zbudujmy coś inteligentnego.",
    body: "Powiedz nam, co już nigdy nie powinno czekać na odpowiedź. Zaprojektujemy Twojego pierwszego agenta od początku do końca.",
    button: "Zacznij rozmowę",
    emailLabel: "Albo napisz do nas bezpośrednio",
  },
};

const COUDERS: Record<Locale, CoudersContent> = { en, pl };

export const getCouders = (locale: Locale): CoudersContent => COUDERS[locale] ?? en;
