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

// Generate package summary from structured data
const generatePackageSummary = (): string => {
  return packages
    .map((pkg) => {
      const prices = Object.entries(pkg.pricePerPerson)
        .map(([persons, price]) => `${formatPLN(price)} (${persons})`)
        .join(", ");
      return `${pkg.minutes} min — ${prices}`;
    })
    .join(". ");
};

// Generate course summary from structured data
const generateCourseSummary = (): string => {
  return courses
    .map((course) => `${course.sessions}×${course.minutes} — ${formatPLN(course.price)}`)
    .join(", ");
};

// Summary text for display (generated from structured data)
export const PRICING_SUMMARY = {
  packages: `Pakiety ${packages[0].baseSessions} spotkań (cena / osoba): ${generatePackageSummary()}.`,
  courses: `Kursy grupowe (cena / osoba): ${generateCourseSummary()}.`,
  note: "Matematyka ma takie same stawki jak angielski.",
};

// Calculate monthly cost for a given plan
export const calculateMonthlyCost = (
  sessionsPerWeek: number,
  pricePerSession: number,
  weeksPerMonth = 4
): number => {
  return sessionsPerWeek * pricePerSession * weeksPerMonth;
};

// Get the cheapest option for each category
export const getCheapestPackagePrice = (): number => {
  return Math.min(...packages.flatMap((p) => Object.values(p.pricePerPerson)));
};

export const getCheapestCoursePrice = (): number => {
  return Math.min(...courses.map((c) => c.price));
};
