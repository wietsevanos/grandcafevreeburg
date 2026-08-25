import { useCallback, useEffect, useState } from "react";
import { AGENDA_EVENTS, type AgendaEvent } from "@/data/agenda";

const KEY = "vreeburg.agenda.v1";

type Store = {
  /** Zelf toegevoegde evenementen (flyer als data-URL) */
  custom: AgendaEvent[];
  /** Verborgen standaard-evenementen */
  hidden: string[];
};

const EMPTY: Store = { custom: [], hidden: [] };

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<Store>;
    return { custom: p.custom ?? [], hidden: p.hidden ?? [] };
  } catch {
    return EMPTY;
  }
}

const listeners = new Set<() => void>();
function write(next: Store) {
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function useAgendaStore() {
  const [store, setStore] = useState<Store>(EMPTY);

  useEffect(() => {
    const sync = () => setStore(read());
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addEvent = useCallback((ev: AgendaEvent) => {
    const s = read();
    write({ ...s, custom: [...s.custom, ev] });
  }, []);

  const removeEvent = useCallback((id: string) => {
    const s = read();
    const isCustom = s.custom.some((e) => e.id === id);
    write({
      custom: isCustom ? s.custom.filter((e) => e.id !== id) : s.custom,
      hidden: isCustom || s.hidden.includes(id) ? s.hidden : [...s.hidden, id],
    });
  }, []);

  const restoreAll = useCallback(() => {
    const s = read();
    write({ ...s, hidden: [] });
  }, []);

  const events: AgendaEvent[] = [
    ...AGENDA_EVENTS.filter((e) => !store.hidden.includes(e.id)),
    ...store.custom,
  ];

  return { events, hiddenCount: store.hidden.length, addEvent, removeEvent, restoreAll };
}

/** Verkleint een gekozen afbeelding en geeft een data-URL terug. */
export async function fileToImage(file: File, maxWidth = 1400): Promise<string> {
  const dataUrl = await new Promise<string>((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result));
    fr.onerror = () => rej(new Error("read"));
    fr.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("img"));
    i.src = dataUrl;
  });

  if (img.width <= maxWidth) return dataUrl;

  const scale = maxWidth / img.width;
  const canvas = document.createElement("canvas");
  canvas.width = maxWidth;
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.88);
}
