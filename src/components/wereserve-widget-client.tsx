import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DESKTOP_URL = "https://app.wereserve.nl/widget/book/1272";
const MOBILE_URL = "https://app.wereserve.nl/m/reservate/1272";

export function WeReserveWidgetClient() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest(".wereserve-cta");
      if (cta) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const src = isMobile ? MOBILE_URL : DESKTOP_URL;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full h-full md:h-[90vh] md:max-w-3xl md:rounded-2xl overflow-hidden bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Sluiten"
          className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md hover:bg-background transition"
        >
          <X className="h-5 w-5" />
        </button>
        <iframe
          src={src}
          title="Reserveren bij Grand Café Vreeburg"
          className="w-full h-full border-0"
          allow="payment"
        />
      </div>
    </div>
  );
}
