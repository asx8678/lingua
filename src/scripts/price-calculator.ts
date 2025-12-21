// Price Calculator Logic
// This module handles all the price calculation functionality

import type { PRICING_DATA } from "../data/pricing";

type PricingData = typeof PRICING_DATA;
type Plan =
  | {
      kind: "package";
      id: string;
      label: string;
      minutes: number;
      baseSessions: number;
      pricePerPerson: Record<number, number>;
    }
  | {
      kind: "course";
      id: string;
      label: string;
      price: number;
      sessions: number;
      minutes: number;
      minPersons: number;
    };

const fmt = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
const pln = (v: number): string => `${fmt.format(Math.round(v))} zł`;

function setText(el: HTMLElement | null, txt: string): void {
  if (el) el.textContent = txt;
}

function getPlan(data: PricingData, id: string): Plan | null {
  const p = data.packages.find((x) => x.id === id);
  if (p) return { kind: "package", ...p };
  const c = data.courses.find((x) => x.id === id);
  if (c) return { kind: "course", ...c };
  return null;
}

export function initPriceCalculator(data: PricingData): void {
  const form = document.getElementById("price-calc");
  const planEl = document.getElementById("plan") as HTMLSelectElement | null;
  const planButtons = form?.querySelectorAll<HTMLButtonElement>("[data-plan]") ?? [];
  const stepButtons = form?.querySelectorAll<HTMLButtonElement>("[data-target][data-step]") ?? [];
  const sessionStepButtons =
    form?.querySelectorAll<HTMLButtonElement>('[data-target="sessions"]') ?? [];
  const presetButtons =
    form?.querySelectorAll<HTMLButtonElement>("[data-preset][data-value]") ?? [];
  const sessionPresetButtons =
    form?.querySelectorAll<HTMLButtonElement>('[data-preset="sessions"]') ?? [];
  const personsPresetButtons =
    form?.querySelectorAll<HTMLButtonElement>('[data-preset="persons"]') ?? [];
  const personsEl = document.getElementById("persons") as HTMLInputElement | null;
  const sessionsEl = document.getElementById("sessions") as HTMLInputElement | null;
  const showTotalEl = document.getElementById("show-total") as HTMLInputElement | null;

  const personsHintEl = document.getElementById("persons-hint");
  const sessionsHintEl = document.getElementById("sessions-hint");

  const outPerSessionEl = document.getElementById("out-per-session");
  const outPerSessionSubEl = document.getElementById("out-per-session-sub");
  const outPerTotalEl = document.getElementById("out-per-total");
  const outPerTotalSubEl = document.getElementById("out-per-total-sub");
  const totalBlockEl = document.getElementById("total-block");
  const outTotalEl = document.getElementById("out-total");
  const outTotalSubEl = document.getElementById("out-total-sub");
  const outNoteEl = document.getElementById("out-note");

  if (!planEl || !personsEl || !sessionsEl) return;

  let lastPlanId = planEl.value;

  function setActivePlan(id: string): void {
    if (!planEl) return;
    planEl.value = id;
    planButtons.forEach((btn) => {
      const isActive = btn.dataset.plan === id;
      btn.classList.toggle("btn-primary", isActive);
      btn.classList.toggle("btn-secondary", !isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setPresetActive(target: string, value: number): void {
    presetButtons.forEach((btn) => {
      if (btn.dataset.preset !== target) return;
      const isActive = Number(btn.dataset.value) === value;
      btn.classList.toggle("bg-primary/10", isActive);
      btn.classList.toggle("border-primary/40", isActive);
      btn.classList.toggle("text-primary", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setPersonsPresetState(min: number, max: number): void {
    personsPresetButtons.forEach((btn) => {
      const value = Number(btn.dataset.value);
      const disabled = value < min || value > max;
      btn.toggleAttribute("disabled", disabled);
      btn.classList.toggle("opacity-50", disabled);
      btn.classList.toggle("cursor-not-allowed", disabled);
    });
  }

  function update(): void {
    const plan = getPlan(data, planEl!.value);
    if (!plan) return;

    setActivePlan(plan.id);
    const planChanged = plan.id !== lastPlanId;
    lastPlanId = plan.id;

    const personsMin = plan.kind === "course" ? plan.minPersons : 1;
    const personsMax = plan.kind === "course" ? 10 : 3;
    personsEl!.setAttribute("min", String(personsMin));
    personsEl!.setAttribute("max", String(personsMax));
    const personsInput = Number(personsEl!.value || personsMin);
    const persons = Math.max(personsMin, Math.min(personsMax, personsInput));
    personsEl!.value = String(persons);
    setPresetActive("persons", persons);
    setPersonsPresetState(personsMin, personsMax);

    const showTotal = Boolean(showTotalEl?.checked ?? true);
    totalBlockEl?.classList.toggle("hidden", !showTotal);

    // Reset output
    setText(personsHintEl, "");
    setText(sessionsHintEl, "");
    setText(outPerSessionEl, "—");
    setText(outPerSessionSubEl, "");
    setText(outPerTotalEl, "—");
    setText(outPerTotalSubEl, "");
    setText(outTotalEl, "—");
    setText(outTotalSubEl, "");
    setText(outNoteEl, "");

    if (plan.kind === "course") {
      const sessions = plan.sessions;
      sessionsEl!.value = String(sessions);
      sessionsEl!.setAttribute("disabled", "disabled");
      sessionsEl!.classList.add("bg-slate-100");
      sessionStepButtons.forEach((btn) => {
        btn.setAttribute("disabled", "disabled");
        btn.classList.add("opacity-50", "cursor-not-allowed");
      });
      sessionPresetButtons.forEach((btn) => {
        btn.setAttribute("disabled", "disabled");
        btn.classList.add("opacity-50", "cursor-not-allowed");
      });
      setPresetActive("sessions", sessions);

      const perPersonTotal = plan.price;
      const perSession = perPersonTotal / plan.sessions;
      const groupTotal = perPersonTotal * persons;

      setText(outPerSessionEl, pln(perSession));
      setText(outPerSessionSubEl, `${plan.minutes} min`);
      setText(outPerTotalEl, pln(perPersonTotal));
      setText(outPerTotalSubEl, `cena z cennika / osoba`);

      if (showTotal) {
        setText(outTotalEl, pln(groupTotal));
        setText(outTotalSubEl, `${sessions} spotkań`);
      }

      const warn = persons < plan.minPersons;
      setText(
        outNoteEl,
        warn
          ? `Ten kurs jest w cenniku „od ${plan.minPersons} osób". Wybrałeś(aś) ${persons} — wynik traktuj orientacyjnie.`
          : `Kurs: ${plan.sessions} spotkań × ${plan.minutes} min. Wymagana grupa: od ${plan.minPersons} osób.`
      );

      setText(personsHintEl, `Kurs: od ${plan.minPersons} osób`);
      setText(sessionsHintEl, `Kurs: ${plan.sessions} spotkań`);
      return;
    }

    // Package logic
    sessionsEl!.removeAttribute("disabled");
    sessionsEl!.classList.remove("bg-slate-100");
    sessionStepButtons.forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.classList.remove("opacity-50", "cursor-not-allowed");
    });
    sessionPresetButtons.forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.classList.remove("opacity-50", "cursor-not-allowed");
    });

    if (planChanged) {
      sessionsEl!.value = String(plan.baseSessions);
    }
    const sessions = Math.max(1, Math.min(100, Number(sessionsEl!.value || plan.baseSessions)));
    sessionsEl!.value = String(sessions);
    setPresetActive("sessions", sessions);

    const price10 = plan.pricePerPerson[persons] ?? plan.pricePerPerson[1];
    const perSession = price10 / plan.baseSessions;
    const perPersonTotal = perSession * sessions;
    const groupTotal = perPersonTotal * persons;

    const isMultiple = sessions % plan.baseSessions === 0;
    if (!isMultiple) {
      setText(sessionsHintEl, "Wyliczenie orientacyjne (proporcjonalnie do pakietu 10 spotkań).");
    } else {
      setText(
        sessionsHintEl,
        `Pakiet: ${sessions / plan.baseSessions} × ${plan.baseSessions} spotkań`
      );
    }

    setText(outPerSessionEl, pln(perSession));
    setText(outPerSessionSubEl, `${plan.minutes} min`);
    setText(outPerTotalEl, pln(perPersonTotal));
    setText(outPerTotalSubEl, `${sessions} spotkań`);

    if (showTotal) {
      setText(outTotalEl, pln(groupTotal));
      setText(outTotalSubEl, `${persons} os.`);
    }

    setText(
      outNoteEl,
      `Pakiet ${plan.baseSessions} spotkań × ${plan.minutes} min: ${pln(price10)} / osoba (wg cennika).`
    );
    setText(personsHintEl, "Pakiety: 1–3 osoby");
  }

  // Event listeners
  planButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActivePlan(btn.dataset.plan!);
      update();
    });
  });

  stepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target === "sessions" ? sessionsEl! : personsEl!;
      const step = Number(btn.dataset.step || 0);
      const min = Number(target.min || 1);
      const max = Number(target.max || 100);
      const next = Math.max(min, Math.min(max, Number(target.value || 0) + step));
      target.value = String(next);
      update();
    });
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.hasAttribute("disabled")) return;
      const target = btn.dataset.preset === "sessions" ? sessionsEl! : personsEl!;
      const value = Number(btn.dataset.value || 0);
      if (!Number.isFinite(value)) return;
      target.value = String(value);
      update();
    });
  });

  form?.addEventListener("input", update);
  planEl.addEventListener("change", update);
  showTotalEl?.addEventListener("change", update);

  // Initialize
  setActivePlan(planEl.value);
  update();
}
