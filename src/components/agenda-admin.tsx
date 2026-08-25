import { useRef, useState } from "react";
import { ImagePlus, Loader2, Lock, RotateCcw, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fileToImage, useAgendaStore } from "@/lib/agenda-store";

const CODE = "2468";

export function AgendaAdmin({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { events, hiddenCount, addEvent, removeEvent, restoreAll } = useAgendaStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function close(v: boolean) {
    onOpenChange(v);
    if (!v) {
      setCode("");
      setError(false);
      setUnlocked(false);
      setTitle("");
      setDate("");
    }
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (code === CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setCode("");
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const image = await fileToImage(file);
      addEvent({
        id: `custom-${Date.now()}`,
        title: title.trim() || "Evenement",
        image,
        dates: date ? [date] : [],
      });
      setTitle("");
      setDate("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-lg rounded-3xl">
        {!unlocked ? (
          <form onSubmit={submitCode} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Beheer programma</DialogTitle>
              <DialogDescription>Voer je code in om verder te gaan.</DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                inputMode="numeric"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••"
                aria-label="Code"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-border tracking-[0.4em] text-center outline-none focus:border-bordeaux transition-colors"
              />
            </div>
            {error && <p className="text-sm text-destructive">Onjuiste code, probeer opnieuw.</p>}
            <button type="submit" className="btn-primary w-full h-12">
              Inloggen
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Programma beheren</DialogTitle>
              <DialogDescription>
                Voeg een flyer toe of verwijder een evenement. Wijzigingen zijn direct zichtbaar.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Naam evenement"
                  className="h-11 px-4 rounded-xl bg-background border border-border text-sm outline-none focus:border-bordeaux transition-colors"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  aria-label="Datum (optioneel)"
                  className="h-11 px-4 rounded-xl bg-background border border-border text-sm outline-none focus:border-bordeaux transition-colors"
                />
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                className="hidden"
              />
              <button
                type="button"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
                className="w-full h-24 rounded-2xl border border-dashed border-border hover:border-bordeaux hover:bg-secondary/60 transition-colors flex flex-col items-center justify-center gap-1.5 text-sm text-muted-foreground disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ImagePlus className="h-5 w-5" />
                )}
                <span>{busy ? "Bezig met toevoegen…" : "Kies een foto of flyer"}</span>
              </button>
              <p className="text-xs text-muted-foreground">
                Zonder datum blijft het evenement staan tot je het verwijdert.
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {events.length === 0 && (
                <p className="text-sm text-muted-foreground">Nog geen evenementen.</p>
              )}
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-3 p-2 rounded-2xl border border-border bg-secondary/40"
                >
                  <img
                    src={ev.image}
                    alt=""
                    className="h-12 w-12 rounded-xl object-cover shrink-0"
                  />
                  <span className="flex-1 text-sm truncate">{ev.title}</span>
                  <button
                    type="button"
                    onClick={() => removeEvent(ev.id)}
                    aria-label={`${ev.title} verwijderen`}
                    className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-background transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={restoreAll}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Verwijderde standaard-evenementen terugzetten
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
