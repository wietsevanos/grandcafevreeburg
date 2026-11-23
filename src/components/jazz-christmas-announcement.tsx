import { useEffect, useState } from "react";
import { ArrowRight, Music } from "lucide-react";
import hollyMark from "@/assets/kerst-holly.png";

// 21 december 2026 00:00 Europe/Amsterdam (CET, UTC+1) — na 20 december verdwijnt de aankondiging vanzelf
export const JAZZ_CHRISTMAS_END = Date.parse("2026-12-21T00:00:00+01:00");

export function isJazzChristmasActive(now: number = Date.now()) {
  return now < JAZZ_CHRISTMAS_END;
}

function useJazzChristmasActive() {
  const [active, setActive] = useState(() => isJazzChristmasActive());
  useEffect(() => {
    const now = Date.now();
    setActive(isJazzChristmasActive(now));
    if (!isJazzChristmasActive(now)) return;
    const ms = Math.min(JAZZ_CHRISTMAS_END - now, 2_147_000_000);
    const t = setTimeout(() => setActive(isJazzChristmasActive()), ms + 50);
    return () => clearTimeout(t);
  }, []);
  return active;
}

/**
 * Compacte, feestelijke aankondiging van de extra jazzmiddag,
 * direct onder de hero. Verdwijnt automatisch na 20 december 2026.
 */
export function JazzChristmasAnnouncement() {
  const active = useJazzChristmasActive();
  if (!active) return null;
  return (
    <section
      aria-label="Aankondiging Extra Jazz Christmas Special"
      className="relative overflow-hidden bg-foreground text-cream"
    >
      {/* Warme gloed passend bij het kerstthema */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, var(--color-bordeaux), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-gold), transparent 65%)" }}
      />

      <div className="container-x relative py-10 md:py-12">
        <div className="xmas-highlight mx-auto max-w-4xl rounded-3xl border border-gold/30 bg-cream/[0.05] backdrop-blur-sm px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]">
          <img
            src={hollyMark}
            alt=""
            aria-hidden="true"
            width={433}
            height={433}
            decoding="async"
            className="h-12 w-12 md:h-14 md:w-14 shrink-0 object-contain"
          />
          <div className="flex-1 leading-snug">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-gold mb-1.5">
              Extra · zondag 20 december 2026
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-1.5">
              Jazz Christmas <span className="italic text-gold">Special</span>
            </h2>
            <p className="text-sm md:text-base text-cream/80">
              Een gezellige extra jazzmiddag met Christmas songs bij Grand Café Vreeburg!
            </p>
          </div>
          <a
            href="#jazz-christmas-special"
            className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-5 py-2.5 text-sm font-medium text-cream whitespace-nowrap hover:opacity-90 transition-opacity shrink-0"
          >
            <Music className="h-4 w-4" />
            Bekijk in de agenda <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
