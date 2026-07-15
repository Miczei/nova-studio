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
  engine: {
    eyebrow: string;
    h2: string;
    intro: string;
    points: { no: string; title: string; body: string }[];
    canvasAria: string;
  };
  agnostic: {
    eyebrow: string;
    h2: string;
    lead: string;
    p1: string;
    p2: string;
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
  engine: {
    eyebrow: "The Core Engine",
    h2: "One engine. Zero improvisation.",
    intro:
      "Every Couders agent runs on the same disciplined core: your private data as its only source of truth, deterministic rules around every action, and full observability of every decision it makes.",
    points: [
      {
        no: "01",
        title: "Trained on your private data",
        body: "Your knowledge lives in an isolated, encrypted store that never trains public models. The agent knows your products, policies and history, and nothing it should not.",
      },
      {
        no: "02",
        title: "24/7 autonomous operation",
        body: "Agents do not sleep, queue or forget. Peak season traffic and 3 a.m. questions get the same instant, consistent treatment as a Tuesday morning.",
      },
      {
        no: "03",
        title: "Multilingual by design",
        body: "One knowledge core, every language your customers speak. Polish, German, English or thirty markets at once, without separate systems to maintain.",
      },
      {
        no: "04",
        title: "Grounded answers, zero hallucinations",
        body: "Retrieval with citations plus hardcoded business rules. When the data does not support an answer, the agent says so or escalates to a human instead of inventing.",
      },
    ],
    canvasAria:
      "Animated constellation of connected nodes visualizing how autonomous agents process information",
  },
  agnostic: {
    eyebrow: "The Tech Stack",
    h2: "AI agnostic by principle.",
    lead: "We are loyal to your outcome, not to any single AI vendor.",
    p1: "Couders integrates with every major AI model on the market: OpenAI's GPT models behind ChatGPT, Anthropic's Claude, Google's Gemini and Meta's open Llama family. For each enterprise use case we benchmark candidate models on your real data for accuracy, latency, cost and data-privacy posture, then engineer the winning combination into your system. A support chatbot might route quick questions to a fast, inexpensive model and complex reasoning to a frontier one, automatically.",
    p2: "Because the model layer stays swappable, your investment survives every model release. When a better model ships next quarter, we re-benchmark, swap the engine and your agents simply get smarter, with no rebuild and no vendor lock-in. The same discipline extends to the surrounding stack: we orchestrate agents with LangChain and OpenClaw, deploy autonomous agents through frameworks like Manus, embed assistants such as Copilot into the tools your teams already use, automate workflows with n8n, run models locally through Ollama when data cannot leave your infrastructure, and ground retrieval in vector databases like Pinecone. That is what AI agnostic means at Couders: the best model and the best tooling for the job, today and every day after.",
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
    h2: "Mierzalny Wpływ",
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
  engine: {
    eyebrow: "Rdzeń systemu",
    h2: "Jeden silnik. Zero improwizacji.",
    intro:
      "Każdy agent Couders działa na tym samym zdyscyplinowanym rdzeniu: Twoje prywatne dane jako jedyne źródło prawdy, deterministyczne reguły wokół każdej akcji i pełna obserwowalność każdej podjętej decyzji.",
    points: [
      {
        no: "01",
        title: "Trenowany na Twoich prywatnych danych",
        body: "Twoja wiedza żyje w odizolowanym, szyfrowanym magazynie, który nigdy nie trenuje publicznych modeli. Agent zna Twoje produkty, polityki i historię, i nic ponad to, co powinien.",
      },
      {
        no: "02",
        title: "Praca autonomiczna 24/7",
        body: "Agenci nie śpią, nie kolejkują i nie zapominają. Szczyt sezonu i pytanie o trzeciej w nocy dostają tę samą natychmiastową, spójną obsługę co wtorkowy poranek.",
      },
      {
        no: "03",
        title: "Wielojęzyczność w standardzie",
        body: "Jeden rdzeń wiedzy, każdy język Twoich klientów. Polski, niemiecki, angielski albo trzydzieści rynków naraz, bez osobnych systemów do utrzymania.",
      },
      {
        no: "04",
        title: "Odpowiedzi ugruntowane, zero halucynacji",
        body: "Wyszukiwanie z cytowaniami plus twarde reguły biznesowe w kodzie. Gdy dane nie potwierdzają odpowiedzi, agent mówi to wprost albo przekazuje sprawę człowiekowi, zamiast zmyślać.",
      },
    ],
    canvasAria:
      "Animowana konstelacja połączonych węzłów wizualizująca przetwarzanie informacji przez autonomicznych agentów",
  },
  agnostic: {
    eyebrow: "Stack technologiczny",
    h2: "AI-agnostycy z zasady.",
    lead: "Jesteśmy lojalni wobec Twojego wyniku, nie wobec żadnego dostawcy AI.",
    p1: "Couders integruje się z każdym liczącym się modelem AI na rynku: modelami GPT od OpenAI znanymi z ChatGPT, Claude od Anthropic, Gemini od Google i otwartą rodziną Llama od Meta. Dla każdego wdrożenia enterprise benchmarkujemy kandydatów na Twoich prawdziwych danych pod kątem trafności, szybkości, kosztu i prywatności danych, a zwycięską kombinację wbudowujemy w Twój system. Chatbot wsparcia może kierować proste pytania do szybkiego, taniego modelu, a złożone rozumowanie do modelu frontier, automatycznie.",
    p2: "Ponieważ warstwa modeli pozostaje wymienna, Twoja inwestycja przeżywa każdą premierę. Gdy w przyszłym kwartale wyjdzie lepszy model, robimy ponowny benchmark, wymieniamy silnik i Twoi agenci po prostu stają się mądrzejsi, bez przebudowy i bez uzależnienia od dostawcy. Ta sama dyscyplina obejmuje resztę stacku: orkiestrujemy agentów z LangChain i OpenClaw, wdrażamy autonomicznych agentów przez frameworki takie jak Manus, osadzamy asystentów takich jak Copilot w narzędziach, których zespoły już używają, automatyzujemy procesy w n8n, uruchamiamy modele lokalnie przez Ollama, gdy dane nie mogą opuścić Twojej infrastruktury, i opieramy wyszukiwanie na bazach wektorowych takich jak Pinecone. To właśnie znaczy AI-agnostyczność w Couders: najlepszy model i najlepsze narzędzia do zadania, dziś i każdego kolejnego dnia.",
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
