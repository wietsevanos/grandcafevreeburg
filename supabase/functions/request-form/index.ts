const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const MAIL_FROM = "Grand Café Vreeburg <aanvragen@pcicaritasboaz.nl>";
const MAIL_TO = "info@grandcafevreeburg.nl";

const KIND_LABEL: Record<string, string> = {
  vieren: "Iets te vieren",
  zakelijk: "Zakelijke bijeenkomst",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function str(value: unknown, { max = 2000 }: { max?: number } = {}): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const kind = payload.kind === "vieren" || payload.kind === "zakelijk" ? payload.kind : null;
  const naam = str(payload.naam, { max: 120 });
  const email = str(payload.email, { max: 200 });
  const telefoon = str(payload.telefoon, { max: 40 });
  const datum = str(payload.datum, { max: 10 });
  const bericht = str(payload.bericht, { max: 3000 });
  const personen =
    typeof payload.personen === "number" && Number.isInteger(payload.personen) && payload.personen >= 1 && payload.personen <= 500
      ? payload.personen
      : null;

  const emailValid = email !== null && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const datumValid = datum !== null && /^\d{4}-\d{2}-\d{2}$/.test(datum) && !Number.isNaN(Date.parse(datum));

  if (!kind || !naam || !emailValid || !datumValid || personen === null) {
    return json({ error: "invalid_input" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json({ error: "server_not_configured" }, 500);
  }

  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  const client = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const row = { kind, naam, email, telefoon, datum, personen, bericht };
  const { data, error: insertError } = await client
    .from("aanvragen")
    .insert(row)
    .select("id")
    .single();

  if (insertError || !data) {
    console.error("aanvraag insert failed", insertError);
    return json({ error: "opslaan_mislukt" }, 500);
  }

  // Notify the owner via Resend.
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!lovableKey || !resendKey) {
    console.error("email credentials missing");
    return json({ ok: true, id: data.id, email: "not_configured" });
  }

  const label = KIND_LABEL[kind];
  const rowsForMail: Array<[string, string]> = [
    ["Soort aanvraag", label],
    ["Naam", naam],
    ["E-mailadres", email],
    ["Telefoonnummer", telefoon ?? "—"],
    ["Gewenste datum", datum],
    ["Aantal personen", String(personen)],
    ["Bericht", bericht ?? "—"],
  ];

  const html = `
  <div style="font-family: Georgia, serif; background:#f6f3ec; padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e1d5;border-radius:12px;padding:32px;">
      <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8a8577;margin:0 0 8px;">Grand Café Vreeburg</p>
      <h1 style="font-size:22px;color:#3b352c;margin:0 0 20px;">Nieuwe aanvraag: ${escapeHtml(label)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3b352c;">
        ${rowsForMail
          .map(
            ([label, value]) =>
              `<tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee7d9;width:40%;color:#8a8577;">${escapeHtml(label)}</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee7d9;">${escapeHtml(value)}</td>
              </tr>`
          )
          .join("")}
      </table>
      <p style="font-size:12px;color:#8a8577;margin:24px 0 0;">Deze aanvraag is ook opgeslagen in de database van de website.</p>
    </div>
  </div>`;

  const mailResponse = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [MAIL_TO],
      reply_to: email,
      subject: `Nieuwe aanvraag — ${label} (${naam})`,
      html,
    }),
  });

  if (!mailResponse.ok) {
    const errorBody = await mailResponse.text();
    console.error(`resend failed [${mailResponse.status}]: ${errorBody}`);
    return json({ ok: true, id: data.id, email: "versturen_mislukt", status: mailResponse.status });
  }

  return json({ ok: true, id: data.id, email: "verzonden" });
});
