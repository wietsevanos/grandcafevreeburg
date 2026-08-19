import { useMemo, useState } from "react";
import { CalendarDays, Clock, Repeat, Info, X } from "lucide-react";
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
    <section id="agenda" className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        <div className="max-w-2xl mb-14 reveal">
          <p className="eyebrow mb-4">Agenda</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Wat staat er <span className="italic text-bordeaux">op het programma</span>
          </h2>
          <p className="text-muted-foreground">
            Van live jazz tot gezellige avonden vol muziek en spel — hier vindt u alle
            activiteiten bij Grand Café Vreeburg.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {events.map(({ ev, dates }, i) => {
            const next = dates[0];
            const nextDate = parse(next);
            return (
              <article
                key={ev.id}
                className={`reveal delay-${(i % 4) + 1} group bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow duration-500`}
              >
                <div className="grid md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
                  {/* Datumblok */}
                  <div className="flex md:flex-col items-center md:justify-center gap-3 md:gap-1 px-6 py-5 md:px-8 md:py-10 bg-foreground text-cream md:min-w-[9.5rem]">
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
                      {NL_MONTHS[nextDate.getMonth()].slice(0, 3)}
                    </span>
                    <span className="font-display text-3xl md:text-5xl leading-none">
                      {nextDate.getDate()}
                    </span>
                    <span className="text-xs text-cream/60 md:mt-1">{nextDate.getFullYear()}</span>
                  </div>

                  {/* Inhoud */}
                  <div className="p-6 md:p-8">
                    {ev.category && (
                      <p className="eyebrow mb-3 text-[0.65rem]">{ev.category}</p>
                    )}
                    <h3 className="font-display text-2xl md:text-3xl leading-tight mb-3">
                      {ev.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-4">
                      {ev.recurring && (
                        <span className="inline-flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-bordeaux" /> {ev.recurring}
                        </span>
                      )}
                      {ev.time && (
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-bordeaux" /> {ev.time}
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {ev.description}
                    </p>

                    {dates.length > 1 && (
                      <div className="mt-6">
                        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/70 mb-3">
                          <CalendarDays className="h-4 w-4 text-bordeaux" /> Alle data
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {dates.map((d) => (
                            <li
                              key={d}
                              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border bg-background/70 text-foreground/80"
                            >
                              {formatLong(d)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {ev.details && ev.details.length > 0 && (
                      <ul className="mt-6 space-y-1.5">
                        {ev.details.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Info className="h-4 w-4 text-bordeaux mt-0.5 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      <button type="button" className="btn-primary wereserve-cta">
                        Reserveer een tafel
                      </button>
                      {ev.image && (
                        <button
                          type="button"
                          onClick={() => setFlyer(ev)}
                          className="btn-ghost md:hidden"
                        >
                          Bekijk flyer
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Flyer */}
                  {ev.image && (
                    <button
                      type="button"
                      onClick={() => setFlyer(ev)}
                      aria-label={`Flyer ${ev.title} vergroten`}
                      className="hidden lg:block p-6 md:p-8 lg:pl-0 cursor-zoom-in"
                    >
                      <span className="img-zoom block rounded-xl border border-border overflow-hidden h-full">
                        <img
                          src={ev.image}
                          alt={`Flyer ${ev.title}`}
                          loading="lazy"
                          className="h-full max-h-[26rem] w-auto object-contain bg-cream"
                        />
                      </span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {flyer?.image && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-foreground/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setFlyer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Flyer ${flyer.title}`}
        >
          <button
            type="button"
            onClick={() => setFlyer(null)}
            aria-label="Sluiten"
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-cream/15 text-cream hover:bg-cream hover:text-foreground transition-colors"
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
