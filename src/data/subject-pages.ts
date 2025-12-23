export type SubjectPageData = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string[];
  highlights: string[];
  pricingNote: string;
  audienceTitle: string;
  audienceIntro: string;
  audience: Array<{ label: string; description: string }>;
  goalsTitle: string;
  goalsIntro: string;
  goals: string[];
  outcomes: string[];
  formatTitle: string;
  formatIntro: string;
  formats: Array<{ title: string; text: string }>;
  organization: string[];
  materialsIntro: string;
  materials: string[];
  lessonPlanTitle: string;
  lessonPlanIntro: string;
  lessonPlan: string[];
  feedbackIntro: string;
  feedback: string[];
  faqs: Array<{ question: string; answer: string }>;
  cta: {
    title: string;
    description: string;
    note: string;
  };
};

export const matematyka: SubjectPageData = {
  slug: "matematyka",
  title: "Korepetycje z matematyki w Legionowie – zajęcia indywidualne i grupowe",
  description:
    "Korepetycje z matematyki w Legionowie i online. Zajęcia 1:1 i w mini-grupach, przygotowanie do egzaminów i systematyczne nadrabianie zaległości.",
  kicker: "Matematyka",
  h1: "Korepetycje z matematyki – Legionowo",
  intro: [
    "Matematyka bywa trudna, gdy brakuje podstaw lub jasnego planu. Pomagamy uporządkować materiał, wyjaśniamy krok po kroku i uczymy rozwiązywać zadania samodzielnie. Dzięki temu widzisz realny postęp, a nie tylko jednorazową poprawę oceny.",
    "Prowadzimy korepetycje stacjonarnie w Legionowie oraz online. Zajęcia dopasowujemy do poziomu i celu: od bieżącej pracy w szkole, przez egzamin ósmoklasisty i maturę, po wsparcie na studiach.",
  ],
  highlights: [
    "Zajęcia stacjonarne w Legionowie i online",
    "Poziomy: szkoła podstawowa, liceum, studia",
    "Format: 1:1 lub mini-grupa 2–3 osoby",
    "Spotkania 60 lub 90 min, 1–2 razy w tygodniu",
  ],
  pricingNote:
    "Matematyka ma takie same stawki jak angielski. Szczegóły i pakiety znajdziesz w cenniku.",
  audienceTitle: "Dla kogo są korepetycje z matematyki?",
  audienceIntro:
    "Pracujemy z uczniami na różnych etapach edukacji. Program i tempo dopasowujemy do potrzeb.",
  audience: [
    {
      label: "Szkoła podstawowa",
      description:
        "Utrwalenie podstaw, przygotowanie do sprawdzianów i egzaminu ósmoklasisty.",
    },
    {
      label: "Liceum i technikum",
      description:
        "Systematyczne nadrabianie materiału, przygotowanie do matury na poziomie podstawowym i rozszerzonym.",
    },
    {
      label: "Studenci i dorośli",
      description:
        "Wsparcie przy konkretnych zagadnieniach, poprawkach lub praktycznych zastosowaniach matematyki.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Ustalamy konkretne cele, dzięki którym łatwiej śledzić postęp i utrzymać regularność.",
  goals: [
    "Poprawa ocen i bieżących wyników w szkole.",
    "Egzamin ósmoklasisty i powtórka najważniejszych działów.",
    "Przygotowanie do matury – także zadań rozszerzonych.",
    "Nadrabianie zaległości po dłuższej przerwie.",
    "Zrozumienie logiki rozwiązywania zadań, a nie tylko wzorów.",
    "Większa pewność w pracy samodzielnej.",
  ],
  outcomes: [
    "Lepsze rozumienie treści zadań i szybsze podejmowanie decyzji.",
    "Umiejętność rozpisania zadania na proste kroki.",
    "Mniej stresu przed sprawdzianami i egzaminami.",
    "Wyraźne postępy dzięki regularnej pracy.",
    "Materiały do powtórek i utrwalania między spotkaniami.",
    "Stały feedback, co działa, a co wymaga poprawy.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Zajęcia prowadzimy indywidualnie lub w mini-grupach. Pomagamy ustalić częstotliwość, czas trwania i zakres materiału.",
  formats: [
    {
      title: "Lekcje 1:1",
      text: "Największa elastyczność i szybkie tempo pracy dopasowane do ucznia.",
    },
    {
      title: "Duet",
      text: "Dwie osoby na podobnym poziomie – więcej motywacji i wspólnej pracy.",
    },
    {
      title: "Mini-grupa 3 osoby",
      text: "Korzystna cena i wystarczająco dużo czasu na każde pytanie.",
    },
  ],
  organization: [
    "Krótka diagnoza poziomu i określenie celu nauki.",
    "Dobór materiałów i planu pracy na kolejne tygodnie.",
    "Stały prowadzący i spójny system notatek.",
    "Zadania utrwalające po każdym spotkaniu.",
  ],
  materialsIntro:
    "Materiały dobieramy do poziomu i celu – od arkuszy egzaminacyjnych po zadania tematyczne.",
  materials: [
    "Arkusze egzaminacyjne i zadania maturalne.",
    "Zestawy zadań dopasowane do bieżących tematów.",
    "Krótkie powtórki kluczowych wzorów i pojęć.",
    "Checklisty do samodzielnej nauki w domu.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia z matematyki?",
  lessonPlanIntro:
    "Każde spotkanie ma jasny cel i kończy się podsumowaniem, dzięki czemu łatwo wrócić do materiału.",
  lessonPlan: [
    "Szybkie sprawdzenie, co było trudne na ostatnich zajęciach.",
    "Wyjaśnienie nowych zagadnień krok po kroku.",
    "Wspólne rozwiązywanie przykładowych zadań.",
    "Samodzielna praca ucznia z krótkim omówieniem.",
    "Podsumowanie i plan pracy domowej.",
  ],
  feedbackIntro:
    "Po zajęciach dostajesz konkretne wskazówki, co warto powtórzyć i na czym się skupić.",
  feedback: [
    "Krótka informacja zwrotna po każdym spotkaniu.",
    "Lista tematów do utrwalenia między zajęciami.",
    "Wskazówki, jak rozwiązywać typowe zadania egzaminacyjne.",
    "Podsumowanie postępów co kilka tygodni.",
  ],
  faqs: [
    {
      question: "Czy przygotowujecie do egzaminu ósmoklasisty i matury?",
      answer:
        "Tak. Przygotowujemy do egzaminu ósmoklasisty oraz matury (podstawowej i rozszerzonej). Pracujemy na arkuszach i zadaniach z poprzednich lat.",
    },
    {
      question: "Czy zajęcia online są skuteczne z matematyki?",
      answer:
        "Tak. Pracujemy na wspólnej tablicy i zadaniach w czasie rzeczywistym. Uczeń widzi cały tok rozumowania i może zadawać pytania na bieżąco.",
    },
    {
      question: "Jak często powinny odbywać się korepetycje?",
      answer:
        "Najczęściej 1–2 razy w tygodniu po 60 lub 90 minut. Częstotliwość dopasowujemy do celu i intensywności nauki.",
    },
    {
      question: "Czy pomagacie w nadrabianiu zaległości?",
      answer:
        "Tak. Zaczynamy od diagnozy i ustalamy plan, który pozwala krok po kroku nadrobić materiał.",
    },
    {
      question: "Czy matematyka ma ten sam cennik co angielski?",
      answer:
        "Tak, obowiązują te same stawki. Szczegóły znajdziesz w cenniku lub podamy je po konsultacji.",
    },
    {
      question: "Czy mogę zapisać się na próbne spotkanie?",
      answer:
        "Tak, zaczynamy od bezpłatnej konsultacji i krótkiej diagnozy, aby dobrać najlepszy plan.",
    },
  ],
  cta: {
    title: "Chcesz uporządkować matematykę?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Dobierzemy plan i format zajęć, który realnie pomaga.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const hiszpanski: SubjectPageData = {
  slug: "hiszpanski",
  title: "Hiszpański w Legionowie – kursy i lekcje dla dzieci i dorosłych",
  description:
    "Hiszpański w Legionowie i online. Lekcje indywidualne i grupowe, konwersacje, przygotowanie do egzaminów i praktyczny język do podróży.",
  kicker: "Hiszpański",
  h1: "Hiszpański w Legionowie – lekcje i kursy",
  intro: [
    "Hiszpański to jeden z najbardziej użytecznych języków w podróży i pracy. Uczymy tak, abyś szybko zaczął mówić i rozumieć codzienne sytuacje. Łączymy praktyczne dialogi z uporządkowaną gramatyką, żeby postęp był zauważalny.",
    "Zajęcia prowadzimy stacjonarnie w Legionowie i online. Pracujemy z dziećmi, młodzieżą i dorosłymi – od poziomu A1 do zaawansowanego, z naciskiem na konwersacje i pewność w mówieniu.",
  ],
  highlights: [
    "Zajęcia stacjonarne i online",
    "Poziomy A1–C2, start od podstaw",
    "Indywidualnie lub w mini-grupie",
    "Konwersacje, podróże, praca, szkoła",
  ],
  pricingNote: "Ceny zgodne z cennikiem. Pakiety i kursy grupowe dopasowujemy do celu.",
  audienceTitle: "Dla kogo jest hiszpański?",
  audienceIntro:
    "Program dopasowujemy do wieku, poziomu i celu. Pracujemy w spokojnym tempie i stawiamy na praktykę.",
  audience: [
    {
      label: "Dzieci i młodzież",
      description:
        "Przygotowanie do sprawdzianów, lepsze wyniki w szkole i oswojenie z językiem.",
    },
    {
      label: "Dorośli",
      description:
        "Rozmowy w pracy, podróże, przełamanie bariery mówienia i regularny postęp.",
    },
    {
      label: "Osoby wyjeżdżające",
      description:
        "Nauka praktycznych zwrotów, słownictwa branżowego i sytuacji codziennych.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Ustalamy cele, które prowadzą do konkretnego rezultatu – od prostych rozmów po pewność w mówieniu.",
  goals: [
    "Swobodne rozmowy w podróży i na co dzień.",
    "Konwersacje bez stresu i blokady językowej.",
    "Poprawa ocen i przygotowanie do egzaminów szkolnych.",
    "Uporządkowanie gramatyki i budowanie słownictwa.",
    "Rozumienie ze słuchu i czytania w praktyce.",
    "Regularny plan nauki i mierzalny postęp.",
  ],
  outcomes: [
    "Większa pewność w mówieniu już po kilku tygodniach.",
    "Lepsza płynność dzięki regularnym dialogom.",
    "Słownictwo tematyczne dopasowane do Twoich potrzeb.",
    "Jasny plan nauki na kolejne miesiące.",
    "Materiały do powtórek między spotkaniami.",
    "Stały feedback i korekta najczęstszych błędów.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Dobieramy format do Twojego celu i dostępności. Zajęcia mogą być stacjonarne lub online.",
  formats: [
    {
      title: "Lekcje indywidualne",
      text: "Największa elastyczność, szybki postęp i skupienie na Twoich celach.",
    },
    {
      title: "Mini-grupy 2–3 osoby",
      text: "Więcej rozmów i motywacji, a jednocześnie spokojne tempo pracy.",
    },
    {
      title: "Kursy grupowe",
      text: "Stała grupa, regularność i program dopasowany do poziomu.",
    },
  ],
  organization: [
    "Diagnoza poziomu i omówienie celu.",
    "Dobór materiałów i planu tematycznego.",
    "Stały prowadzący i systematyczne podsumowania.",
    "Możliwość pracy hybrydowej (stacjonarnie + online).",
  ],
  materialsIntro:
    "Korzystamy z materiałów wspierających konwersacje, słownictwo i gramatykę w praktyce.",
  materials: [
    "Dialogi i scenki sytuacyjne.",
    "Słownictwo tematyczne (podróże, praca, codzienność).",
    "Ćwiczenia gramatyczne w krótkich blokach.",
    "Materiały do powtórek między spotkaniami.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia z hiszpańskiego?",
  lessonPlanIntro:
    "Zajęcia są dynamiczne, ale uporządkowane – wiesz, co ćwiczymy i po co.",
  lessonPlan: [
    "Rozgrzewka konwersacyjna i szybkie wejście w temat.",
    "Nowe słownictwo i struktury w krótkich blokach.",
    "Dialogi i scenki sytuacyjne.",
    "Ćwiczenia utrwalające wymowę i płynność.",
    "Podsumowanie i materiał do powtórki.",
  ],
  feedbackIntro:
    "Po zajęciach dostajesz informację zwrotną i wskazówki, jak ćwiczyć samodzielnie.",
  feedback: [
    "Korekta najczęstszych błędów wymowy i gramatyki.",
    "Lista słówek do utrwalenia.",
    "Wskazówki, jak ćwiczyć mówienie między zajęciami.",
    "Krótki plan na kolejne spotkanie.",
  ],
  faqs: [
    {
      question: "Czy mogę zacząć od zera?",
      answer:
        "Tak. Zaczynamy od podstaw, a tempo dopasowujemy do Twoich możliwości i czasu.",
    },
    {
      question: "Czy prowadzicie konwersacje po hiszpańsku?",
      answer:
        "Tak. Konwersacje to ważny element zajęć – uczysz się mówić od pierwszych spotkań.",
    },
    {
      question: "Jak często odbywają się zajęcia?",
      answer:
        "Najczęściej 1–2 razy w tygodniu po 60 lub 90 minut. Harmonogram ustalamy wspólnie.",
    },
    {
      question: "Czy mogę uczyć się online?",
      answer:
        "Tak. Lekcje online prowadzimy na żywo i korzystamy ze wspólnych materiałów.",
    },
    {
      question: "Czy przygotowujecie do egzaminów?",
      answer:
        "Tak. Przygotowujemy do sprawdzianów szkolnych i egzaminów językowych.",
    },
    {
      question: "Czy mogę dołączyć do mini-grupy?",
      answer:
        "Tak, tworzymy mini-grupy na podobnym poziomie, aby każdy miał czas na mówienie.",
    },
  ],
  cta: {
    title: "Chcesz zacząć mówić po hiszpańsku?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Dobierzemy format i plan nauki dopasowany do Twojego celu.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const niemiecki: SubjectPageData = {
  slug: "niemiecki",
  title: "Niemiecki w Legionowie – kursy i korepetycje dla dzieci i dorosłych",
  description:
    "Niemiecki w Legionowie i online. Zajęcia 1:1 i grupowe, przygotowanie do szkoły, egzaminów i pracy.",
  kicker: "Niemiecki",
  h1: "Niemiecki w Legionowie – kursy i korepetycje",
  intro: [
    "Niemiecki to język potrzebny w szkole, na studiach i w pracy. Uczymy praktycznie, tak abyś potrafił mówić i rozumieć realne sytuacje, a nie tylko rozwiązywać testy.",
    "Prowadzimy lekcje stacjonarnie w Legionowie oraz online. Dopasowujemy program do poziomu i celu: poprawa ocen, przygotowanie do egzaminów, praca za granicą lub rozmowy w firmie.",
  ],
  highlights: [
    "Poziomy A1–C2, start od podstaw",
    "Zajęcia stacjonarne i online",
    "Indywidualnie lub w mini-grupie",
    "Nacisk na mówienie i praktyczne słownictwo",
  ],
  pricingNote: "Cennik zależy od formatu zajęć i liczby osób. Szczegóły w cenniku.",
  audienceTitle: "Dla kogo jest niemiecki?",
  audienceIntro:
    "Uczymy dzieci, młodzież i dorosłych, którzy chcą poprawić wyniki lub rozwinąć język zawodowy.",
  audience: [
    {
      label: "Uczniowie",
      description:
        "Wsparcie w szkole, przygotowanie do sprawdzianów i egzaminów.",
    },
    {
      label: "Dorośli",
      description:
        "Niemiecki do pracy, wyjazdów i codziennej komunikacji.",
    },
    {
      label: "Osoby wyjeżdżające",
      description:
        "Słownictwo branżowe i praktyczne scenariusze rozmów.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Pracujemy na konkretnych celach, które przekładają się na realne efekty w mówieniu i rozumieniu.",
  goals: [
    "Poprawa ocen i pewności na lekcjach.",
    "Przygotowanie do egzaminów szkolnych.",
    "Rozmowy w pracy i w urzędach.",
    "Budowanie słownictwa branżowego.",
    "Płynność w codziennej komunikacji.",
    "Systematyczne powtórki i utrwalenie gramatyki.",
  ],
  outcomes: [
    "Lepsze rozumienie ze słuchu i czytania.",
    "Mniejsze napięcie w mówieniu po niemiecku.",
    "Praktyczne zwroty użyteczne w pracy i podróży.",
    "Stały plan nauki z jasnymi etapami.",
    "Materiały do samodzielnych powtórek.",
    "Feedback po każdym spotkaniu.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Dobieramy format do celu i grafiku. Zajęcia mogą być indywidualne, w mini-grupie lub grupowe.",
  formats: [
    {
      title: "Lekcje 1:1",
      text: "Największa elastyczność i szybkie tempo nauki.",
    },
    {
      title: "Mini-grupy",
      text: "Więcej rozmów i motywacji w małej grupie.",
    },
    {
      title: "Kursy grupowe",
      text: "Stały program i regularne spotkania w jednej grupie.",
    },
  ],
  organization: [
    "Diagnoza poziomu i ustalenie celu nauki.",
    "Plan tematyczny dopasowany do szkoły lub pracy.",
    "Systematyczne powtórki i utrwalenie materiału.",
    "Możliwość zajęć stacjonarnych i online.",
  ],
  materialsIntro:
    "Łączymy praktyczne dialogi z uporządkowaną gramatyką i słownictwem.",
  materials: [
    "Dialogi sytuacyjne i ćwiczenia konwersacyjne.",
    "Słownictwo branżowe i codzienne.",
    "Krótkie zestawy gramatyczne do utrwalenia.",
    "Materiały do samodzielnych powtórek.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia z niemieckiego?",
  lessonPlanIntro:
    "Każde spotkanie ma jasny plan i element konwersacyjny, dzięki czemu szybciej mówisz po niemiecku.",
  lessonPlan: [
    "Krótka rozmowa na start i sprawdzenie postępów.",
    "Nowe słownictwo i struktury w praktycznych zdaniach.",
    "Dialogi i ćwiczenia na mówienie.",
    "Utrwalenie gramatyki w przykładach.",
    "Podsumowanie i zadanie domowe.",
  ],
  feedbackIntro:
    "Dostajesz jasne wskazówki, co poprawić i jak ćwiczyć między zajęciami.",
  feedback: [
    "Lista błędów i poprawnych odpowiedzi.",
    "Wskazówki do wymowy i intonacji.",
    "Checklisty do powtórek.",
    "Plan tematyczny na kolejne spotkanie.",
  ],
  faqs: [
    {
      question: "Czy mogę zacząć niemiecki od zera?",
      answer:
        "Tak. Pracujemy od podstaw i wprowadzamy materiał stopniowo, bez presji.",
    },
    {
      question: "Czy zajęcia są stacjonarne i online?",
      answer:
        "Tak. Wybierasz tryb, który pasuje do Twojego grafiku.",
    },
    {
      question: "Czy pomagacie w nauce do szkoły?",
      answer:
        "Tak. Pomagamy w przygotowaniu do sprawdzianów i egzaminów.",
    },
    {
      question: "Czy prowadzicie zajęcia biznesowe?",
      answer:
        "Tak. Przygotowujemy słownictwo i sytuacje typowe dla pracy.",
    },
    {
      question: "Jak często odbywają się zajęcia?",
      answer:
        "Najczęściej 1–2 razy w tygodniu. Harmonogram ustalamy indywidualnie.",
    },
    {
      question: "Czy dostanę materiały do nauki?",
      answer:
        "Tak. Dostarczamy materiały do powtórek i zadania utrwalające.",
    },
  ],
  cta: {
    title: "Chcesz swobodnie mówić po niemiecku?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Zaproponujemy plan nauki dopasowany do Twojego celu.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const francuski: SubjectPageData = {
  slug: "francuski",
  title: "Francuski w Legionowie – lekcje i kursy dla dzieci i dorosłych",
  description:
    "Francuski w Legionowie i online. Lekcje 1:1 i w mini-grupach, konwersacje, przygotowanie do egzaminów i podróży.",
  kicker: "Francuski",
  h1: "Francuski w Legionowie – lekcje i kursy",
  intro: [
    "Francuski brzmi pięknie, ale wymaga osłuchania i systematycznej praktyki. Uczymy tak, abyś mówił pewniej i rozumiał rozmówcę w realnych sytuacjach – w podróży, pracy lub na uczelni.",
    "Zajęcia prowadzimy stacjonarnie w Legionowie oraz online. Dopasowujemy program do poziomu, celu i preferowanego tempa nauki.",
  ],
  highlights: [
    "Poziomy A1–C2 i start od podstaw",
    "Zajęcia stacjonarne i online",
    "Indywidualnie lub w mini-grupie",
    "Nacisk na wymowę i konwersacje",
  ],
  pricingNote: "Cennik zależy od formatu zajęć. Pakiety i kursy znajdziesz w cenniku.",
  audienceTitle: "Dla kogo jest francuski?",
  audienceIntro:
    "Francuski polecamy osobom, które chcą uczyć się regularnie i w praktyczny sposób.",
  audience: [
    {
      label: "Uczniowie i studenci",
      description:
        "Wsparcie w nauce szkolnej i przygotowanie do egzaminów.",
    },
    {
      label: "Dorośli",
      description:
        "Konwersacje, język do pracy oraz swobodne porozumiewanie się w podróży.",
    },
    {
      label: "Osoby przygotowujące się do wyjazdu",
      description:
        "Słownictwo i dialogi potrzebne w codziennych sytuacjach.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Ustalamy cele, które przekładają się na realną komunikację, a nie tylko teorię.",
  goals: [
    "Swobodne rozmowy w podróży i codziennych sytuacjach.",
    "Przygotowanie do egzaminów i sprawdzianów.",
    "Poprawa wymowy i pewności w mówieniu.",
    "Systematyczne budowanie słownictwa.",
    "Uporządkowanie gramatyki w praktyce.",
    "Regularny plan nauki i kontrola postępów.",
  ],
  outcomes: [
    "Lepsze rozumienie ze słuchu.",
    "Większa płynność i naturalność wypowiedzi.",
    "Słownictwo dopasowane do Twoich potrzeb.",
    "Materiały do powtórek między zajęciami.",
    "Feedback po każdej lekcji.",
    "Większa swoboda w czytaniu i pisaniu.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Zajęcia mogą być indywidualne lub w mini-grupach. Ustalamy częstotliwość i czas spotkań.",
  formats: [
    {
      title: "Lekcje 1:1",
      text: "Największa elastyczność i szybkie tempo nauki.",
    },
    {
      title: "Mini-grupa 2–3 osoby",
      text: "Wspólna motywacja i więcej czasu na mówienie.",
    },
    {
      title: "Kursy grupowe",
      text: "Stały harmonogram i program dopasowany do poziomu.",
    },
  ],
  organization: [
    "Diagnoza poziomu i ustalenie celu.",
    "Plan tematyczny i dobór materiałów.",
    "Regularne powtórki i utrwalanie wymowy.",
    "Możliwość pracy stacjonarnej lub online.",
  ],
  materialsIntro:
    "Pracujemy na dialogach, ćwiczeniach wymowy i materiałach wspierających konwersacje.",
  materials: [
    "Dialogi i scenki sytuacyjne.",
    "Ćwiczenia wymowy i akcentu.",
    "Słownictwo tematyczne.",
    "Materiały do samodzielnych powtórek.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia z francuskiego?",
  lessonPlanIntro:
    "Zajęcia łączą praktykę mówienia z uporządkowaną gramatyką.",
  lessonPlan: [
    "Rozgrzewka konwersacyjna i krótkie powtórki.",
    "Nowe słownictwo i struktury w dialogach.",
    "Ćwiczenia wymowy i intonacji.",
    "Praktyczne zadania i scenki.",
    "Podsumowanie i plan na kolejne spotkanie.",
  ],
  feedbackIntro:
    "Po zajęciach dostajesz jasny feedback i wskazówki do pracy własnej.",
  feedback: [
    "Korekta błędów i sugestie poprawy.",
    "Lista zwrotów do utrwalenia.",
    "Ćwiczenia wymowy do samodzielnej pracy.",
    "Plan kolejnych tematów.",
  ],
  faqs: [
    {
      question: "Czy mogę zacząć francuski od zera?",
      answer:
        "Tak, zaczynamy od podstaw i stopniowo zwiększamy poziom trudności.",
    },
    {
      question: "Czy są zajęcia online?",
      answer:
        "Tak. Prowadzimy lekcje online na żywo z pełnym wsparciem lektora.",
    },
    {
      question: "Jak wygląda praca nad wymową?",
      answer:
        "Wymowa jest ważnym elementem zajęć. Ćwiczymy akcent, intonację i typowe dźwięki.",
    },
    {
      question: "Czy pomagacie w przygotowaniu do egzaminów?",
      answer:
        "Tak, przygotowujemy do egzaminów szkolnych i językowych.",
    },
    {
      question: "Jak często odbywają się zajęcia?",
      answer:
        "Najczęściej 1–2 razy w tygodniu. Harmonogram ustalamy indywidualnie.",
    },
    {
      question: "Czy dostanę materiały do nauki?",
      answer:
        "Tak. Otrzymujesz materiały do powtórek i zadania utrwalające.",
    },
  ],
  cta: {
    title: "Chcesz mówić po francusku pewniej?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Dobierzemy tempo i format zajęć do Twojego celu.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const rosyjski: SubjectPageData = {
  slug: "rosyjski",
  title: "Rosyjski w Legionowie – lekcje i kursy dla dzieci i dorosłych",
  description:
    "Rosyjski w Legionowie i online. Zajęcia 1:1 i w mini-grupach, nauka alfabetu, konwersacje i praktyczne słownictwo.",
  kicker: "Rosyjski",
  h1: "Rosyjski w Legionowie – lekcje i kursy",
  intro: [
    "Rosyjski wymaga oswojenia z alfabetem i brzmieniem, ale dzięki dobremu planowi możesz szybko zacząć mówić. Pracujemy nad słownictwem, rozumieniem i praktycznymi dialogami.",
    "Zajęcia prowadzimy stacjonarnie w Legionowie oraz online. Uczymy od podstaw, ale wspieramy także osoby, które chcą wrócić do języka lub potrzebują go w pracy.",
  ],
  highlights: [
    "Nauka alfabetu i wymowy od podstaw",
    "Zajęcia stacjonarne i online",
    "Indywidualnie lub w mini-grupie",
    "Nacisk na rozmowy i praktyczne słownictwo",
  ],
  pricingNote: "Ceny zależą od formatu zajęć. Szczegóły w cenniku.",
  audienceTitle: "Dla kogo jest rosyjski?",
  audienceIntro:
    "Zajęcia dopasowujemy do poziomu i celu, niezależnie od wieku.",
  audience: [
    {
      label: "Uczniowie",
      description:
        "Wsparcie w szkole, nauka alfabetu i podstawowych struktur.",
    },
    {
      label: "Dorośli",
      description:
        "Konwersacje, język do pracy oraz praktyczna komunikacja.",
    },
    {
      label: "Osoby wracające do rosyjskiego",
      description:
        "Odświeżenie gramatyki i uporządkowanie słownictwa.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Pomagamy w osiągnięciu konkretnych celów – od opanowania alfabetu po swobodną rozmowę.",
  goals: [
    "Nauka alfabetu i poprawnej wymowy.",
    "Swobodne rozmowy w codziennych sytuacjach.",
    "Rozumienie tekstów i materiałów audio.",
    "Słownictwo branżowe potrzebne w pracy.",
    "Poprawa ocen i przygotowanie do egzaminów.",
    "Systematyczne utrwalenie gramatyki.",
  ],
  outcomes: [
    "Pewność w czytaniu i pisaniu cyrylicą.",
    "Lepsze rozumienie ze słuchu.",
    "Płynniejsze mówienie i mniejszy stres w rozmowach.",
    "Materiały do samodzielnej powtórki.",
    "Regularny plan nauki i jasne cele.",
    "Stały feedback po zajęciach.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Zajęcia mogą być indywidualne lub w mini-grupach. Dobieramy częstotliwość i długość spotkań.",
  formats: [
    {
      title: "Lekcje 1:1",
      text: "Najbardziej elastyczny format i szybkie tempo postępów.",
    },
    {
      title: "Mini-grupa 2–3 osoby",
      text: "Wspólna motywacja i więcej czasu na mówienie.",
    },
    {
      title: "Kursy grupowe",
      text: "Regularny harmonogram i stały program nauki.",
    },
  ],
  organization: [
    "Diagnoza poziomu i określenie celu.",
    "Nauka alfabetu i wymowy od podstaw.",
    "Praktyczne dialogi i słownictwo tematyczne.",
    "Materiały do powtórek między spotkaniami.",
  ],
  materialsIntro:
    "Materiały dobieramy do poziomu – od nauki cyrylicy po dialogi i ćwiczenia słuchania.",
  materials: [
    "Ćwiczenia czytania i pisania cyrylicą.",
    "Dialogi sytuacyjne i scenki.",
    "Słownictwo tematyczne i branżowe.",
    "Zadania utrwalające po lekcji.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia z rosyjskiego?",
  lessonPlanIntro:
    "Zajęcia mają stałą strukturę, dzięki której łatwo utrwalić nowe słownictwo i gramatykę.",
  lessonPlan: [
    "Rozgrzewka i powtórka materiału.",
    "Nauka nowych słów i zwrotów.",
    "Ćwiczenia wymowy i słuchania.",
    "Dialogi w praktycznych sytuacjach.",
    "Podsumowanie i zadanie do utrwalenia.",
  ],
  feedbackIntro:
    "Po zajęciach otrzymujesz wskazówki i krótkie podsumowanie najważniejszych elementów.",
  feedback: [
    "Korekta wymowy i zapisów cyrylicą.",
    "Lista słówek do powtórzenia.",
    "Ćwiczenia utrwalające do samodzielnej pracy.",
    "Informacja o postępach i kolejnych krokach.",
  ],
  faqs: [
    {
      question: "Czy mogę zacząć rosyjski od zera?",
      answer:
        "Tak. Zaczynamy od alfabetu i podstawowych zwrotów, krok po kroku.",
    },
    {
      question: "Czy uczcie cyrylicy?",
      answer:
        "Tak. Cyrylica jest ważnym elementem zajęć na poziomie podstawowym.",
    },
    {
      question: "Czy są zajęcia online?",
      answer:
        "Tak, prowadzimy lekcje online z wykorzystaniem wspólnych materiałów.",
    },
    {
      question: "Czy przygotowujecie do egzaminów?",
      answer:
        "Tak. Pomagamy w przygotowaniach szkolnych i egzaminacyjnych.",
    },
    {
      question: "Jak często odbywają się zajęcia?",
      answer:
        "Najczęściej 1–2 razy w tygodniu. Harmonogram ustalamy indywidualnie.",
    },
    {
      question: "Czy dostanę materiały do nauki?",
      answer:
        "Tak. Otrzymujesz materiały do powtórek i zadania utrwalające.",
    },
  ],
  cta: {
    title: "Chcesz zacząć rosyjski od podstaw?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Pokażemy, jak wygląda plan nauki i co daje regularna praktyka.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const szwedzki: SubjectPageData = {
  slug: "szwedzki",
  title: "Szwedzki w Legionowie – lekcje i kursy od podstaw",
  description:
    "Szwedzki w Legionowie i online. Zajęcia 1:1 i w mini-grupach, nauka od podstaw, konwersacje i przygotowanie do pracy za granicą.",
  kicker: "Szwedzki",
  h1: "Szwedzki w Legionowie – lekcje od podstaw",
  intro: [
    "Szwedzki to język, który otwiera drzwi do pracy i życia w Skandynawii. Uczymy od podstaw, z naciskiem na wymowę, słownictwo i rozmowy, które przydają się w praktyce.",
    "Zajęcia prowadzimy stacjonarnie w Legionowie oraz online. Dopasowujemy plan do poziomu i celu: wyjazd, praca, studia lub zwykła pasja do języka.",
  ],
  highlights: [
    "Start od podstaw i oswajanie wymowy",
    "Zajęcia stacjonarne i online",
    "Indywidualnie lub w mini-grupie",
    "Słownictwo do pracy i codziennych sytuacji",
  ],
  pricingNote: "Ceny zależą od formatu zajęć. Szczegóły znajdziesz w cenniku.",
  audienceTitle: "Dla kogo jest szwedzki?",
  audienceIntro:
    "Szwedzki sprawdza się zarówno u osób zaczynających od zera, jak i tych, które chcą wrócić do języka.",
  audience: [
    {
      label: "Osoby planujące wyjazd",
      description:
        "Praktyczne słownictwo do pracy i życia codziennego w Szwecji.",
    },
    {
      label: "Dorośli",
      description:
        "Nauka od podstaw, konwersacje i uporządkowana gramatyka.",
    },
    {
      label: "Osoby uczące się hobbystycznie",
      description:
        "Spokojne tempo i regularny kontakt z językiem.",
    },
  ],
  goalsTitle: "Cele i efekty nauki",
  goalsIntro:
    "Ustalamy cele, które pomagają w pracy i codziennych sytuacjach.",
  goals: [
    "Podstawowa komunikacja w pracy i urzędach.",
    "Rozumienie prostych rozmów i instrukcji.",
    "Poprawna wymowa i osłuchanie z językiem.",
    "Słownictwo tematyczne do życia w Szwecji.",
    "Systematyczne utrwalenie gramatyki.",
    "Regularny plan nauki dopasowany do grafiku.",
  ],
  outcomes: [
    "Większa pewność w mówieniu i czytaniu.",
    "Praktyczne zwroty do codziennych sytuacji.",
    "Stały postęp dzięki regularnym spotkaniom.",
    "Materiały do powtórek między zajęciami.",
    "Feedback po każdej lekcji.",
    "Lepiej uporządkowana gramatyka.",
  ],
  formatTitle: "Format zajęć i organizacja",
  formatIntro:
    "Dobieramy format do celu i dostępności. Zajęcia mogą być indywidualne lub w mini-grupach.",
  formats: [
    {
      title: "Lekcje 1:1",
      text: "Największa elastyczność i możliwość szybkiego postępu.",
    },
    {
      title: "Mini-grupa 2–3 osoby",
      text: "Wspólna motywacja i spokojne tempo pracy.",
    },
    {
      title: "Kursy grupowe",
      text: "Stały program i regularne spotkania w jednej grupie.",
    },
  ],
  organization: [
    "Diagnoza poziomu i określenie celu wyjazdowego lub zawodowego.",
    "Nauka wymowy i słownictwa od podstaw.",
    "Praktyczne dialogi i ćwiczenia słuchania.",
    "Materiały do utrwalenia po spotkaniach.",
  ],
  materialsIntro:
    "Materiały dopasowujemy do poziomu i tempa, abyś mógł ćwiczyć także między spotkaniami.",
  materials: [
    "Ćwiczenia wymowy i osłuchania z językiem.",
    "Dialogi w praktycznych sytuacjach.",
    "Słownictwo tematyczne do pracy i życia w Szwecji.",
    "Zadania do samodzielnej powtórki.",
  ],
  lessonPlanTitle: "Jak wyglądają zajęcia ze szwedzkiego?",
  lessonPlanIntro:
    "Zajęcia są uporządkowane i prowadzone w spokojnym tempie, z naciskiem na wymowę.",
  lessonPlan: [
    "Powtórka materiału i krótkie ćwiczenie słuchania.",
    "Nowe słownictwo i zwroty w prostych zdaniach.",
    "Ćwiczenia wymowy i intonacji.",
    "Dialogi w typowych sytuacjach życiowych.",
    "Podsumowanie i materiał do powtórki.",
  ],
  feedbackIntro:
    "Dostajesz jasny feedback i wskazówki, jak ćwiczyć między zajęciami.",
  feedback: [
    "Korekta wymowy i akcentu.",
    "Lista słów do utrwalenia.",
    "Ćwiczenia do samodzielnej pracy.",
    "Plan kolejnych tematów.",
  ],
  faqs: [
    {
      question: "Czy mogę zacząć szwedzki od zera?",
      answer:
        "Tak. Zaczynamy od podstaw i stopniowo zwiększamy poziom.",
    },
    {
      question: "Czy zajęcia odbywają się online?",
      answer:
        "Tak. Prowadzimy lekcje online z pełnym wsparciem lektora.",
    },
    {
      question: "Czy pomagacie w przygotowaniu do pracy w Szwecji?",
      answer:
        "Tak. Pracujemy na słownictwie i sytuacjach przydatnych w pracy i życiu codziennym.",
    },
    {
      question: "Jak często odbywają się zajęcia?",
      answer:
        "Najczęściej 1–2 razy w tygodniu. Harmonogram ustalamy indywidualnie.",
    },
    {
      question: "Czy dostanę materiały do nauki?",
      answer:
        "Tak. Otrzymujesz materiały do powtórek i ćwiczenia utrwalające.",
    },
    {
      question: "Czy mogę uczyć się w mini-grupie?",
      answer:
        "Tak. Tworzymy mini-grupy na podobnym poziomie, aby każdy miał czas na mówienie.",
    },
  ],
  cta: {
    title: "Chcesz zacząć szwedzki pewnie i spokojnie?",
    description:
      "Umów bezpłatną konsultację i diagnozę poziomu. Dobierzemy plan nauki dopasowany do Twojego celu.",
    note: "Odpowiadamy szybko — zwykle w ciągu 1–2 dni roboczych.",
  },
};

export const subjectPages: Record<string, SubjectPageData> = {
  matematyka,
  hiszpanski,
  niemiecki,
  francuski,
  rosyjski,
  szwedzki,
};
