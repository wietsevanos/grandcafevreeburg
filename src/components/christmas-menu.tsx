import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export const CHRISTMAS_MENU_URL = "/menus/kerstmenu-2026.pdf";
// 1 januari 2027 00:00 Europe/Amsterdam (CET, UTC+1) — daarna is alles weer zoals voorheen
export const CHRISTMAS_END = Date.parse("2027-01-01T00:00:00+01:00");

export function isChristmasActive(now: number = Date.now()) {
  return now < CHRISTMAS_END;
}

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

/** Fijne hulsttak: twee blaadjes met drie bessen. */
function HollyMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M22 13c-3-5-9-7-16-6 2 2 1 4 3 5-2 1-2 3-4 4 7 2 13 0 17-3z"
        fill="currentColor"
        opacity=".85"
      />
      <path
        d="M26 13c3-5 9-7 16-6-2 2-1 4-3 5 2 1 2 3 4 4-7 2-13 0-17-3z"
        fill="currentColor"
        opacity=".85"
      />
      <circle cx="24" cy="11" r="2.6" className="fill-bordeaux" />
      <circle cx="20.8" cy="14.6" r="2.3" className="fill-bordeaux" />
      <circle cx="27.2" cy="14.6" r="2.3" className="fill-bordeaux" />
    </svg>
  );
}

/** Rustige regel in de hero. */
export function ChristmasAnnouncement() {
  const active = useChristmasActive();
  if (!active) return null;
  return (
    <div className="mt-8 md:mt-10 flex flex-col items-center gap-2 text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gold/60" />
        <HollyMark className="h-6 w-12 text-gold" />
        <span className="h-px w-8 bg-gold/60" />
      </div>
      <p className="font-display italic text-lg md:text-xl">Kerstmenu 2026 · 24, 25 &amp; 26 december</p>
      <div className="flex items-center gap-4 text-sm">
        <a href={CHRISTMAS_MENU_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-cream/90 hover:text-cream">
          Bekijk het kerstmenu
        </a>
        <span className="h-3 w-px bg-cream/40" aria-hidden="true" />
        <button type="button" className="wereserve-cta link-underline text-gold hover:text-cream">
          Reserveer voor kerst
        </button>
      </div>
    </div>
  );
}

/** Extra onderdeel in de menukaart-sectie. */
export function ChristmasMenuCard() {
  const active = useChristmasActive();
  if (!active) return null;
  return (
    <div className="max-w-6xl mx-auto mt-5 rounded-2xl border border-gold/30 bg-cream/[0.04] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:justify-between text-center md:text-left relative overflow-hidden">
      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-bordeaux/20 blur-3xl pointer-events-none" />
      <div className="relative">
        <HollyMark className="h-5 w-10 text-gold mb-3 mx-auto md:mx-0" />
        <h3 className="font-display text-2xl md:text-3xl text-cream mb-1">
          Kerstmenu <span className="italic text-gold">2026</span>
        </h3>
        <p className="text-sm text-cream/60">24, 25 &amp; 26 december · € 75,00 per persoon</p>
      </div>
      <div className="relative flex flex-col sm:flex-row gap-3">
        <a
          href={CHRISTMAS_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost border-gold/40 text-cream hover:bg-cream hover:text-foreground hover:border-cream"
        >
          Bekijk het kerstmenu <ArrowRight className="h-4 w-4" />
        </a>
        <button type="button" className="btn-primary wereserve-cta">Reserveer voor kerst</button>
      </div>
    </div>
  );
}
