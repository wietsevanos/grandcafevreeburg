import { useEffect, useRef, useState } from "react";
import { Check, ImagePlus, Loader2, Lock, Trash2 } from "lucide-react";
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
  const { events, saving, error: saveError, replaceEvents } = useAgendaStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && unlocked) {
      setImages(events.map((event) => event.image));
    }
  }, [events, open, unlocked]);

  function close(v: boolean) {
    onOpenChange(v);
    if (!v) {
      setCode("");
      setError(false);
      setUnlocked(false);
      setImages([]);
      setSaved(false);
    }
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (code === CODE) {
      setUnlocked(true);
      setError(false);
      setImages(events.map((event) => event.image));
    } else {
      setError(true);
      setCode("");
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setBusy(true);
    setSaved(false);
    try {
      const nextImages = await Promise.all(files.map((file) => fileToImage(file)));
      setImages((current) => [...current, ...nextImages]);
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    const ok = await replaceEvents(images);
    if (ok) setSaved(true);
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
              <DialogDescription>Voeg foto’s toe, verwijder wat weg mag en klik op opslaan.</DialogDescription>
            </DialogHeader>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFile}
              className="hidden"
            />
            <button
              type="button"
              disabled={busy || saving}
              onClick={() => fileRef.current?.click()}
              className="w-full h-24 rounded-2xl border border-dashed border-border hover:border-bordeaux hover:bg-secondary/60 transition-colors flex flex-col items-center justify-center gap-1.5 text-sm text-muted-foreground disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
              <span>{busy ? "Foto’s worden klaargezet…" : "Foto’s toevoegen"}</span>
            </button>

            <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
              {images.length === 0 && (
                <p className="col-span-3 text-sm text-muted-foreground text-center py-8">
                  Nog geen foto’s toegevoegd.
                </p>
              )}
              {images.map((image, index) => (
                <div key={`${image.slice(0, 40)}-${index}`} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary border border-border">
                  <img src={image} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setSaved(false);
                      setImages((current) => current.filter((_, i) => i !== index));
                    }}
                    aria-label="Foto verwijderen"
                    className="absolute right-2 top-2 p-2 rounded-full bg-background/90 text-muted-foreground shadow-[var(--shadow-soft)] hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {saveError && <p className="text-sm text-destructive">{saveError}</p>}
            {saved && (
              <p className="inline-flex items-center gap-2 text-sm text-forest">
                <Check className="h-4 w-4" />
                Opgeslagen en zichtbaar op de website.
              </p>
            )}

            <button
              type="button"
              onClick={save}
              disabled={busy || saving}
              className="btn-primary w-full h-12 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Opslaan
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
