import { useCallback, useEffect, useMemo, useState } from "react";
import { AGENDA_EVENTS, type AgendaEvent } from "@/data/agenda";

// De database-client pas laden wanneer hij nodig is, zodat hij de eerste weergave niet vertraagt.
const getSupabase = () => import("@/integrations/supabase/client").then((m) => m.supabase);

const TABLE = "agenda_items";

type AgendaRow = {
  id: string;
  image_data: string;
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function fallbackEvents(): AgendaEvent[] {
  return AGENDA_EVENTS.map((event) => ({ ...event }));
}

// Eén gedeelde ophaalactie voor alle onderdelen die het programma tonen.
let cache: AgendaEvent[] | null = null;
let inflight: Promise<AgendaEvent[]> | null = null;

function loadEventsShared(force = false): Promise<AgendaEvent[]> {
  if (!force && cache) return Promise.resolve(cache);
  if (!force && inflight) return inflight;
  inflight = loadEvents().then((events) => {
    cache = events;
    inflight = null;
    return events;
  });
  return inflight;
}

async function loadEvents(): Promise<AgendaEvent[]> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id,image_data")
    .order("created_at", { ascending: true });

  if (error) {
    console.warn("Programma laden mislukt", error);
    return fallbackEvents();
  }

  const rows = (data ?? []) as AgendaRow[];
  if (rows.length === 0) return fallbackEvents();

  return rows.map((row) => ({
    id: row.id,
    image: row.image_data,
  }));
}

export function useAgendaStore() {
  const [events, setEvents] = useState<AgendaEvent[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (force = false) => {
    if (force || cache === null) setLoading(true);
    const nextEvents = await loadEventsShared(force);
    setEvents(nextEvents);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    listeners.add(refresh);

    return () => {
      listeners.delete(refresh);
    };
  }, [refresh]);

  const replaceEvents = useCallback(async (images: string[]) => {
    setSaving(true);
    setError(null);

    const supabase = await getSupabase();
    const { data, error: functionError } = await supabase.functions.invoke("agenda-admin", {
      body: { code: "2468", images },
    });

    if (functionError) {
      setError("Opslaan is niet gelukt. Probeer het opnieuw.");
      setSaving(false);
      return false;
    }

    const response = data as { events?: AgendaRow[]; error?: string } | null;
    if (response?.error || !response?.events) {
      setError("Opslaan is niet gelukt. Probeer het opnieuw.");
      setSaving(false);
      return false;
    }

    const nextEvents = response.events.map((row) => ({ id: row.id, image: row.image_data }));
    cache = nextEvents;
    setEvents(nextEvents);
    setSaving(false);
    notify();
    return true;
  }, []);

  return useMemo(
    () => ({ events, loading, saving, error, refresh, replaceEvents }),
    [events, loading, saving, error, refresh, replaceEvents],
  );
}

export async function fileToImage(file: File, maxWidth = 1600): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("read"));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("img"));
    image.src = dataUrl;
  });

  if (img.width <= maxWidth) return dataUrl;

  const scale = maxWidth / img.width;
  const canvas = document.createElement("canvas");
  canvas.width = maxWidth;
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.88);
}
