import { useEffect, useState } from "react";

/**
 * Centrale kersteditie: alle kerstdecoraties, kersttekst, muziek en muziekknop
 * hangen aan deze ene periode (Europe/Amsterdam, wintertijd UTC+1).
 */
export const CHRISTMAS_THEME_START = Date.parse("2026-11-23T00:00:00+01:00");
export const CHRISTMAS_THEME_END = Date.parse("2027-01-01T00:00:00+01:00");

export function isChristmasThemeActive(now: number = Date.now()) {
  return now >= CHRISTMAS_THEME_START && now < CHRISTMAS_THEME_END;
}

/** Herberekent zichzelf op het moment van start/einde, ook in een open sessie. */
export function useChristmasTheme() {
  const [active, setActive] = useState(() => isChristmasThemeActive());
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = Date.now();
      setActive(isChristmasThemeActive(now));
      const next = now < CHRISTMAS_THEME_START ? CHRISTMAS_THEME_START : now < CHRISTMAS_THEME_END ? CHRISTMAS_THEME_END : 0;
      if (next) t = setTimeout(tick, Math.min(next - now + 50, 60_000));
    };
    tick();
    const onVis = () => document.visibilityState === "visible" && setActive(isChristmasThemeActive());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return active;
}
