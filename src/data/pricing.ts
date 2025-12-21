// Pricing data for 2025/2026
// Update this file when prices change - it's the single source of truth

export type PackagePlan = {
  id: string;
  label: string;
  minutes: number;
  baseSessions: number;
  pricePerPerson: Record<number, number>;
};

export type CoursePlan = {
  id: string;
  label: string;
  price: number;
  sessions: number;
  minutes: number;
  minPersons: number;
};

export const packages: PackagePlan[] = [
  {
    id: "pakiet-60",
    label: "Pakiet — 60 min (zajęcia indywidualne / duet / trójka)",
    minutes: 60,
    baseSessions: 10,
    pricePerPerson: { 1: 1300, 2: 800, 3: 650 },
  },
  {
    id: "pakiet-45",
    label: "Pakiet — 45 min (zajęcia indywidualne / duet / trójka)",
    minutes: 45,
    baseSessions: 10,
    pricePerPerson: { 1: 1000, 2: 600, 3: 500 },
  },
];

export const courses: CoursePlan[] = [
  {
    id: "kurs-2700",
    label: "Kurs — 30 spotkań × 90 min",
    price: 2700,
    sessions: 30,
    minutes: 90,
    minPersons: 3,
  },
  {
    id: "kurs-2800",
    label: "Kurs — 56 spotkań × 60 min",
    price: 2800,
    sessions: 56,
    minutes: 60,
    minPersons: 4,
  },
  {
    id: "kurs-4200",
    label: "Kurs — 56 spotkań × 90 min",
    price: 4200,
    sessions: 56,
    minutes: 90,
    minPersons: 4,
  },
];

export const PRICING_DATA = {
  packages,
  courses,
};

// Helper to format price in Polish zloty
export const formatPLN = (value: number): string => {
  const formatter = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
  return `${formatter.format(Math.round(value))} zł`;
};

// Summary text for display
export const PRICING_SUMMARY = {
  packages: "Pakiety 10 spotkań (cena / osoba): 60 min — 1300 zł (1), 800 zł (2), 650 zł (3). 45 min — 1000 zł (1), 600 zł (2), 500 zł (3).",
  courses: "Kursy grupowe (cena / osoba): 30×90 — 2700 zł, 56×60 — 2800 zł, 56×90 — 4200 zł.",
  note: "Matematyka ma takie same stawki jak angielski.",
};
