import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { AGENDA_EVENTS, type AgendaEvent } from "@/data/agenda";

function parse(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, day ?? 1);
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

  return (
    <section id="agenda" className="py-24 md:py-32 bg-secondary text-foreground overflow-hidden">
      <div className="container-x">
        <div className="max-w-xl mb-12 md:mb-16 reveal">
          <p className="eyebrow mb-4">Agenda</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Wat staat er <span className="italic text-bordeaux">op het programma</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Een greep uit onze komende avonden. Klik op een flyer om deze te vergroten.
          </p>
        </div>

        <div
          className={`grid gap-6 md:gap-8 ${
            events.length === 1 ? "max-w-xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {events.map(({ ev }, i) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setFlyer(ev)}
              aria-label={`Flyer ${ev.title} vergroten`}
              className={`reveal delay-${Math.min(i + 1, 5)} group relative block w-full bg-cream border border-border rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] lift cursor-zoom-in`}
            >
              <img
                src={ev.image}
                alt={`Flyer ${ev.title}`}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
              <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-[0.65rem] uppercase tracking-[0.18em] text-cream/90 opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity">
                Vergroot flyer
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-center reveal">
          <button type="button" className="btn-primary h-12 px-7">
            Reserveer een tafel
          </button>
        </div>
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
