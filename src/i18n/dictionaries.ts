import type { Locale } from "./config";

type Card = { title: string; body: string };
type ChatMsg = { from: "bot" | "user"; text: string };
type Step = { no: string; title: string; body: string };
type GlobeRegion = { id: string; tab: string; heading: string; text: string };

export type Dictionary = {
  nav: {
    reach: string;
    capabilities: string;
    aiChatbots: string;
    process: string;
    cta: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    h2: string;
    h2soft: string;
  };
  sections: {
    capabilities: { label: string; title: string; cards: Card[] };
    transform: {
      label: string;
      title: string;
      sub: string;
      before: string;
      after: string;
      hint: string;
      old: {
        url: string;
        welcome: string;
        body: string;
        links: string[];
        btn: string;
        updated: string;
      };
      neo: {
        eyebrow: string;
        headline: string;
        sub: string;
        btn: string;
      };
    };
    chatbot: {
      label: string;
      h2: string;
      sub: string;
      features: string[];
      chat: { title: string; messages: ChatMsg[]; placeholder: string };
    };
    process: { label: string; title: string; steps: Step[] };
    globe: {
      label: string;
      title: string;
      regions: GlobeRegion[];
      locations: string[];
    };
    contact: {
      label: string;
      title: string;
      cta: string;
      emailLabel: string;
      email: string;
    };
    footer: { tagline: string; rights: string };
  };
  meta: { title: string; description: string };
};

const en: Dictionary = {
  nav: {
    reach: "Global",
    capabilities: "Capabilities",
    aiChatbots: "AI Chatbots",
    process: "Process",
    cta: "Start a project",
    languageLabel: "Language",
  },
  hero: {
    eyebrow: "AI-Native Web Studio",
    h1a: "Modern AI Web Development",
    h1b: "& Interactive Web Design",
    sub: "We build high-end, interactive websites with custom AI chatbots built in, autonomous agents that answer your customers the moment they ask.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See our work",
    scroll: "Scroll",
    h2: "Custom AI chatbots,",
    h2soft: "answering your customers around the clock.",
  },
  sections: {
    capabilities: {
      label: "Capabilities",
      title: "Everything your site needs to think, sell, and scale.",
      cards: [
        {
          title: "Interactive Web Design",
          body: "Immersive, scroll-driven interfaces that feel alive and keep visitors moving.",
        },
        {
          title: "Modern AI Development",
          body: "Fast, accessible builds on a modern stack, engineered for Core Web Vitals.",
        },
        {
          title: "Custom AI Chatbots",
          body: "Autonomous agents trained on your content that answer customers instantly.",
        },
        {
          title: "Performance & SEO",
          body: "Semantic, multilingual foundations that rank well and load in a blink.",
        },
      ],
    },
    transform: {
      label: "The Transformation",
      title: "Experience the transformation.",
      sub: "Drag the slider and watch a dated website become a premium, conversion-driven experience. This is what we do for brands.",
      before: "Before",
      after: "After",
      hint: "Drag to compare",
      old: {
        url: "your-company.com",
        welcome: "Welcome to our website!!!",
        body: "We have been in business since 1998. Please check our offer. Best viewed in 1024x768.",
        links: ["Home", "Offer", "Gallery", "Contact"],
        btn: "Click here",
        updated: "Last updated: 03.2014",
      },
      neo: {
        eyebrow: "Your Company",
        headline: "Design that sells.",
        sub: "A site that answers customers, converts visitors and scales with you.",
        btn: "Start a project",
      },
    },
    chatbot: {
      label: "AI Chatbots",
      h2: "An AI agent that answers for you, day and night.",
      sub: "We embed a custom chatbot trained on your own content, so every visitor gets an instant, accurate answer and you capture leads while you sleep.",
      features: [
        "Trained on your own content",
        "Answers in every language",
        "Available around the clock",
        "Hands off to your team when needed",
      ],
      chat: {
        title: "NOVA Assistant",
        messages: [
          { from: "bot", text: "Hi, welcome to NOVA. What are you building?" },
          { from: "user", text: "Do you make multilingual sites with AI chat?" },
          {
            from: "bot",
            text: "Yes, every site ships bilingual by default, with an AI agent built in. Want a quick quote?",
          },
        ],
        placeholder: "Ask anything...",
      },
    },
    process: {
      label: "Process",
      title: "From idea to launch, without the drag.",
      steps: [
        {
          no: "01",
          title: "Discovery",
          body: "We map your goals, audience, and the questions your AI agent must answer.",
        },
        {
          no: "02",
          title: "Design",
          body: "We prototype the interface and motion, then refine until it feels effortless.",
        },
        {
          no: "03",
          title: "Build",
          body: "We develop the site on a modern stack and train your chatbot on real content.",
        },
        {
          no: "04",
          title: "Launch",
          body: "We ship, measure Core Web Vitals, and tune everything for conversions.",
        },
      ],
    },
    globe: {
      label: "Global Reach",
      title: "We work across borders.",
      regions: [
        {
          id: "dach",
          tab: "DACH",
          heading: "Working with DACH",
          text: "German-speaking teams in Germany, Austria and Switzerland. We build in a German-oriented environment and business culture.",
        },
        {
          id: "na",
          tab: "North America",
          heading: "Working with North America",
          text: "From New York to Toronto, we partner with US and Canadian teams across time zones.",
        },
        {
          id: "global",
          tab: "Global",
          heading: "Working worldwide",
          text: "Wherever your customers are, we ship fast, accessible sites with AI built in.",
        },
      ],
      locations: [
        "Poland",
        "Germany",
        "Austria",
        "Switzerland",
        "United States",
        "Canada",
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's build something intelligent.",
      cta: "Start a project",
      emailLabel: "Or email us",
      email: "hello@nova.studio",
    },
    footer: {
      tagline: "AI-native web studio.",
      rights: "All rights reserved.",
    },
  },
  meta: {
    title: "Modern AI Web Development & Interactive Web Design | NOVA",
    description:
      "NOVA is an AI-native web studio building high-end, interactive websites with custom AI chatbots built in. Modern AI web development and interactive web design that converts.",
  },
};

const pl: Dictionary = {
  nav: {
    reach: "Zasięg",
    capabilities: "Możliwości",
    aiChatbots: "Chatboty AI",
    process: "Proces",
    cta: "Rozpocznij projekt",
    languageLabel: "Język",
  },
  hero: {
    eyebrow: "Studio Webowe Oparte na AI",
    h1a: "Nowoczesne tworzenie stron z AI",
    h1b: "i interaktywny web design",
    sub: "Tworzymy dopracowane, interaktywne strony internetowe z wbudowanymi chatbotami AI, autonomicznymi agentami, które odpowiadają Twoim klientom w tej samej chwili, gdy pytają.",
    ctaPrimary: "Rozpocznij projekt",
    ctaSecondary: "Zobacz realizacje",
    scroll: "Przewiń",
    h2: "Własne chatboty AI,",
    h2soft: "odpowiadają Twoim klientom przez całą dobę.",
  },
  sections: {
    capabilities: {
      label: "Możliwości",
      title: "Wszystko, czego strona potrzebuje, aby myśleć, sprzedawać i rosnąć.",
      cards: [
        {
          title: "Interaktywny web design",
          body: "Wciągające interfejsy sterowane scrollem, które żyją i zatrzymują uwagę.",
        },
        {
          title: "Nowoczesny development z AI",
          body: "Szybkie, dostępne wdrożenia na nowoczesnym stacku, pod Core Web Vitals.",
        },
        {
          title: "Własne chatboty AI",
          body: "Autonomiczni agenci wytrenowani na Twoich treściach, odpowiadają od razu.",
        },
        {
          title: "Wydajność i SEO",
          body: "Semantyczne, wielojęzyczne fundamenty, które rankują i ładują się błyskawicznie.",
        },
      ],
    },
    transform: {
      label: "Transformacja",
      title: "Zobacz transformację.",
      sub: "Przeciągnij suwak i zobacz, jak przestarzała strona staje się dopracowanym, konwertującym doświadczeniem. Właśnie to robimy dla marek.",
      before: "Przed",
      after: "Po",
      hint: "Przeciągnij, aby porównać",
      old: {
        url: "twoja-firma.pl",
        welcome: "Witamy na naszej stronie!!!",
        body: "Działamy na rynku od 1998 roku. Zapraszamy do zapoznania się z ofertą. Strona najlepiej wygląda w 1024x768.",
        links: ["Start", "Oferta", "Galeria", "Kontakt"],
        btn: "Kliknij tutaj",
        updated: "Ostatnia aktualizacja: 03.2014",
      },
      neo: {
        eyebrow: "Twoja Firma",
        headline: "Design, który sprzedaje.",
        sub: "Strona, która odpowiada klientom, konwertuje odwiedzających i rośnie razem z Tobą.",
        btn: "Rozpocznij projekt",
      },
    },
    chatbot: {
      label: "Chatboty AI",
      h2: "Agent AI, który odpowiada za Ciebie, dniem i nocą.",
      sub: "Wbudowujemy własnego chatbota wytrenowanego na Twoich treściach, więc każdy odwiedzający dostaje natychmiastową, trafną odpowiedź, a Ty zbierasz leady nawet podczas snu.",
      features: [
        "Wytrenowany na Twoich treściach",
        "Odpowiada w każdym języku",
        "Dostępny przez całą dobę",
        "Przekazuje rozmowę zespołowi, gdy trzeba",
      ],
      chat: {
        title: "Asystent NOVA",
        messages: [
          { from: "bot", text: "Cześć, witaj w NOVA. Co budujesz?" },
          { from: "user", text: "Robicie wielojęzyczne strony z czatem AI?" },
          {
            from: "bot",
            text: "Tak, każda strona jest domyślnie dwujęzyczna, z wbudowanym agentem AI. Chcesz szybką wycenę?",
          },
        ],
        placeholder: "Zapytaj o cokolwiek...",
      },
    },
    process: {
      label: "Proces",
      title: "Od pomysłu do startu, bez zbędnej zwłoki.",
      steps: [
        {
          no: "01",
          title: "Odkrywanie",
          body: "Mapujemy cele, odbiorców i pytania, na które ma odpowiadać agent AI.",
        },
        {
          no: "02",
          title: "Projekt",
          body: "Prototypujemy interfejs i animacje, a potem dopracowujemy je do lekkości.",
        },
        {
          no: "03",
          title: "Budowa",
          body: "Tworzymy stronę na nowoczesnym stacku i trenujemy chatbota na prawdziwych treściach.",
        },
        {
          no: "04",
          title: "Start",
          body: "Wdrażamy, mierzymy Core Web Vitals i optymalizujemy wszystko pod konwersje.",
        },
      ],
    },
    globe: {
      label: "Zasięg globalny",
      title: "Pracujemy ponad granicami.",
      regions: [
        {
          id: "dach",
          tab: "DACH",
          heading: "Współpraca z DACH",
          text: "Zespoły niemieckojęzyczne w Niemczech, Austrii i Szwajcarii. Pracujemy w środowisku i kulturze biznesowej zorientowanej na język niemiecki.",
        },
        {
          id: "na",
          tab: "Ameryka Płn.",
          heading: "Współpraca z Ameryką Północną",
          text: "Od Nowego Jorku po Toronto, współpracujemy z zespołami z USA i Kanady w różnych strefach czasowych.",
        },
        {
          id: "global",
          tab: "Świat",
          heading: "Współpraca na całym świecie",
          text: "Gdziekolwiek są Twoi klienci, dostarczamy szybkie, dostępne strony z wbudowanym AI.",
        },
      ],
      locations: [
        "Polska",
        "Niemcy",
        "Austria",
        "Szwajcaria",
        "USA",
        "Kanada",
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Zbudujmy coś inteligentnego.",
      cta: "Rozpocznij projekt",
      emailLabel: "Albo napisz do nas",
      email: "hello@nova.studio",
    },
    footer: {
      tagline: "Studio webowe oparte na AI.",
      rights: "Wszelkie prawa zastrzeżone.",
    },
  },
  meta: {
    title: "Nowoczesne tworzenie stron z AI i interaktywny web design | NOVA",
    description:
      "NOVA to studio webowe oparte na AI. Tworzymy dopracowane, interaktywne strony internetowe z wbudowanymi chatbotami AI. Nowoczesne tworzenie stron i interaktywny web design, który konwertuje.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, pl };

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale] ?? en;
