import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_CODE = "2468";
const MAX_ITEMS = 30;
const MAX_IMAGE_LENGTH = 4_500_000;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function isAllowedImage(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length === 0 || value.length > MAX_IMAGE_LENGTH) return false;
  return value.startsWith("data:image/") || value.startsWith("/agenda/");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceKey) {
    return json({ error: "server_not_configured" }, 500);
  }

  let payload: { code?: string; images?: unknown[] };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  if (payload.code !== ADMIN_CODE) {
    return json({ error: "unauthorized" }, 401);
  }

  const images = payload.images ?? [];
  if (!Array.isArray(images) || images.length > MAX_ITEMS || !images.every(isAllowedImage)) {
    return json({ error: "invalid_images" }, 400);
  }

  const client = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const { error: deleteError } = await client.from("agenda_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.error("agenda delete failed", deleteError);
    return json({ error: "delete_failed" }, 500);
  }

  if (images.length === 0) {
    return json({ events: [] });
  }

  const rows = images.map((image) => ({ image_data: image }));
  const { data, error: insertError } = await client
    .from("agenda_items")
    .insert(rows)
    .select("id,image_data");

  if (insertError) {
    console.error("agenda insert failed", insertError);
    return json({ error: "insert_failed", details: insertError.message }, 500);
  }

  return json({ events: data ?? [] });
});
