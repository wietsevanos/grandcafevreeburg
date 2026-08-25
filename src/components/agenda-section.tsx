import { useMemo, useState } from "react";
import { Settings2, X } from "lucide-react";
import { type AgendaEvent } from "@/data/agenda";
import { useAgendaStore } from "@/lib/agenda-store";
import { AgendaAdmin } from "@/components/agenda-admin";

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
  const [admin, setAdmin] = useState(false);
  const { events: all } = useAgendaStore();

  const events = useMemo(
    () =>
      all
        .map((ev) => ({ ev, dates: upcomingDates(ev) }))
        // Zonder datums blijft een evenement altijd staan
        .filter((e) => e.ev.dates.length === 0 || e.dates.length > 0)
        .sort((a, b) => {
          const at = a.dates[0] ? parse(a.dates[0]).getTime() : Infinity;
          const bt = b.dates[0] ? parse(b.dates[0]).getTime() : Infinity;
          return at - bt;
        }),
    [all],
  );

  return (
    <section
      id="agenda"
      className="relative py-24 md:py-32 bg-secondary text-foreground overflow-hidden"
    >
      {/* zachte warme gloed */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, var(--color-bordeaux), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-gold), transparent 65%)" }}
      />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl reveal">
            <p className="eyebrow mb-4">Programma</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Wat staat er <span className="italic text-bordeaux">op het programma</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              Een greep uit onze komende avonden. Klik op een flyer om deze te vergroten.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAdmin(true)}
            className="reveal group inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border/80 bg-background/60 backdrop-blur-sm text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:border-bordeaux/60 transition-colors"
          >
            <Settings2 className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-90" />
            Beheer
          </button>
        </div>

        {events.length === 0 ? (
          <div className="reveal max-w-xl mx-auto text-center py-16 rounded-3xl border border-dashed border-border bg-background/50">
            <p className="font-display text-2xl">Binnenkort meer</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We werken aan een nieuw programma. Houd deze pagina in de gaten.
            </p>
          </div>
        ) : (
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
                className={`reveal delay-${Math.min(i + 1, 5)} group relative block w-full rounded-3xl p-[1px] bg-gradient-to-b from-border to-transparent hover:from-bordeaux/50 transition-colors duration-500 cursor-zoom-in`}
              >
                <span className="block relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-cream shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[var(--shadow-lift)]">
                  <img
                    src={ev.image}
                    alt={`Flyer ${ev.title}`}
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                  {/* subtiele glans die over de flyer loopt */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />
                  <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-[0.65rem] uppercase tracking-[0.18em] text-cream/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0 transition-all duration-500">
                    Vergroot flyer
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}

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

      <AgendaAdmin open={admin} onOpenChange={setAdmin} />
    </section>
  );
}
