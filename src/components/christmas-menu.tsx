import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import hollyMark from "@/assets/kerst-holly.png";

export const CHRISTMAS_MENU_URL = "/menus/kerstmenu-2026.pdf";
// 1 januari 2027 00:00 Europe/Amsterdam (CET, UTC+1) — daarna is alles weer zoals voorheen
export const CHRISTMAS_END = Date.parse("2027-01-01T00:00:00+01:00");

export function isChristmasActive(now: number = Date.now()) {
  return now < CHRISTMAS_END;
}

export function useChristmasActive() {
  const [active, setActive] = useState(() => isChristmasActive());
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

/** Hulsttak uit de aangeleverde png, rechtop en zonder effecten. */
function HollyMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={hollyMark}
      alt=""
      aria-hidden="true"
      width={433}
      height={433}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}

/** Compacte glazen aankondiging in de hero: één knop. */
export function ChristmasAnnouncement() {
  const active = useChristmasActive();
  if (!active) return null;
  return (
    <div className="mt-8 md:mt-10 mx-auto w-fit max-w-full rounded-2xl border border-cream/20 bg-foreground/30 backdrop-blur-md px-4 py-3 md:px-5 text-cream shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-3 md:gap-5">
      <div className="flex items-center gap-3">
        <HollyMark className="h-9 w-9 shrink-0" />
        <div className="text-left leading-tight">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Kerstmenu 2026</p>
          <p className="text-xs md:text-sm text-cream/85">24, 25 &amp; 26 december · € 75 p.p.</p>
        </div>
      </div>
      <span className="hidden md:block h-6 w-px bg-cream/20" aria-hidden="true" />
      <a
        href={CHRISTMAS_MENU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-bordeaux px-4 py-1.5 text-xs whitespace-nowrap font-medium text-cream hover:opacity-90 transition-opacity"
      >
        Bekijk het kerstmenu <ArrowRight className="h-3 w-3" />
      </a>
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
        <HollyMark className="h-12 w-12 mb-3 mx-auto md:mx-0" />
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
        <button type="button" className="btn-primary reserve-cta">Reserveer voor kerst</button>
      </div>
    </div>
  );
}
