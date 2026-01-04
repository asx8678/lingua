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
    note: "Odpowiadamy najszybciej, jak to możliwe.",
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
    note: "Odpowiadamy najszybciej, jak to możliwe.",
  },
};

export const angielskiDlaDzieciLegionowo: LandingPageData = {
  slug: "angielski-dla-dzieci-legionowo",
  title: "Angielski dla dzieci Legionowo – kursy dla najmłodszych",
  description:
    "Kursy angielskiego dla dzieci w Legionowie. Nauka przez zabawę, małe grupy, doświadczeni lektorzy. Zajęcia stacjonarne i online dla dzieci 6-12 lat.",
  canonical: "/angielski-dla-dzieci-legionowo",
  kicker: "Angielski dla dzieci",
  h1: "Angielski dla dzieci w Legionowie — nauka przez zabawę",
  intro:
    "Twoje dziecko zacznie mówić po angielsku naturalnie i bez stresu. Nasze zajęcia łączą naukę z zabawą — gry, piosenki i ćwiczenia interaktywne sprawiają, że dzieci chętnie wracają na lekcje.",
  benefits: [
    {
      title: "Nauka przez zabawę",
      text: "Gry, piosenki, historyjki i ćwiczenia ruchowe. Dzieci uczą się, nie zdając sobie sprawy, że to nauka.",
    },
    {
      title: "Małe grupy 3-6 osób",
      text: "Lektor ma czas dla każdego dziecka. Wszyscy są na podobnym poziomie i w zbliżonym wieku.",
    },
    {
      title: "Doświadczeni lektorzy",
      text: "Nasi nauczyciele specjalizują się w pracy z dziećmi i wiedzą, jak utrzymać ich uwagę.",
    },
    {
      title: "Regularne informacje dla rodziców",
      text: "Po każdych zajęciach wiesz, czego dziecko się nauczyło i jak pracować w domu.",
    },
  ],
  offers: [
    {
      title: "Grupy wiekowe 6-8 lat",
      text: "Podstawy języka, słownictwo codzienne, proste zdania i piosenki.",
      href: "/kontakt",
    },
    {
      title: "Grupy wiekowe 9-12 lat",
      text: "Rozbudowane słownictwo, gramatyka, przygotowanie do szkoły podstawowej.",
      href: "/kontakt",
    },
    {
      title: "Lekcje indywidualne",
      text: "Dopasowane tempo i materiał do potrzeb dziecka.",
      href: "/lekcje-indywidualne",
    },
    {
      title: "Zajęcia online",
      text: "Dla dzieci, które wolą uczyć się z domu lub mieszkają dalej.",
      href: "/angielski-online",
    },
  ],
  faqs: [
    {
      question: "Od jakiego wieku przyjmujecie dzieci?",
      answer:
        "Prowadzimy zajęcia dla dzieci od 6 lat. W tym wieku dzieci są już gotowe na naukę w grupie i potrafią skupić uwagę przez dłuższy czas.",
    },
    {
      question: "Jak wyglądają zajęcia dla dzieci?",
      answer:
        "Każda lekcja trwa 45-60 minut i łączy różne formy aktywności: gry, piosenki, ćwiczenia ruchowe, historyjki. Dzieci uczą się słownictwa i prostych zdań w naturalny sposób.",
    },
    {
      question: "Ile dzieci jest w grupie?",
      answer:
        "Grupy liczą 3-6 dzieci w zbliżonym wieku i na podobnym poziomie. To pozwala lektorowi poświęcić uwagę każdemu dziecku.",
    },
    {
      question: "Czy dziecko musi mieć podstawy angielskiego?",
      answer:
        "Nie, przyjmujemy dzieci na każdym poziomie — od zupełnych początkujących. Diagnozujemy poziom na pierwszym spotkaniu i dobieramy odpowiednią grupę.",
    },
    {
      question: "Jak mogę śledzić postępy dziecka?",
      answer:
        "Po zajęciach wysyłamy krótką informację o tematyce lekcji. Raz na semestr organizujemy spotkania podsumowujące z rodzicami.",
    },
  ],
  targetAudience: [
    { label: "Dzieci 6-8 lat", description: "pierwsze kroki z angielskim, nauka przez zabawę" },
    { label: "Dzieci 9-12 lat", description: "rozbudowane słownictwo, przygotowanie do szkoły" },
    { label: "Rodzice", description: "regularne informacje o postępach dziecka" },
  ],
  locationCard: {
    title: "Bezpieczeństwo i komfort",
    intro: "Nasza szkoła jest przystosowana do zajęć z dziećmi:",
    features: [
      "Jasne, kolorowe sale dostosowane do dzieci",
      "Bezpieczne otoczenie i nadzór",
      "Materiały dydaktyczne odpowiednie wiekowo",
      "Możliwość odebrania dziecka po zajęciach",
    ],
  },
  cta: {
    title: "Zapisz dziecko na zajęcia",
    description:
      "Umów bezpłatną konsultację i sprawdź, czy nasz styl nauczania odpowiada Twojemu dziecku.",
    note: "Odpowiadamy najszybciej, jak to możliwe.",
  },
};

export const angielskiDlaMlodziezyLegionowo: LandingPageData = {
  slug: "angielski-dla-mlodziezy-legionowo",
  title: "Angielski dla młodzieży Legionowo – przygotowanie do matury i egzaminów",
  description:
    "Kursy angielskiego dla młodzieży w Legionowie. Przygotowanie do matury, egzaminu ósmoklasisty i certyfikatów Cambridge. Zajęcia stacjonarne i online.",
  canonical: "/angielski-dla-mlodziezy-legionowo",
  kicker: "Angielski dla młodzieży",
  h1: "Angielski dla młodzieży w Legionowie — przygotowanie do egzaminów",
  intro:
    "Pomagamy licealistom i uczniom szkół podstawowych przygotować się do matury, egzaminu ósmoklasisty i certyfikatów Cambridge. Nasze zajęcia łączą praktykę językową z technikami egzaminacyjnymi.",
  benefits: [
    {
      title: "Przygotowanie do matury",
      text: "Ćwiczymy wszystkie części egzaminu: słuchanie, czytanie, pisanie i mówienie. Znamy wymagania CKE.",
    },
    {
      title: "Egzamin ósmoklasisty",
      text: "Pomagamy uczniom klasy 7-8 przygotować się do obowiązkowego egzaminu z angielskiego.",
    },
    {
      title: "Certyfikaty Cambridge",
      text: "FCE, CAE, CPE — przygotowujemy do egzaminów z międzynarodowym uznaniem.",
    },
    {
      title: "Nauka do szkoły",
      text: "Uzupełniamy materiał szkolny, pomagamy z zadaniami i sprawdzianami.",
    },
  ],
  offers: [
    {
      title: "Kurs maturalny",
      text: "Intensywne przygotowanie do matury podstawowej i rozszerzonej.",
      href: "/kontakt",
    },
    {
      title: "Kurs ósmoklasisty",
      text: "Przygotowanie do egzaminu ósmoklasisty z angielskiego.",
      href: "/kontakt",
    },
    {
      title: "Kursy Cambridge",
      text: "Przygotowanie do FCE, CAE i innych egzaminów Cambridge.",
      href: "/kontakt",
    },
    {
      title: "Lekcje indywidualne",
      text: "Dopasowane tempo i materiał do potrzeb ucznia.",
      href: "/lekcje-indywidualne",
    },
  ],
  faqs: [
    {
      question: "Kiedy zacząć przygotowanie do matury?",
      answer:
        "Najlepiej zacząć w klasie 2 liceum (poziom podstawowy) lub na początku klasy 3 (poziom rozszerzony). Im wcześniej, tym więcej czasu na uzupełnienie braków.",
    },
    {
      question: "Czy pomagacie z materiałem szkolnym?",
      answer:
        "Tak, możemy pomagać z zadaniami domowymi, przygotowaniem do sprawdzianów i uzupełnianiem braków ze szkoły.",
    },
    {
      question: "Jak wygląda przygotowanie do egzaminu ósmoklasisty?",
      answer:
        "Ćwiczymy typowe zadania egzaminacyjne, rozbudowujemy słownictwo i pracujemy nad umiejętnościami, które będą punktowane.",
    },
    {
      question: "Czy prowadzicie kursy wakacyjne?",
      answer:
        "Tak, w wakacje organizujemy intensywne kursy przygotowawcze do matury i egzaminu ósmoklasisty.",
    },
    {
      question: "Jakie są godziny zajęć?",
      answer:
        "Zajęcia dla młodzieży prowadzimy głównie po południu (15:00-20:00) i w weekendy, żeby nie kolidowały ze szkołą.",
    },
  ],
  targetAudience: [
    { label: "Licealiści", description: "przygotowanie do matury podstawowej i rozszerzonej" },
    { label: "Uczniowie klas 7-8", description: "przygotowanie do egzaminu ósmoklasisty" },
    { label: "Kandydaci na studia", description: "egzaminy Cambridge jako przepustka na uczelnię" },
  ],
  locationCard: {
    title: "Elastyczność dla uczniów",
    intro: "Rozumiemy, że szkoła zajmuje dużo czasu:",
    features: [
      "Zajęcia po lekcjach i w weekendy",
      "Możliwość lekcji online z domu",
      "Elastyczne przekładanie terminów",
      "Materiały dostępne online",
    ],
  },
  cta: {
    title: "Zacznij przygotowanie do egzaminu",
    description:
      "Umów konsultację i sprawdź poziom. Ułożymy plan nauki dopasowany do terminu egzaminu.",
    note: "Odpowiadamy najszybciej, jak to możliwe.",
  },
};

export const angielskiDlaDorosychLegionowo: LandingPageData = {
  slug: "angielski-dla-doroslych-legionowo",
  title: "Angielski dla dorosłych Legionowo – kursy językowe dla profesjonalistów",
  description:
    "Kursy angielskiego dla dorosłych w Legionowie. Angielski do pracy, konwersacje, certyfikaty. Elastyczne godziny, zajęcia stacjonarne i online.",
  canonical: "/angielski-dla-doroslych-legionowo",
  kicker: "Angielski dla dorosłych",
  h1: "Angielski dla dorosłych w Legionowie — rozwijaj kompetencje językowe",
  intro:
    "Angielski do pracy, podróży czy samorozwoju? Nasze kursy dla dorosłych są dopasowane do Twojego celu i harmonogramu. Ucz się efektywnie, bez marnowania czasu na niepotrzebny materiał.",
  benefits: [
    {
      title: "Nauka dopasowana do celu",
      text: "Określamy Twój cel na start i skupiamy się tylko na tym, co Ci potrzebne — bez zbędnego materiału.",
    },
    {
      title: "Elastyczne godziny",
      text: "Zajęcia rano, po południu lub wieczorem. Dopasowujemy się do Twojego grafiku.",
    },
    {
      title: "Nacisk na mówienie",
      text: "Dorośli najczęściej potrzebują mówić. Od pierwszych lekcji ćwiczysz konwersację.",
    },
    {
      title: "Online lub stacjonarnie",
      text: "Wybierz formę nauki, która Ci odpowiada. Możesz je łączyć.",
    },
  ],
  offers: [
    {
      title: "Angielski konwersacyjny",
      text: "Dla osób, które rozumieją, ale nie mówią płynnie. Przełamujemy barierę mówienia.",
      href: "/angielski-online",
    },
    {
      title: "Business English",
      text: "Angielski do pracy: spotkania, prezentacje, emaile, negocjacje.",
      href: "/kontakt",
    },
    {
      title: "Angielski od podstaw",
      text: "Nigdy nie uczyłeś się angielskiego? Zaczynamy od zera, bez pośpiechu.",
      href: "/kontakt",
    },
    {
      title: "Certyfikaty językowe",
      text: "IELTS, Cambridge, TOEFL — przygotowanie do egzaminów.",
      href: "/kontakt",
    },
  ],
  faqs: [
    {
      question: "Nie mam czasu na regularną naukę. Czy to dla mnie?",
      answer:
        "Tak. Mamy elastyczne pakiety bez zobowiązań na stałe terminy. Możesz umawiać lekcje z tygodnia na tydzień, gdy masz czas.",
    },
    {
      question: "Wstydzę się mówić po angielsku. Jak sobie z tym radzicie?",
      answer:
        "To normalne. Zaczynamy od prostych ćwiczeń, budujemy pewność stopniowo. Lektor nie ocenia — pomaga. W małej grupie lub 1:1 nie ma presji publiczności.",
    },
    {
      question: "Ile czasu potrzebuję, żeby zobaczyć efekty?",
      answer:
        "Przy regularnej nauce (2 lekcje tygodniowo + praca własna) zauważalny postęp widać po 2-3 miesiącach. Tempo zależy od Twojego zaangażowania.",
    },
    {
      question: "Czy mogę łączyć lekcje online i stacjonarne?",
      answer:
        "Tak, to popularna opcja. Możesz np. przychodzić do szkoły, a gdy nie masz czasu na dojazd — uczyć się online.",
    },
    {
      question: "Mam 50+ lat. Czy nauka języka ma sens?",
      answer:
        "Oczywiście. Wiek nie jest przeszkodą — dorośli uczniowie często są bardziej zmotywowani i efektywni. Dostosowujemy tempo i metody do Twoich potrzeb.",
    },
  ],
  targetAudience: [
    { label: "Profesjonaliści", description: "angielski potrzebny w pracy, awans, nowe możliwości" },
    { label: "Osoby wracające do nauki", description: "odświeżenie angielskiego po latach przerwy" },
    { label: "Podróżnicy", description: "swobodna komunikacja za granicą" },
    { label: "Seniorzy 50+", description: "nauka w przyjaznym tempie, bez pośpiechu" },
  ],
  locationCard: {
    title: "Nauka na Twoich warunkach",
    intro: "Rozumiemy, że masz mało wolnego czasu:",
    features: [
      "Elastyczne godziny (7:00-21:00)",
      "Możliwość przekładania lekcji",
      "Zajęcia online lub w szkole",
      "Pakiety bez długoterminowych zobowiązań",
    ],
  },
  cta: {
    title: "Zacznij naukę angielskiego",
    description:
      "Umów bezpłatną konsultację. Sprawdzimy Twój poziom i zaproponujemy plan nauki.",
    note: "Odpowiadamy najszybciej, jak to możliwe.",
  },
};

export const angielskiBiznesowyLegionowo: LandingPageData = {
  slug: "angielski-biznesowy-legionowo",
  title: "Angielski biznesowy Legionowo – Business English dla firm i profesjonalistów",
  description:
    "Kursy Business English w Legionowie. Angielski do pracy: spotkania, prezentacje, negocjacje, emaile. Szkolenia firmowe i lekcje indywidualne.",
  canonical: "/angielski-biznesowy-legionowo",
  kicker: "Angielski biznesowy",
  h1: "Business English w Legionowie — angielski do pracy",
  intro:
    "Angielski biznesowy dla profesjonalistów i firm z Legionowa. Przygotujemy Cię do spotkań, prezentacji, negocjacji i codziennej komunikacji w międzynarodowym środowisku.",
  benefits: [
    {
      title: "Praktyczne umiejętności",
      text: "Uczysz się tego, co używasz w pracy: spotkania, emaile, prezentacje, rozmowy telefoniczne.",
    },
    {
      title: "Dopasowanie do branży",
      text: "IT, finanse, marketing, HR — dostosowujemy słownictwo i sytuacje do Twojej dziedziny.",
    },
    {
      title: "Szkolenia firmowe",
      text: "Prowadzimy kursy dla zespołów. Możemy przyjść do Waszego biura lub prowadzić online.",
    },
    {
      title: "Elastyczne terminy",
      text: "Zajęcia rano przed pracą, w przerwie obiadowej lub po godzinach.",
    },
  ],
  offers: [
    {
      title: "Lekcje indywidualne",
      text: "Intensywny kurs dopasowany do Twoich celów zawodowych.",
      href: "/lekcje-indywidualne",
    },
    {
      title: "Szkolenia firmowe",
      text: "Kursy dla zespołów 2-8 osób. W siedzibie firmy lub online.",
      href: "/kontakt",
    },
    {
      title: "Spotkania i prezentacje",
      text: "Przygotowanie do konkretnego wydarzenia: prezentacji, konferencji, negocjacji.",
      href: "/kontakt",
    },
    {
      title: "Kurs online",
      text: "Business English zdalnie — dla osób pracujących hybrydowo.",
      href: "/angielski-online",
    },
  ],
  faqs: [
    {
      question: "Czym Business English różni się od zwykłego angielskiego?",
      answer:
        "Business English skupia się na komunikacji w środowisku zawodowym: formalny język, słownictwo branżowe, konwencje biznesowe (emaile, raporty, spotkania).",
    },
    {
      question: "Czy prowadzicie kursy dla całych zespołów?",
      answer:
        "Tak, organizujemy szkolenia firmowe dla grup 2-8 osób. Możemy prowadzić zajęcia w Waszym biurze, w naszej szkole lub online.",
    },
    {
      question: "Mam prezentację za 2 tygodnie. Czy możecie pomóc?",
      answer:
        "Tak, oferujemy krótkie, intensywne przygotowanie do konkretnych wydarzeń: prezentacji, rozmów kwalifikacyjnych, negocjacji.",
    },
    {
      question: "Jaki poziom jest potrzebny do Business English?",
      answer:
        "Zalecamy minimum B1, żeby efektywnie pracować nad słownictwem biznesowym. Jeśli jesteś poniżej tego poziomu, najpierw wzmocnimy podstawy.",
    },
    {
      question: "Czy wystawiacie faktury dla firm?",
      answer:
        "Tak, wystawiamy faktury VAT. Wiele firm refunduje pracownikom kursy językowe jako benefit.",
    },
  ],
  targetAudience: [
    { label: "Menedżerowie", description: "spotkania z międzynarodowymi zespołami i klientami" },
    { label: "Specjaliści IT", description: "dokumentacja, code review, współpraca z zagranicznymi zespołami" },
    { label: "Handlowcy", description: "negocjacje, prezentacje, obsługa klientów zagranicznych" },
    { label: "Firmy", description: "szkolenia językowe dla zespołów" },
  ],
  locationCard: {
    title: "Szkolenia dla firm",
    intro: "Organizujemy kursy dla zespołów:",
    features: [
      "Zajęcia w siedzibie firmy lub online",
      "Grupy 2-8 osób",
      "Program dopasowany do branży",
      "Faktury VAT i rozliczenia firmowe",
    ],
  },
  cta: {
    title: "Rozwijaj angielski biznesowy",
    description:
      "Umów konsultację. Omówimy Twoje potrzeby i zaproponujemy program kursu.",
    note: "Odpowiadamy najszybciej, jak to możliwe.",
  },
};

export const landingPages: Record<string, LandingPageData> = {
  "angielski-legionowo": angielskiLegionowo,
  "angielski-zdalnie": angielskiZdalnie,
  "angielski-dla-dzieci-legionowo": angielskiDlaDzieciLegionowo,
  "angielski-dla-mlodziezy-legionowo": angielskiDlaMlodziezyLegionowo,
  "angielski-dla-doroslych-legionowo": angielskiDlaDorosychLegionowo,
  "angielski-biznesowy-legionowo": angielskiBiznesowyLegionowo,
};
