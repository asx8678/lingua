// MailChannels Email Service for Cloudflare Workers
// Free email sending via MailChannels API
// Docs: https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/

export type MailChannelsPayload = {
  to: string;
  toName?: string;
  from: string;
  fromName?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type MailChannelsConfig = {
  dkimDomain?: string;
  dkimSelector?: string;
  dkimPrivateKey?: string;
};

export type MailChannelsResult = {
  success: boolean;
  error?: string;
};

/**
 * Send email using MailChannels API (free for Cloudflare Workers)
 */
export async function sendMailChannels(
  payload: MailChannelsPayload,
  config?: MailChannelsConfig
): Promise<MailChannelsResult> {
  const content: Array<{ type: string; value: string }> = [
    { type: "text/plain", value: payload.text },
  ];

  if (payload.html) {
    content.push({ type: "text/html", value: payload.html });
  }

  // Build the request body
  const body: Record<string, unknown> = {
    personalizations: [
      {
        to: [{ email: payload.to, name: payload.toName }],
        ...(config?.dkimDomain &&
          config?.dkimSelector &&
          config?.dkimPrivateKey && {
            dkim_domain: config.dkimDomain,
            dkim_selector: config.dkimSelector,
            dkim_private_key: config.dkimPrivateKey,
          }),
      },
    ],
    from: {
      email: payload.from,
      name: payload.fromName,
    },
    subject: payload.subject,
    content,
  };

  // Add reply-to if provided
  if (payload.replyTo) {
    body.reply_to = { email: payload.replyTo };
  }

  try {
    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // MailChannels returns 202 on success
    if (response.status === 202 || response.ok) {
      return { success: true };
    }

    // Try to get error details
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}`;

    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.errors && Array.isArray(errorJson.errors)) {
        errorMessage = errorJson.errors.map((e: { message?: string }) => e.message).join(", ");
      }
    } catch {
      if (errorText) {
        errorMessage = errorText.slice(0, 200);
      }
    }

    return { success: false, error: errorMessage };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Format contact form data and send via MailChannels
 */
export async function sendContactEmail(
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
    dkimDomain?: string;
    dkimSelector?: string;
    dkimPrivateKey?: string;
  }
): Promise<MailChannelsResult> {
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

  return sendMailChannels(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    {
      dkimDomain: config.dkimDomain,
      dkimSelector: config.dkimSelector,
      dkimPrivateKey: config.dkimPrivateKey,
    }
  );
}

/**
 * Format signup form data and send via MailChannels
 */
export async function sendSignupEmail(
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
    dkimDomain?: string;
    dkimSelector?: string;
    dkimPrivateKey?: string;
  }
): Promise<MailChannelsResult> {
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

  return sendMailChannels(
    {
      to: config.toEmail,
      from: config.fromEmail,
      fromName: config.brandName,
      subject,
      text,
      html,
      replyTo: data.email,
    },
    {
      dkimDomain: config.dkimDomain,
      dkimSelector: config.dkimSelector,
      dkimPrivateKey: config.dkimPrivateKey,
    }
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
