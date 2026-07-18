import type { Locale } from "./config";

export type DeepDiveStep = { title: string; body: string };

export type SectorTile = {
  title: string;
  body: string;
  span: string;
  /** Tier 1 hook: jargon-free business outcome shown on the card. */
  outcome?: string;
  /** Tier 2: expandable plain-English walkthrough. Cards without it don't expand. */
  deepDive?: { intro: string; steps: DeepDiveStep[] };
  /** Overrides the sector's default deep-dive visual with a bespoke one. */
  flow?: "wealth" | "fraud" | "shopper" | "inventory" | "triage" | "diagnostics" | "monitoring";
};

export type Sector = {
  id: "healthcare" | "legal" | "industrial" | "ecommerce" | "finance";
  label: string;
  h2: string;
  lead: string;
  visualAria: string;
  tiles: SectorTile[];
};

export type SectorsContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  cta: string;
  expandHint: string;
  close: string;
  flow: { from: string; via: string; to: string };
  sectors: Sector[];
};

const en: SectorsContent = {
  slug: "methodology",
  metaTitle: "Specialized AI Agents by Industry: Healthcare, Legal, Industrial | Couders",
  metaDescription:
    "Industry-specific AI agents from Couders: medical triage and patient monitoring bots, contract analysis and case-law research agents, predictive maintenance and QA vision systems.",
  keywords: [
    "healthcare AI agents",
    "legal AI contract analysis",
    "industrial predictive maintenance AI",
    "AI triage bot",
    "QA vision agents",
  ],
  breadcrumb: "Solutions",
  eyebrow: "Specialized Agents",
  h1: "Agents that speak your industry's language.",
  intro:
    "Generic chatbots break on domain reality. Couders builds sector-tuned agents on private data, hard business rules and human checkpoints, ready for the regulations and edge cases of your field.",
  cta: "Scope an agent for your sector",
  expandHint: "See how it works",
  close: "Close",
  flow: { from: "Customer request", via: "Agent reasoning", to: "Business outcome" },
  sectors: [
    {
      id: "healthcare",
      label: "Healthcare",
      h2: "Medicine that never sleeps.",
      lead: "Built for private practices, dental studios and clinics: agents that take the load off your team while keeping every decision auditable and a doctor in the loop.",
      visualAria: "A heart-rate line morphing into a neural network node",
      tiles: [
        {
          title: "Triage bots",
          outcome: "Every inquiry lands in the right calendar in seconds, sorted by urgency, not by arrival order.",
          body: "Structured symptom intake in every language, urgency scoring against your practice's protocols, and instant routing to the right specialist's calendar.",
          span: "md:col-span-2",
          flow: "triage",
          deepDive: {
            intro: "It is 7 AM and forty new messages are waiting: toothaches, post-treatment questions, consultation requests. Here is how none of them slip through.",
            steps: [
              {
                title: "Intake",
                body: "A structured symptom interview in the patient's own language, no forms. The bot asks the follow-ups an experienced front desk would, and knows when to stop.",
              },
              {
                title: "Score",
                body: "Each case is scored against your practice's protocols and red-flag rules, so a swollen face never waits behind a teeth-whitening inquiry.",
              },
              {
                title: "Route",
                body: "Urgent cases go straight to the doctor on duty with a summary attached. Routine ones book the right slot in the right calendar automatically.",
              },
            ],
          },
        },
        {
          title: "Predictive diagnostics",
          outcome: "Catch the risk pattern this week, not at next year's check-up.",
          body: "Models trained on your practice's historical cases flag risk patterns early and attach the evidence trail a doctor needs to verify them.",
          span: "md:col-span-2",
          flow: "diagnostics",
          deepDive: {
            intro: "The warning signs were in the patient's chart for months. This time somebody is reading them, continuously.",
            steps: [
              {
                title: "Learn",
                body: "Models train on your practice's historical cases and outcomes, inside your infrastructure, tuned to the patients you actually treat.",
              },
              {
                title: "Flag",
                body: "Emerging risk patterns are flagged early, each with the evidence trail that led there, never a black-box verdict.",
              },
              {
                title: "Verify",
                body: "The doctor reviews the flag with sources attached and makes the call. The model never diagnoses on its own.",
              },
            ],
          },
        },
        {
          title: "24/7 patient monitoring",
          outcome: "A patient worried at 3 AM gets an answer at 3 AM, not when the front desk opens.",
          body: "Agents watch post-treatment check-ins and follow-up schedules around the clock, escalating to the doctor the moment something looks off.",
          span: "md:col-span-2",
          flow: "monitoring",
          deepDive: {
            intro: "Two days after a procedure, a patient reports growing pain at midnight. The agent notices in seconds. Here is what happens next.",
            steps: [
              {
                title: "Watch",
                body: "Post-treatment check-ins, symptom reports and follow-up schedules are monitored continuously, each against what is normal for that procedure and that patient.",
              },
              {
                title: "Escalate",
                body: "The moment something crosses a threshold, the doctor on duty gets a message with context, trend and severity, not just a raw alarm.",
              },
              {
                title: "Log",
                body: "Every alert, hand-off and response lands in an auditable trail, so the practice sees exactly what happened and when.",
              },
            ],
          },
        },
        {
          title: "Compliance by design",
          body: "Data stays in your infrastructure, every recommendation is logged, and high-stakes actions always cross a human first.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "legal",
      label: "Legal",
      h2: "Counsel at machine speed.",
      lead: "Research and review agents that read everything, cite everything and never bill an hour.",
      visualAria: "An abstract scales-of-justice drawn with one continuous line",
      tiles: [
        {
          title: "Automated contract analysis",
          body: "Clause extraction, deviation detection against your playbook and redline suggestions, with every finding linked to the source paragraph.",
          span: "md:col-span-2",
        },
        {
          title: "Instant case-law research",
          body: "Grounded retrieval across statutes, rulings and your own matter history, returning cited answers instead of confident guesses.",
          span: "md:col-span-2",
        },
        {
          title: "Risk & compliance bots",
          body: "Continuous screening of documents and processes against regulatory checklists, with alerts routed to the responsible counsel.",
          span: "md:col-span-2",
        },
        {
          title: "Privilege preserved",
          body: "Matter data is isolated per client, encrypted end to end and never used to train shared models.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "industrial",
      label: "Industrial",
      h2: "The factory that predicts itself.",
      lead: "Agents wired into your lines and sensors, turning telemetry into decisions before downtime happens.",
      visualAria: "Interlocking parametric gears drawn with one continuous line",
      tiles: [
        {
          title: "Supply chain optimization",
          body: "Demand forecasting and reorder agents that watch lead times, buffer stock and supplier risk across every site.",
          span: "md:col-span-2",
        },
        {
          title: "Predictive maintenance",
          body: "Vibration, temperature and cycle data feed models that schedule service before failure, not after.",
          span: "md:col-span-2",
        },
        {
          title: "QA vision agents",
          body: "Camera-based inspection tuned to your defect catalogue, flagging anomalies in real time on the line.",
          span: "md:col-span-2",
        },
        {
          title: "Shop-floor guardrails",
          body: "Agents act within hardcoded safety envelopes, and anything touching production equipment requires operator sign-off.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "ecommerce",
      label: "E-commerce",
      h2: "Retail that reads minds.",
      lead: "Agents that sell, stock and retain around the clock, wired into your catalogue, margins and promises.",
      visualAria: "A continuous line drawing a shopping cart flowing into a spark",
      tiles: [
        {
          title: "Autonomous personal shoppers",
          outcome: "Turn midnight browsers into buyers with a concierge that knows your catalogue better than your best salesperson.",
          body: "A conversational agent that guides every visitor from vague idea to confident checkout, in their language, on brand, within your pricing rules.",
          span: "md:col-span-2",
          flow: "shopper",
          deepDive: {
            intro: "Imagine a customer landing at 2 AM with a screenshot, a rough budget and no product name. Here is what happens in the next ninety seconds.",
            steps: [
              {
                title: "Understand",
                body: "The agent asks two clarifying questions, reads the screenshot, and extracts size, style, budget and urgency without a single form field.",
              },
              {
                title: "Match",
                body: "It cross-references live inventory, review scores and return rates, then shortlists three products it can actually deliver on time.",
              },
              {
                title: "Close",
                body: "It assembles the cart, applies the one promo that fits your margin rules, and books the delivery slot. Upsell happens only when it genuinely helps.",
              },
            ],
          },
        },
        {
          title: "Dynamic inventory prediction",
          outcome: "Reorder before the shelf empties and kill dead stock before it lands in your warehouse.",
          body: "SKU-level demand forecasting wired into your purchasing flow, so buying decisions stop being gut feel.",
          span: "md:col-span-2",
          flow: "inventory",
          deepDive: {
            intro: "Your bestseller sells out every fourth Friday and nobody knows why. The agent does.",
            steps: [
              {
                title: "Watch",
                body: "It ingests sales velocity, seasonality, campaign calendars and supplier lead times across every channel, continuously.",
              },
              {
                title: "Predict",
                body: "It builds SKU-level demand curves with confidence bands, flagging both the stockout next week and the overstock next quarter.",
              },
              {
                title: "Act",
                body: "It drafts purchase orders with quantities and timing attached. Your buyer reviews the reasoning and approves in one click.",
              },
            ],
          },
        },
        {
          title: "Hyper-personalized retention",
          outcome: "Win customers back before they even know they are leaving.",
          body: "Churn signals detected per customer, offers composed per history and margin, outcomes fed back into the next campaign.",
          span: "md:col-span-2",
          deepDive: {
            intro: "A loyal customer quietly stops opening your emails. Most shops notice three months later. Yours notices the same week.",
            steps: [
              {
                title: "Detect",
                body: "The agent tracks engagement drop-off per cohort and flags the customers whose behavior just changed, not everyone at once.",
              },
              {
                title: "Compose",
                body: "For each flagged customer it picks the channel, timing and offer from their history, within discount floors your CFO signed off.",
              },
              {
                title: "Learn",
                body: "Every response feeds the next decision, so the win-back playbook sharpens with each campaign instead of going stale.",
              },
            ],
          },
        },
        {
          title: "Margin guardrails",
          body: "Every discount, bundle and shipping promise stays inside hardcoded pricing floors. The agent sells hard, but never below the line your finance team drew.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "finance",
      label: "Finance",
      h2: "Money that defends itself.",
      lead: "Agents auditing every transaction in real time, so your analysts spend their day on judgment calls, not queues.",
      visualAria: "A rising market line coiling into a secure lock",
      tiles: [
        {
          title: "Real-time fraud neutralization",
          outcome: "Block fraudulent transactions in milliseconds, not after the chargeback lands.",
          body: "Scoring agents watch every transaction against behavioral baselines and known patterns, freezing only what deserves freezing.",
          span: "md:col-span-2",
          flow: "fraud",
          deepDive: {
            intro: "A stolen card tries three stores in ninety seconds. A traditional fraud queue reviews it tomorrow. Your agent reviews it now.",
            steps: [
              {
                title: "Score",
                body: "Every transaction is scored in milliseconds against the cardholder's own behavioral baseline and known fraud patterns.",
              },
              {
                title: "Decide",
                body: "Clear-cut fraud is frozen instantly; genuine edge cases are routed to an analyst with the full evidence attached.",
              },
              {
                title: "Adapt",
                body: "Confirmed outcomes feed back into the model, so a new fraud tactic gets caught the second time, not the hundredth.",
              },
            ],
          },
        },
        {
          title: "Automated compliance auditing",
          outcome: "Every transaction screened against AML and KYC rules, with an audit trail regulators can replay.",
          body: "Continuous screening instead of quarterly panic, with each decision logged, sourced and explainable.",
          span: "md:col-span-2",
          deepDive: {
            intro: "Regulators ask for two years of transaction rationale on a Tuesday afternoon. Your agent already has it, sourced and timestamped.",
            steps: [
              {
                title: "Screen",
                body: "Every transaction is checked against live AML and KYC rules the moment it happens, not in a quarterly batch.",
              },
              {
                title: "Log",
                body: "Each decision is recorded with its inputs, the rule it matched and the evidence, in a trail a regulator can replay.",
              },
              {
                title: "Flag",
                body: "Anything ambiguous is escalated to the responsible officer before it becomes a filing problem.",
              },
            ],
          },
        },
        {
          title: "Intelligent wealth assistants",
          outcome: "Portfolio insight in plain language, with every figure sourced and every action behind client consent.",
          body: "Assistants that explain positions, risks and scenarios conversationally, and never execute anything on their own.",
          span: "md:col-span-2",
          flow: "wealth",
          deepDive: {
            intro: "A client texts 'why is my portfolio down' at 11 PM. The assistant answers in plain language, with every number sourced, and never touches a trade.",
            steps: [
              {
                title: "Explain",
                body: "It turns positions, exposures and scenarios into a conversation the client actually understands.",
              },
              {
                title: "Model",
                body: "It runs what-if scenarios on request, showing the range of outcomes rather than a single false promise.",
              },
              {
                title: "Defer",
                body: "Anything that moves money is packaged for a human advisor to review and execute, never done autonomously.",
              },
            ],
          },
        },
        {
          title: "Human sign-off, always",
          body: "Anything that moves money crosses a human checkpoint. The agent prepares the decision, a person makes it.",
          span: "md:col-span-6",
        },
      ],
    },
  ],
};

const pl: SectorsContent = {
  slug: "methodology",
  metaTitle: "Wyspecjalizowani agenci AI dla branż: medycyna, prawo, przemysł | Couders",
  metaDescription:
    "Branżowi agenci AI od Couders: boty triage i monitoring pacjentów, analiza umów i research orzecznictwa, predykcyjne utrzymanie ruchu i wizyjna kontrola jakości.",
  keywords: [
    "agenci AI medycyna",
    "AI analiza umów",
    "predykcyjne utrzymanie ruchu AI",
    "bot triage",
    "wizyjna kontrola jakości AI",
  ],
  breadcrumb: "Rozwiązania",
  eyebrow: "Wyspecjalizowani agenci",
  h1: "Agenci, którzy mówią językiem Twojej branży.",
  intro:
    "Generyczne chatboty wykładają się na realiach domeny. Couders buduje agentów dostrojonych do sektora: na prywatnych danych, twardych regułach biznesowych i punktach kontroli człowieka, gotowych na regulacje i przypadki brzegowe Twojego pola.",
  cta: "Zaprojektuj agenta dla swojej branży",
  expandHint: "Zobacz, jak to działa",
  close: "Zamknij",
  flow: { from: "Zapytanie klienta", via: "Rozumowanie agenta", to: "Wynik biznesowy" },
  sectors: [
    {
      id: "healthcare",
      label: "Medycyna",
      h2: "Medycyna, która nie śpi.",
      lead: "Dla prywatnych praktyk, gabinetów stomatologicznych i klinik: agenci odciążają Twój zespół, a każda decyzja pozostaje audytowalna i z lekarzem w pętli.",
      visualAria: "Linia EKG przechodząca w węzeł sieci neuronowej",
      tiles: [
        {
          title: "Boty triage",
          outcome: "Każde zgłoszenie trafia do właściwego kalendarza w kilka sekund, według pilności, a nie kolejności.",
          body: "Ustrukturyzowany wywiad objawowy w każdym języku, ocena pilności według protokołów Twojego gabinetu i natychmiastowe kierowanie do kalendarza właściwego specjalisty.",
          span: "md:col-span-2",
          flow: "triage",
          deepDive: {
            intro: "Jest 7 rano, czeka czterdzieści nowych wiadomości: bóle zębów, pytania po zabiegach, prośby o konsultacje. Oto jak żadna nie przepada.",
            steps: [
              {
                title: "Wywiad",
                body: "Ustrukturyzowany wywiad objawowy w języku pacjenta, bez formularzy. Bot dopytuje jak doświadczona rejestratorka i wie, kiedy przestać.",
              },
              {
                title: "Ocena",
                body: "Każdy przypadek jest punktowany według protokołów Twojego gabinetu i reguł czerwonych flag, więc spuchnięta twarz nigdy nie czeka za pytaniem o wybielanie.",
              },
              {
                title: "Skierowanie",
                body: "Pilne przypadki trafiają prosto do lekarza dyżurnego z gotowym podsumowaniem. Rutynowe same rezerwują właściwy termin we właściwym kalendarzu.",
              },
            ],
          },
        },
        {
          title: "Diagnostyka predykcyjna",
          outcome: "Wychwyć wzorzec ryzyka w tym tygodniu, a nie na przyszłorocznym badaniu kontrolnym.",
          body: "Modele trenowane na historycznych przypadkach Twojego gabinetu wcześnie wychwytują wzorce ryzyka i dołączają ślad dowodowy do weryfikacji przez lekarza.",
          span: "md:col-span-2",
          flow: "diagnostics",
          deepDive: {
            intro: "Sygnały ostrzegawcze były w kartotece pacjenta od miesięcy. Tym razem ktoś je czyta, bez przerwy.",
            steps: [
              {
                title: "Nauka",
                body: "Modele uczą się na historycznych przypadkach i wynikach Twojego gabinetu, w Twojej infrastrukturze, dopasowane do pacjentów, których naprawdę leczysz.",
              },
              {
                title: "Flaga",
                body: "Wyłaniające się wzorce ryzyka są flagowane wcześnie, każdy ze śladem dowodowym, który do niego doprowadził, nigdy werdyktem z czarnej skrzynki.",
              },
              {
                title: "Weryfikacja",
                body: "Lekarz ogląda flagę z podpiętymi źródłami i podejmuje decyzję. Model nigdy nie diagnozuje samodzielnie.",
              },
            ],
          },
        },
        {
          title: "Monitoring pacjenta 24/7",
          outcome: "Pacjent zaniepokojony o 3 w nocy dostaje odpowiedź o 3 w nocy, a nie gdy rano otworzy się rejestracja.",
          body: "Agenci całą dobę pilnują zgłoszeń po zabiegach i harmonogramów kontroli, eskalując do lekarza, gdy tylko coś wygląda niepokojąco.",
          span: "md:col-span-2",
          flow: "monitoring",
          deepDive: {
            intro: "Dwa dni po zabiegu pacjent zgłasza o północy narastający ból. Agent widzi to w kilka sekund. Oto co dzieje się dalej.",
            steps: [
              {
                title: "Obserwacja",
                body: "Zgłoszenia pozabiegowe, raporty objawów i harmonogramy kontroli są monitorowane bez przerwy, każde na tle normy dla danego zabiegu i danego pacjenta.",
              },
              {
                title: "Eskalacja",
                body: "W chwili przekroczenia progu lekarz dyżurny dostaje wiadomość z kontekstem, trendem i wagą zdarzenia, a nie goły alarm.",
              },
              {
                title: "Zapis",
                body: "Każdy alert, przekazanie i reakcja trafiają do audytowalnego śladu, więc gabinet widzi dokładnie, co i kiedy się wydarzyło.",
              },
            ],
          },
        },
        {
          title: "Zgodność w standardzie",
          body: "Dane zostają w Twojej infrastrukturze, każda rekomendacja jest logowana, a działania wysokiego ryzyka zawsze najpierw przechodzą przez człowieka.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "legal",
      label: "Prawo",
      h2: "Kancelaria w tempie maszyny.",
      lead: "Agenci researchu i przeglądu, którzy czytają wszystko, cytują wszystko i nie wystawiają faktur za godziny.",
      visualAria: "Abstrakcyjna waga sprawiedliwości narysowana jedną ciągłą linią",
      tiles: [
        {
          title: "Automatyczna analiza umów",
          body: "Ekstrakcja klauzul, wykrywanie odstępstw od Twojego playbooka i propozycje poprawek, z każdym wnioskiem podlinkowanym do akapitu źródłowego.",
          span: "md:col-span-2",
        },
        {
          title: "Błyskawiczny research orzecznictwa",
          body: "Ugruntowane wyszukiwanie po ustawach, orzeczeniach i historii Twoich spraw, zwracające odpowiedzi z cytatami zamiast pewnych siebie domysłów.",
          span: "md:col-span-2",
        },
        {
          title: "Boty ryzyka i compliance",
          body: "Ciągły przegląd dokumentów i procesów pod kątem list regulacyjnych, z alertami kierowanymi do odpowiedzialnego prawnika.",
          span: "md:col-span-2",
        },
        {
          title: "Tajemnica zachowana",
          body: "Dane spraw są izolowane per klient, szyfrowane od końca do końca i nigdy nie trenują współdzielonych modeli.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "industrial",
      label: "Przemysł",
      h2: "Fabryka, która przewiduje samą siebie.",
      lead: "Agenci wpięci w Twoje linie i czujniki, zamieniający telemetrię w decyzje, zanim zdarzy się przestój.",
      visualAria: "Zazębiające się parametryczne koła zębate narysowane jedną linią",
      tiles: [
        {
          title: "Optymalizacja łańcucha dostaw",
          body: "Agenci prognozowania popytu i zamówień, którzy pilnują czasów dostaw, zapasów buforowych i ryzyka dostawców we wszystkich zakładach.",
          span: "md:col-span-2",
        },
        {
          title: "Predykcyjne utrzymanie ruchu",
          body: "Dane o wibracjach, temperaturze i cyklach zasilają modele, które planują serwis przed awarią, nie po niej.",
          span: "md:col-span-2",
        },
        {
          title: "Wizyjni agenci QA",
          body: "Inspekcja kamerowa dostrojona do Twojego katalogu wad, oznaczająca anomalie na linii w czasie rzeczywistym.",
          span: "md:col-span-2",
        },
        {
          title: "Zabezpieczenia hali produkcyjnej",
          body: "Agenci działają w twardo zakodowanych kopertach bezpieczeństwa, a wszystko, co dotyka maszyn produkcyjnych, wymaga zatwierdzenia operatora.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "ecommerce",
      label: "E-commerce",
      h2: "Handel, który czyta w myślach.",
      lead: "Agenci, którzy sprzedają, zatowarowują i zatrzymują klientów całą dobę, wpięci w Twój katalog, marże i obietnice.",
      visualAria: "Ciągła linia rysująca koszyk zakupowy przechodzący w iskrę",
      tiles: [
        {
          title: "Autonomiczni osobiści doradcy zakupowi",
          outcome: "Zamień nocnych przeglądaczy w kupujących dzięki konsjerżowi, który zna Twój katalog lepiej niż najlepszy sprzedawca.",
          body: "Konwersacyjny agent prowadzi każdego odwiedzającego od mglistego pomysłu do pewnego zakupu, w jego języku, w tonie marki, w granicach Twoich reguł cenowych.",
          span: "md:col-span-2",
          flow: "shopper",
          deepDive: {
            intro: "Wyobraź sobie klienta, który wchodzi o 2 w nocy ze zrzutem ekranu, przybliżonym budżetem i bez nazwy produktu. Oto co dzieje się przez następne dziewięćdziesiąt sekund.",
            steps: [
              {
                title: "Zrozumienie",
                body: "Agent zadaje dwa doprecyzowujące pytania, odczytuje zrzut ekranu i wyciąga rozmiar, styl, budżet oraz pilność bez ani jednego pola formularza.",
              },
              {
                title: "Dopasowanie",
                body: "Zestawia żywy stan magazynu, oceny i wskaźniki zwrotów, po czym wybiera trzy produkty, które naprawdę dowiezie na czas.",
              },
              {
                title: "Domknięcie",
                body: "Składa koszyk, nakłada tę jedną promocję, która mieści się w regułach marży, i rezerwuje termin dostawy. Dosprzedaż pojawia się tylko wtedy, gdy faktycznie pomaga.",
              },
            ],
          },
        },
        {
          title: "Dynamiczna predykcja zapasów",
          outcome: "Zamawiaj, zanim półka się opróżni, i zabijaj martwy zapas, zanim trafi do magazynu.",
          body: "Prognozowanie popytu na poziomie SKU wpięte w Twój proces zakupowy, żeby decyzje przestały być zgadywaniem.",
          flow: "inventory",
          span: "md:col-span-2",
          deepDive: {
            intro: "Twój bestseller wyprzedaje się w każdy czwarty piątek i nikt nie wie dlaczego. Agent wie.",
            steps: [
              {
                title: "Obserwacja",
                body: "Nieprzerwanie pobiera tempo sprzedaży, sezonowość, kalendarz kampanii i czasy dostaw od dostawców ze wszystkich kanałów.",
              },
              {
                title: "Predykcja",
                body: "Buduje krzywe popytu per SKU z przedziałami ufności, wskazując zarówno brak towaru za tydzień, jak i nadmiar za kwartał.",
              },
              {
                title: "Działanie",
                body: "Przygotowuje zamówienia z ilościami i terminami oraz uzasadnieniem. Twój kupiec przegląda i zatwierdza jednym kliknięciem.",
              },
            ],
          },
        },
        {
          title: "Hiperpersonalizowana retencja",
          outcome: "Odzyskuj klientów, zanim sami zauważą, że odchodzą.",
          body: "Sygnały odejścia wykrywane per klient, oferty komponowane według historii i marży, wyniki zasilające kolejną kampanię.",
          span: "md:col-span-2",
          deepDive: {
            intro: "Lojalna klientka po cichu przestaje otwierać Twoje maile. Większość sklepów zauważa po trzech miesiącach. Twój zauważa w tym samym tygodniu.",
            steps: [
              {
                title: "Wykrycie",
                body: "Agent śledzi spadek zaangażowania per kohorta i oznacza klientów, których zachowanie właśnie się zmieniło, a nie wszystkich naraz.",
              },
              {
                title: "Kompozycja",
                body: "Dla każdego oznaczonego klienta dobiera kanał, moment i ofertę na bazie historii, w granicach progów rabatowych zatwierdzonych przez CFO.",
              },
              {
                title: "Uczenie",
                body: "Każda odpowiedź zasila kolejną decyzję, więc playbook odzyskiwania wyostrza się z każdą kampanią, zamiast się starzeć.",
              },
            ],
          },
        },
        {
          title: "Strażnicy marży",
          body: "Każdy rabat, pakiet i obietnica dostawy mieści się w twardo zakodowanych progach cenowych. Agent sprzedaje odważnie, ale nigdy poniżej linii, którą wyznaczył Twój dział finansów.",
          span: "md:col-span-6",
        },
      ],
    },
    {
      id: "finance",
      label: "Finanse",
      h2: "Pieniądze, które same się bronią.",
      lead: "Agenci audytują każdą transakcję w czasie rzeczywistym, więc Twoi analitycy zajmują się osądem, a nie kolejką.",
      visualAria: "Rosnąca linia notowań zwijająca się w bezpieczny zamek",
      tiles: [
        {
          title: "Neutralizacja fraudu w czasie rzeczywistym",
          outcome: "Blokuj podejrzane transakcje w milisekundy, a nie po chargebacku.",
          body: "Agenci scoringowi porównują każdą transakcję z profilem behawioralnym i znanymi wzorcami, mrożąc tylko to, co na to zasługuje.",
          span: "md:col-span-2",
          flow: "fraud",
          deepDive: {
            intro: "Skradziona karta próbuje trzech sklepów w dziewięćdziesiąt sekund. Tradycyjna kolejka antyfraudowa sprawdzi to jutro. Twój agent sprawdza teraz.",
            steps: [
              {
                title: "Scoring",
                body: "Każda transakcja jest oceniana w milisekundy względem własnego profilu behawioralnego posiadacza karty i znanych wzorców fraudu.",
              },
              {
                title: "Decyzja",
                body: "Oczywisty fraud jest mrożony natychmiast; realne przypadki brzegowe trafiają do analityka z pełnym materiałem dowodowym.",
              },
              {
                title: "Adaptacja",
                body: "Potwierdzone wyniki wracają do modelu, więc nowa taktyka fraudu zostaje złapana za drugim razem, nie za setnym.",
              },
            ],
          },
        },
        {
          title: "Automatyczny audyt zgodności",
          outcome: "Każda transakcja prześwietlona pod AML i KYC, ze ścieżką audytu, którą regulator może odtworzyć.",
          body: "Ciągły screening zamiast kwartalnej paniki, z każdą decyzją zalogowaną, źródłowaną i wyjaśnialną.",
          span: "md:col-span-2",
          deepDive: {
            intro: "Regulator prosi o uzasadnienie dwóch lat transakcji we wtorkowe popołudnie. Twój agent już to ma, źródłowane i ostemplowane czasem.",
            steps: [
              {
                title: "Screening",
                body: "Każda transakcja jest sprawdzana względem żywych reguł AML i KYC w chwili, gdy się dzieje, a nie w kwartalnej paczce.",
              },
              {
                title: "Log",
                body: "Każda decyzja jest zapisana z wejściami, dopasowaną regułą i dowodami, w ścieżce, którą regulator może odtworzyć.",
              },
              {
                title: "Flaga",
                body: "Wszystko niejednoznaczne jest eskalowane do odpowiedzialnego oficera, zanim stanie się problemem sprawozdawczym.",
              },
            ],
          },
        },
        {
          title: "Inteligentni asystenci majątkowi",
          outcome: "Wgląd w portfel prostym językiem, z każdą liczbą źródłowaną i każdą akcją za zgodą klienta.",
          body: "Asystenci tłumaczą pozycje, ryzyka i scenariusze w rozmowie, a niczego nie wykonują samodzielnie.",
          span: "md:col-span-2",
          flow: "wealth",
          deepDive: {
            intro: "Klient pisze 'czemu mój portfel spada' o 23:00. Asystent odpowiada prostym językiem, z każdą liczbą źródłowaną, i nigdy nie dotyka zlecenia.",
            steps: [
              {
                title: "Wyjaśnienie",
                body: "Zamienia pozycje, ekspozycje i scenariusze w rozmowę, którą klient naprawdę rozumie.",
              },
              {
                title: "Modelowanie",
                body: "Na żądanie liczy scenariusze what-if, pokazując zakres wyników zamiast jednej fałszywej obietnicy.",
              },
              {
                title: "Przekazanie",
                body: "Wszystko, co przesuwa pieniądze, jest pakowane do przeglądu i wykonania przez ludzkiego doradcę, nigdy autonomicznie.",
              },
            ],
          },
        },
        {
          title: "Podpis człowieka, zawsze",
          body: "Wszystko, co przesuwa pieniądze, przechodzi przez ludzki punkt kontrolny. Agent przygotowuje decyzję, człowiek ją podejmuje.",
          span: "md:col-span-6",
        },
      ],
    },
  ],
};

const SECTORS: Record<Locale, SectorsContent> = { en, pl };

export const getSectors = (locale: Locale): SectorsContent => SECTORS[locale] ?? en;
