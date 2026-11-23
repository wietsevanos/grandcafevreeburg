import christmasJazzPoster from "@/assets/jazz-christmas-special.webp";
import type { AgendaEvent } from "./agenda";

export const CHRISTMAS_JAZZ_EVENT = {
  id: "jazz-christmas-special-2026",
  image: christmasJazzPoster,
  title: "Jazz Christmas Special",
  date: "2026-12-20",
};

/** Seasonal addition only: never replace or persist changes to the regular agenda. */
export function withChristmasJazz(events: AgendaEvent[], active: boolean): AgendaEvent[] {
  if (!active) return events;
  const regular = events.filter((event) => event.id !== CHRISTMAS_JAZZ_EVENT.id);
  const next = [...regular];
  // Second place in the grid, right after the first regular event.
  next.splice(Math.min(1, next.length), 0, CHRISTMAS_JAZZ_EVENT);
  return next;
}