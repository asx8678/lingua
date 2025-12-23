// Shared data for landing pages to avoid duplication

export type LandingPageData = {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  kicker: string;
  h1: string;
  intro: string;
  benefits: Array<{ title: string; text: string }>;
  offers: Array<{ title: string; text: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  targetAudience: Array<{ label: string; description: string }>;
  locationCard: {
    title: string;
    intro: string;
    features: string[];
  };
  cta: {
    title: string;
    description: string;
    note: string;
  };
};

export const angielskiLegionowo: LandingPageData = {
  slug: "angielski-legionowo",
  title: "Angielski Legionowo – kursy i lekcje języka angielskiego",
  description:
    "Szukasz kursów angielskiego w Legionowie? Lingua oferuje profesjonalne lekcje stacjonarne i online. Zajęcia indywidualne i grupowe dla dorosłych i młodzieży.",
  canonical: "/angielski-legionowo",
  kicker: "Angielski Legionowo",
  h1: "Kursy angielskiego w Legionowie — lokalna szkoła językowa",
  intro:
    "Lingua Legionowo to szkoła języka angielskiego dla mieszkańców Legionowa i okolic. Oferujemy profesjonalne kursy stacjonarne i online dla wszystkich poziomów zaawansowania.",
  benefits: [
    {
      title: "Lokalna szkoła w Legionowie",
      text: "Znajdziesz nas w centrum Legionowa. Łatwy dojazd, dostępny parking. Bez dojazdów do Warszawy.",
    },
    {
      title: "Doświadczeni lektorzy",
      text: "Nasi nauczyciele to pasjonaci języka z wieloletnim doświadczeniem w nauczaniu.",
    },
    {
      title: "Elastyczne godziny",
      text: "Dopasowujemy terminy zajęć do Twojego grafiku — rano, po południu lub wieczorem.",
    },
    {
      title: "Wszystkie poziomy",
      text: "Od początkującego (A1) do biegłego (C2). Każdy znajdzie odpowiedni kurs.",
    },
  ],
  offers: [
    {
      title: "Lekcje stacjonarne",
      text: "Zajęcia twarzą w twarz w naszej szkole w Legionowie. Indywidualne i grupowe.",
      href: "/angielski-stacjonarnie",
    },
    {
      title: "Lekcje online",
      text: "Dla osób, które preferują naukę z domu lub nie mogą dojeżdżać.",
      href: "/angielski-online",
    },
    {
      title: "Kursy grupowe",
      text: "Regularne zajęcia w małych grupach 2-6 osób na podobnym poziomie.",
      href: "/kursy-grupowe",
    },
    {
      title: "Przygotowanie do egzaminów",
      text: "Matura, FCE, CAE, IELTS — przygotujemy Cię do egzaminu.",
      href: "/kontakt",
    },
  ],
  faqs: [
    {
      question: "Gdzie mieści się szkoła Lingua w Legionowie?",
      answer:
        "Nasza szkoła znajduje się w centrum Legionowa, z łatwym dojazdem komunikacją miejską i dostępnym parkingiem. Dokładny adres podamy przy zapisie.",
    },
    {
      question: "Jakie poziomy są dostępne?",
      answer:
        "Prowadzimy zajęcia na wszystkich poziomach: A1 (początkujący), A2, B1, B2, C1 i C2 (biegły).",
    },
    {
      question: "Czy prowadzicie kursy dla firm w Legionowie?",
      answer:
        "Tak, oferujemy kursy Business English dla firm z Legionowa i okolic. Możemy prowadzić zajęcia w siedzibie firmy lub w naszej szkole.",
    },
    {
      question: "Ile kosztują lekcje angielskiego w Legionowie?",
      answer:
        "Ceny zależą od formy zajęć, liczby osób i długości spotkań. Najaktualniejsze stawki znajdziesz w cenniku lub podamy je po krótkiej konsultacji.",
    },
    {
      question: "Czy mogę umówić bezpłatną konsultację?",
      answer:
        "Tak, oferujemy bezpłatną konsultację i diagnozę poziomu. To okazja, żeby poznać naszą metodę nauczania i ustalić plan nauki.",
    },
  ],
  targetAudience: [
    { label: "Dorośli", description: "rozwijaj kompetencje językowe potrzebne w pracy" },
    { label: "Młodzież", description: "przygotowanie do matury i egzaminów Cambridge" },
    { label: "Seniorzy", description: "spokojne tempo, przyjazna atmosfera" },
    { label: "Firmy", description: "kursy Business English dla zespołów" },
  ],
  locationCard: {
    title: "Lokalizacja w Legionowie",
    intro: "Nasza szkoła znajduje się w centrum Legionowa. Oferujemy:",
    features: [
      "Łatwy dojazd komunikacją miejską",
      "Dostępny parking dla samochodów",
      "Nowoczesne, klimatyzowane sale",
      "Komfortowe warunki do nauki",
    ],
  },
  cta: {
    title: "Zacznij naukę angielskiego w Legionowie",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu i poznaj naszą szkołę. Znajdziesz nas w centrum Legionowa.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const angielskiZdalnie: LandingPageData = {
  slug: "angielski-zdalnie",
  title: "Angielski online – lekcje zdalne z lektorem na żywo",
  description:
    "Ucz się angielskiego online z doświadczonymi lektorami. Lekcje zdalne na żywo, elastyczne godziny, nacisk na mówienie. Umów bezpłatną konsultację.",
  canonical: "/angielski-zdalnie",
  kicker: "Angielski online",
  h1: "Lekcje angielskiego online — nauka z domu z lektorem na żywo",
  intro:
    "Ucz się angielskiego bez wychodzenia z domu. Nasze lekcje online to zajęcia na żywo z lektorem, nie nagrane materiały. Elastyczne godziny i pełna koncentracja na Twoich potrzebach.",
  benefits: [
    {
      title: "Lekcje na żywo",
      text: "Prawdziwe zajęcia z lektorem przez Zoom/Google Meet, nie nagrane kursy.",
    },
    {
      title: "Elastyczne godziny",
      text: "Zajęcia rano, po południu lub wieczorem — dopasowane do Twojego grafiku.",
    },
    {
      title: "Nacisk na mówienie",
      text: "Od pierwszych minut ćwiczysz konwersację. Materiały pisemne to dodatek.",
    },
    {
      title: "Bez dojazdów",
      text: "Oszczędzasz czas i pieniądze. Uczysz się z dowolnego miejsca.",
    },
  ],
  offers: [
    {
      title: "Lekcje indywidualne",
      text: "Zajęcia 1:1 dopasowane do Twojego poziomu i celów.",
      href: "/lekcje-indywidualne",
    },
    {
      title: "Lekcje w duecie/trójce",
      text: "Ucz się ze znajomym lub rodziną w korzystniejszej cenie.",
      href: "/kontakt",
    },
    {
      title: "Kursy grupowe online",
      text: "Małe grupy 3-6 osób na podobnym poziomie.",
      href: "/kursy-grupowe",
    },
    {
      title: "Business English",
      text: "Angielski biznesowy dla profesjonalistów.",
      href: "/kontakt",
    },
  ],
  faqs: [
    {
      question: "Jak wyglądają lekcje online?",
      answer:
        "Spotykamy się przez Zoom lub Google Meet. Lektor prowadzi zajęcia na żywo, używamy wspólnej tablicy, materiałów i ćwiczeń interaktywnych.",
    },
    {
      question: "Co potrzebuję do lekcji online?",
      answer:
        "Komputer lub tablet z kamerą i mikrofonem oraz stabilne połączenie internetowe. Smartfon też się sprawdzi, choć ekran jest mniejszy.",
    },
    {
      question: "Czy mogę zmienić termin lekcji?",
      answer:
        "Tak, przełożenie lekcji jest możliwe z 24-godzinnym wyprzedzeniem bez dodatkowych kosztów.",
    },
    {
      question: "Ile kosztują lekcje online?",
      answer:
        "Ceny są takie same jak za lekcje stacjonarne. Pakiet 10 lekcji indywidualnych 45 min to 1000 zł.",
    },
    {
      question: "Czy lekcje online są równie skuteczne?",
      answer:
        "Tak, przy odpowiednim przygotowaniu lekcje online są równie efektywne. Kluczem jest regularność i aktywny udział.",
    },
  ],
  targetAudience: [
    { label: "Osoby spoza Legionowa", description: "ucz się z dowolnego miejsca w Polsce" },
    { label: "Zapracowani profesjonaliści", description: "elastyczne godziny bez dojazdów" },
    { label: "Rodzice małych dzieci", description: "nauka w domu bez organizowania opieki" },
    { label: "Osoby z ograniczoną mobilnością", description: "pełny dostęp do zajęć" },
  ],
  locationCard: {
    title: "Jak zacząć naukę online?",
    intro: "Rozpoczęcie jest proste:",
    features: [
      "Umów bezpłatną konsultację online",
      "Określimy Twój poziom i cele",
      "Dobierzemy lektora i plan nauki",
      "Zaczynasz zajęcia w wybranym terminie",
    ],
  },
  cta: {
    title: "Zacznij naukę angielskiego online",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Sprawdzimy, czy lekcje online są dla Ciebie.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const landingPages: Record<string, LandingPageData> = {
  "angielski-legionowo": angielskiLegionowo,
  "angielski-zdalnie": angielskiZdalnie,
};
