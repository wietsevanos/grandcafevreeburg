import { useMemo, useState } from "react";
import { CalendarDays, Clock, Repeat, X } from "lucide-react";
import { AGENDA_EVENTS, type AgendaEvent } from "@/data/agenda";

const NL_MONTHS = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];
const NL_DAYS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

function parse(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, day ?? 1);
}

function formatLong(d: string) {
  const date = parse(d);
  return `${NL_DAYS[date.getDay()]} ${date.getDate()} ${NL_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatShort(d: string) {
  const date = parse(d);
  return `${date.getDate()} ${NL_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function upcomingDates(ev: AgendaEvent) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return ev.dates
    .filter((d) => parse(d).getTime() >= today.getTime())
    .sort((a, b) => parse(a).getTime() - parse(b).getTime());
}

export function AgendaSection() {
  const [flyer, setFlyer] = useState<AgendaEvent | null>(null);

  const events = useMemo(
    () =>
      AGENDA_EVENTS.map((ev) => ({ ev, dates: upcomingDates(ev) }))
        .filter((e) => e.dates.length > 0)
        .sort((a, b) => parse(a.dates[0]).getTime() - parse(b.dates[0]).getTime()),
    [],
  );

  if (events.length === 0) return null;

  const featured = events[0];
  const next = featured.dates[0];

  return (
    <section id="agenda" className="py-24 md:py-32 bg-foreground text-cream overflow-hidden">
      <div className="container-x">
        <div className="max-w-xl mb-12 md:mb-16 reveal">
          <p className="eyebrow mb-4">Agenda</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Wat staat er <span className="italic text-bordeaux">op het programma</span>
          </h2>
        </div>

        <article className="reveal delay-1 group relative bg-cream/[0.03] border border-cream/10 rounded-3xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.2),0_20px_40px_-16px_rgba(0,0,0,0.5)] agenda-float">
          <div className="grid lg:grid-cols-2">
            {/* Flyer */}
            <button
              type="button"
              onClick={() => setFlyer(featured.ev)}
              aria-label={`Flyer ${featured.ev.title} vergroten`}
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[28rem] overflow-hidden cursor-zoom-in"
            >
              <div className="absolute inset-[-8%] agenda-pan">
                <img
                  src={featured.ev.image}
                  alt={`Flyer ${featured.ev.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-foreground/60" />
              <span className="absolute bottom-4 left-4 lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/70 backdrop-blur-sm text-[0.65rem] uppercase tracking-[0.18em] text-cream/90">
                Vergroot flyer
              </span>
            </button>

            {/* Info */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              {featured.ev.category && (
                <p className="eyebrow mb-4 text-bordeaux">{featured.ev.category}</p>
              )}
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                {featured.ev.title}
              </h3>

              <div className="space-y-4 mb-10 text-cream/85 text-base md:text-lg">
                <div className="flex items-start gap-4">
                  <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-bordeaux mt-0.5 shrink-0" />
                  <span>{formatLong(next)}</span>
                </div>
                {featured.ev.time && (
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-bordeaux mt-0.5 shrink-0" />
                    <span>{featured.ev.time}</span>
                  </div>
                )}
                {featured.ev.recurring && (
                  <div className="flex items-start gap-4">
                    <Repeat className="h-5 w-5 md:h-6 md:w-6 text-bordeaux mt-0.5 shrink-0" />
                    <span>{featured.ev.recurring}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-ghost-light">
                  Reserveer een tafel
                </button>
                <button
                  type="button"
                  onClick={() => setFlyer(featured.ev)}
                  className="btn-ghost-light"
                >
                  Bekijk flyer
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Dates ticker */}
        {featured.dates.length > 1 && (
          <div className="mt-10 marquee-row overflow-hidden py-5 border-t border-cream/10">
            <div className="marquee-track" style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
              {[...featured.dates, ...featured.dates].map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-2 px-6 md:px-8 text-cream/60 whitespace-nowrap text-sm md:text-base"
                >
                  <CalendarDays className="h-4 w-4 text-bordeaux" />
                  {formatShort(d)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {flyer?.image && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-foreground/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setFlyer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Flyer ${flyer.title}`}
        >
          <button
            type="button"
            onClick={() => setFlyer(null)}
            aria-label="Sluiten"
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-cream/15 text-cream hover:bg-cream hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={flyer.image}
            alt={`Flyer ${flyer.title}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full w-auto object-contain rounded-xl shadow-[var(--shadow-lift)] animate-in zoom-in-95 duration-300"
          />
        </div>
      )}
    </section>
  );
}
