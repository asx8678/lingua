import type { APIRoute } from "astro";

const SUPPORTED_LANGUAGES = [
  "hiszpański",
  "angielski",
  "włoski",
  "francuski",
  "niemiecki",
  "szwedzki",
  "rosyjski",
] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "Endpoint zapisy (demo). Użyj metody POST.",
      supportedLanguages: SUPPORTED_LANGUAGES,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";

  let payload: Record<string, string> = {};

  try {
    if (contentType.includes("application/json")) {
      const data = (await request.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(data)) payload[k] = String(v ?? "");
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) payload[k] = String(v ?? "");
    }
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Nieprawidłowe dane wejściowe." }),
      { status: 400, headers: { "content-type": "application/json; charset=utf-8" } }
    );
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const language = (payload.language ?? "").trim();
  const mode = (payload.mode ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name) {
    return new Response(JSON.stringify({ ok: false, error: "Pole „Imię i nazwisko” jest wymagane." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ ok: false, error: "Podaj poprawny adres e-mail." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (!isSupportedLanguage(language)) {
    return new Response(JSON.stringify({ ok: false, error: "Wybierz język z listy." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (!mode) {
    return new Response(JSON.stringify({ ok: false, error: "Wybierz rodzaj zajęć." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  // NOTE: This is a demo endpoint.
  // In production you can:
  // - send an email (e.g. via an email API),
  // - store the submission in a database/KV/D1,
  // - add anti-spam protection (captcha, rate-limits).
  const receivedAt = new Date().toISOString();

  return new Response(
    JSON.stringify({
      ok: true,
      receivedAt,
      data: { name, email, phone, language, mode, message },
    }),
    { status: 200, headers: { "content-type": "application/json; charset=utf-8" } }
  );
};
