import type { PRICING_DATA } from "../data/pricing";

type PricingData = typeof PRICING_DATA;

const formatter = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
const formatPLN = (value: number): string => `${formatter.format(Math.round(value))} zł`;

const setText = (el: HTMLElement | null, value: string): void => {
  if (el) el.textContent = value;
};

export function initMonthlyCalculator(data: PricingData): void {
  const form = document.getElementById("monthly-calc") as HTMLFormElement | null;
  const durationEl = document.getElementById("monthly-duration") as HTMLSelectElement | null;
  const lessonsEl = document.getElementById("monthly-lessons") as HTMLSelectElement | null;
  const personsEl = document.getElementById("monthly-persons") as HTMLSelectElement | null;

  const perSessionEl = document.getElementById("monthly-per-session");
  const perPersonEl = document.getElementById("monthly-per-person");
  const totalEl = document.getElementById("monthly-total");

  if (!form || !durationEl || !lessonsEl || !personsEl) return;

  const durations = Array.from(
    new Set(data.packages.map((plan) => plan.minutes))
  ).sort((a, b) => a - b);
  const personsOptions = Array.from(
    new Set(
      data.packages.flatMap((plan) =>
        Object.keys(plan.pricePerPerson).map((value) => Number(value))
      )
    )
  ).sort((a, b) => a - b);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const update = () => {
    const durationValue = Number(durationEl.value || durations[0]);
    const plan = data.packages.find((item) => item.minutes === durationValue) ?? data.packages[0];

    const personsMin = personsOptions[0] ?? 1;
    const personsMax = personsOptions[personsOptions.length - 1] ?? 3;
    const persons = clamp(Number(personsEl.value || personsMin), personsMin, personsMax);
    personsEl.value = String(persons);

    const lessons = clamp(Number(lessonsEl.value || 1), 1, 7);
    lessonsEl.value = String(lessons);

    const price10 = plan.pricePerPerson[persons] ?? plan.pricePerPerson[personsMin];
    const perSession = price10 / plan.baseSessions;
    const perMonthPerPerson = perSession * lessons * 4;
    const perMonthTotal = perMonthPerPerson * persons;

    setText(perSessionEl, formatPLN(perSession));
    setText(perPersonEl, formatPLN(perMonthPerPerson));
    setText(totalEl, formatPLN(perMonthTotal));
  };

  form.addEventListener("change", update);
  form.addEventListener("input", update);
  update();
}
