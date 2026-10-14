import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const CHRISTMAS_MENU_URL = "/menus/kerstmenu-2026.pdf";
// 1 januari 2027 00:00 Europe/Amsterdam (CET, UTC+1)
export const CHRISTMAS_END = Date.parse("2027-01-01T00:00:00+01:00");

export function isChristmasActive(now: number = Date.now()) {
  return now < CHRISTMAS_END;
}

/** Client-only: false during SSR, then re-evaluated and auto-hides at the deadline. */
export function useChristmasActive() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const now = Date.now();
    setActive(isChristmasActive(now));
    if (!isChristmasActive(now)) return;
    const ms = Math.min(CHRISTMAS_END - now, 2_147_000_000);
    const t = setTimeout(() => setActive(isChristmasActive()), ms + 50);
    return () => clearTimeout(t);
  }, []);
  return active;
}

function Buttons({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={CHRISTMAS_MENU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={
          light
            ? "btn-ghost bg-cream/10 backdrop-blur-sm border-cream/50 text-cream hover:bg-cream hover:text-foreground hover:border-cream"
            : "btn-ghost border-gold/40 text-cream hover:bg-cream hover:text-foreground hover:border-cream"
        }
      >
        Bekijk het kerstmenu <ArrowRight className="h-4 w-4" />
      </a>
      <button type="button" className="btn-primary wereserve-cta">
        Reserveer voor kerst
      </button>
    </div>
  );
}

/** Compacte aankondiging in de hero. */
export function ChristmasAnnouncement() {
  const active = useChristmasActive();
  if (!active) return null;
  return (
    <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-cream/25 bg-foreground/35 backdrop-blur-md px-5 py-5 md:px-7 text-cream shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <p className="eyebrow text-gold mb-2 inline-flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5" /> Kerstmenu 2026
      </p>
      <p className="text-cream/90 text-sm md:text-base mb-4">
        24, 25 &amp; 26 december · € 75,00 per persoon
      </p>
      <Buttons light />
    </div>
  );
}

/** Extra onderdeel in de menukaart-sectie. */
export function ChristmasMenuCard() {
  const active = useChristmasActive();
  if (!active) return null;
  return (
    <div className="max-w-6xl mx-auto mt-5 rounded-2xl border border-gold/30 bg-cream/[0.04] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:justify-between text-center md:text-left">
      <div>
        <p className="eyebrow text-gold mb-2 inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" /> Kerstmenu 2026
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-cream mb-1">Kerst bij Vreeburg</h3>
        <p className="text-sm text-cream/60">24, 25 &amp; 26 december 2026 · € 75,00 per persoon</p>
      </div>
      <Buttons />
    </div>
  );
}
