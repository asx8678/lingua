// Mailjet Email Service
// Docs: https://dev.mailjet.com/email/guides/send-api-v31/

export type MailjetPayload = {
  to: string;
  toName?: string;
  from: string;
  fromName?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type MailjetResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

/**
 * Send email using Mailjet API v3.1
 */
export async function sendMailjet(
  payload: MailjetPayload,
  apiKey: string,
  secretKey: string
): Promise<MailjetResult> {
  const messages = [
    {
      From: {
        Email: payload.from,
        Name: payload.fromName || undefined,
      },
      To: [
        {
          Email: payload.to,
          Name: payload.toName || undefined,
        },
      ],
      Subject: payload.subject,
      TextPart: payload.text,
      HTMLPart: payload.html || undefined,
      ReplyTo: payload.replyTo ? { Email: payload.replyTo } : undefined,
    },
  ];

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${apiKey}:${secretKey}`),
      },
      body: JSON.stringify({ Messages: messages }),
    });

    const data = await response.json() as {
      Messages?: Array<{ Status: string; To?: Array<{ MessageID: number }> }>;
      ErrorMessage?: string;
    };

    if (response.ok && data.Messages?.[0]?.Status === "success") {
      return {
        success: true,
        messageId: String(data.Messages[0].To?.[0]?.MessageID || ""),
      };
    }

    const errorMessage = data.ErrorMessage || `HTTP ${response.status}`;
    return { success: false, error: errorMessage };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Format contact form data and send via Mailjet
 */
export async function sendContactEmailMailjet(
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
    secretKey: string;
  }
): Promise<MailjetResult> {
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

  return sendMailjet(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    config.apiKey,
    config.secretKey
  );
}

/**
 * Format signup form data and send via Mailjet
 */
export async function sendSignupEmailMailjet(
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
    secretKey: string;
  }
): Promise<MailjetResult> {
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

  return sendMailjet(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    config.apiKey,
    config.secretKey
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
