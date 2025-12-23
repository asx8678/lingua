// SparkPost Email Service (EU)
// Docs: https://developers.sparkpost.com/api/transmissions/

export type SparkPostPayload = {
  to: string;
  toName?: string;
  from: string;
  fromName?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SparkPostResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

/**
 * Send email using SparkPost EU API
 */
export async function sendSparkPost(
  payload: SparkPostPayload,
  apiKey: string
): Promise<SparkPostResult> {
  const transmission = {
    recipients: [
      {
        address: {
          email: payload.to,
          name: payload.toName || undefined,
        },
      },
    ],
    content: {
      from: {
        email: payload.from,
        name: payload.fromName || undefined,
      },
      subject: payload.subject,
      text: payload.text,
      html: payload.html || undefined,
      reply_to: payload.replyTo || undefined,
    },
  };

  try {
    const response = await fetch("https://api.eu.sparkpost.com/api/v1/transmissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(transmission),
    });

    const data = (await response.json()) as {
      results?: { id?: string; total_accepted_recipients?: number };
      errors?: Array<{ message: string; code?: string }>;
    };

    if (response.ok && data.results?.total_accepted_recipients) {
      return {
        success: true,
        messageId: data.results.id || "",
      };
    }

    const errorMessage = data.errors?.[0]?.message || `HTTP ${response.status}`;
    return { success: false, error: errorMessage };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Format contact form data and send via SparkPost
 */
export async function sendContactEmailSparkPost(
  data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  },
  config: {
    toEmail: string;
    fromEmail: string;
    brandName: string;
    apiKey: string;
  }
): Promise<SparkPostResult> {
  const subject = `Zapytanie z formularza — ${config.brandName}`;

  const text = [
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || "-"}`,
    "",
    "Wiadomość:",
    data.message,
  ].join("\n");

  const html = `
    <h2>Nowe zapytanie z formularza kontaktowego</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Imię i nazwisko:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : "-"}</td>
      </tr>
    </table>
    <h3 style="margin-top: 24px;">Wiadomość:</h3>
    <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  `.trim();

  return sendSparkPost(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    config.apiKey
  );
}

/**
 * Format signup form data and send via SparkPost
 */
export async function sendSignupEmailSparkPost(
  data: {
    name: string;
    email: string;
    phone?: string;
    mode: string;
    level: string;
    availability?: string;
    message?: string;
  },
  config: {
    toEmail: string;
    fromEmail: string;
    brandName: string;
    apiKey: string;
  }
): Promise<SparkPostResult> {
  const subject = `Zapis na zajęcia 2025/2026 — ${config.brandName}`;

  const modeLabels: Record<string, string> = {
    stacjonarnie: "Stacjonarnie (Legionowo)",
    online: "Online",
    inne: "Inne języki / matematyka",
  };

  const text = [
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || "-"}`,
    `Tryb: ${modeLabels[data.mode] || data.mode}`,
    `Poziom/cel: ${data.level}`,
    `Dostępność: ${data.availability || "-"}`,
    "",
    "Dodatkowe informacje:",
    data.message || "-",
  ].join("\n");

  const html = `
    <h2>Nowy zapis na zajęcia 2025/2026</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Imię i nazwisko:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : "-"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Tryb:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(modeLabels[data.mode] || data.mode)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Poziom/cel:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.level)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Dostępność:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.availability || "-")}</td>
      </tr>
    </table>
    <h3 style="margin-top: 24px;">Dodatkowe informacje:</h3>
    <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message || "-")}</div>
  `.trim();

  return sendSparkPost(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    config.apiKey
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
