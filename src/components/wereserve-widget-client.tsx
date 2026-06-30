import { useEffect, useState } from "react";
import { X, CalendarCheck, Phone, Mail } from "lucide-react";

const DESKTOP_URL = "https://app.wereserve.nl/widget/book/1272";
const MOBILE_URL = "https://app.wereserve.nl/m/reservate/1272";

export function WeReserveWidgetClient() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest(".wereserve-cta");
      if (cta) {
        e.preventDefault();
        setLoaded(false);
        setOpen(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  if (!open) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const src = isMobile ? MOBILE_URL : DESKTOP_URL;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center bg-foreground/60 backdrop-blur-md md:p-6 animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full md:max-w-5xl md:h-[88vh] h-full flex flex-col md:flex-row overflow-hidden bg-background md:rounded-[28px] shadow-[0_30px_120px_-20px_rgba(0,0,0,0.45)] animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar - branding */}
        <aside className="hidden md:flex flex-col justify-between w-[300px] shrink-0 bg-foreground text-background p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] opacity-70">
              <span className="h-px w-6 bg-background/60" />
              Grand Café Vreeburg
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[1.05]">
              Reserveer<br />je tafel
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-75">
              Kies een datum, tijd en het aantal gasten. Binnen enkele
              seconden ontvang je een bevestiging per e-mail.
            </p>
          </div>

          <div className="relative space-y-4 text-sm">
            <div className="flex items-start gap-3 opacity-90">
              <CalendarCheck className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Direct bevestigd</div>
                <div className="opacity-60 text-xs">Geen wachten op terugbellen</div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-90">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">+31 (0)23 74 30 125</div>
                <div className="opacity-60 text-xs">Voor groepen of vragen</div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-90">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Info@grandcafevreeburg.nl</div>
                <div className="opacity-60 text-xs">We reageren snel</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Form area */}
        <div className="relative flex-1 bg-background flex flex-col min-h-0">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-foreground/10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                Vreeburg
              </div>
              <div className="font-display text-xl leading-none mt-1">
                Reserveren
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground hover:bg-foreground hover:text-background transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Sluiten"
            className="hidden md:inline-flex absolute top-4 right-4 z-10 h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Loading state */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-[5] pointer-events-none">
              <div className="h-8 w-8 rounded-full border-2 border-foreground/15 border-t-foreground animate-spin" />
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-foreground/50">
                Reserveringsformulier laden
              </p>
            </div>
          )}

          <iframe
            src={src}
            title="Reserveren bij Grand Café Vreeburg"
            onLoad={() => setLoaded(true)}
            className="w-full flex-1 border-0 bg-background"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
