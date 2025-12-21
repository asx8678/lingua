import type { APIRoute } from "astro";
import { BRAND_NAME, CONTACT_EMAIL } from "../../config/site";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimit = new Map<string, { count: number; timestamp: number }>();

const getClientIp = (request: Request) =>
  request.headers.get("CF-Connecting-IP") ??
  request.headers.get("x-forwarded-for") ??
  "unknown";

const shouldRateLimit = (ip: string, now: number) => {
  const entry = rateLimit.get(ip) ?? { count: 0, timestamp: now };
  if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }
  entry.count += 1;
  rateLimit.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
};

export const POST: APIRoute = async ({ request }) => {
  if (!CONTACT_EMAIL) {
    return new Response("Kontakt e-mail nie jest skonfigurowany.", {
      status: 500,
    });
  }

  const now = Date.now();
  const ip = getClientIp(request);
  if (shouldRateLimit(ip, now)) {
    return new Response("Zbyt wiele prób. Spróbuj ponownie później.", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  const formData = await request.formData();
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return new Response("OK", { status: 204 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const subject = `Zapytanie z formularza — ${BRAND_NAME}`;
  const bodyLines = [
    `Imię i nazwisko: ${name || "-"}`,
    `E-mail: ${email || "-"}`,
    `Telefon: ${phone || "-"}`,
    "",
    "Wiadomość:",
    message || "-",
  ];
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

  return new Response(null, {
    status: 303,
    headers: { Location: mailto },
  });
};
