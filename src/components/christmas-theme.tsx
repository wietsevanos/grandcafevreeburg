import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChristmasTheme } from "@/lib/christmas-theme";
import { GoldDivider, LightString, PineBranch, Star } from "@/components/christmas-decor";

const MUSIC_SRC = "/audio/kerstmuziek.mp3";
const PREF_KEY = "vreeburg-kerstmuziek";

/** Hele kersteditie: decoraties per sectie + achtergrondmuziek. Verdwijnt vanzelf na de kerstperiode. */
export function ChristmasTheme() {
  const active = useChristmasTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("xmas", active);
    return () => document.documentElement.classList.remove("xmas");
  }, [active]);
  if (!active) return null;
  return (
    <>
      <SectionDecor />
      <ChristmasMusic />
    </>
  );
}

/** Kleine kersttekst in de hero; alleen tijdens de kerstperiode. */
export function ChristmasGreeting() {
  const active = useChristmasTheme();
  if (!active) return null;
  return (
    <p className="reveal mb-5 flex items-center justify-center gap-3 font-display italic text-champagne text-base md:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
      <Star className="h-2.5 w-2.5" />
      Vier de feestdagen bij Vreeburg
      <Star className="h-2.5 w-2.5" />
    </p>
  );
}

function useTargets(selectors: string[]) {
  const [els, setEls] = useState<(Element | null)[]>([]);
  useEffect(() => {
    setEls(selectors.map((s) => document.querySelector(s)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return els;
}

const corner = "absolute z-[1] pointer-events-none";

function SectionDecor() {
  const [home, header, gallery, menu, agenda, events, werken, contact, footer] = useTargets([
    "#home",
    "header",
    "#galerij",
    "#menu",
    "#agenda",
    "#events",
    "#werken",
    "#contact",
    "main > footer",
  ]);
  const p = (el: Element | null, node: React.ReactNode) => (el ? createPortal(node, el) : null);
  return (
    <>
      {p(
        home,
        <div aria-hidden="true" className="xmas-decor">
          <div className="absolute inset-x-0 top-0 h-48 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,214,150,0.16),transparent_70%)]" />
          <PineBranch className={`${corner} -left-6 -top-4 w-[62vw] max-w-[440px] md:w-[34vw] drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]`} />
          <PineBranch className={`${corner} -right-6 -top-4 w-[62vw] max-w-[440px] md:w-[34vw] -scale-x-100 drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]`} />
          <div className="xmas-snowglow absolute inset-0 z-[1] pointer-events-none" />
        </div>,
      )}
      {p(header, <span aria-hidden="true" className="xmas-decor xmas-navline" />)}
      {p(gallery, <GoldDivider className="xmas-decor absolute top-10 md:top-14 inset-x-0 z-[1]" />)}
      {p(
        menu,
        <div aria-hidden="true" className="xmas-decor">
          <PineBranch lights className={`${corner} -right-8 -top-6 w-[46vw] max-w-[320px] -scale-x-100 opacity-90`} ornaments={false} />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        </div>,
      )}
      {p(
        agenda,
        <div aria-hidden="true" className="xmas-decor">
          <Star className={`${corner} left-[8%] top-12 h-3 w-3 opacity-70`} />
          <Star className={`${corner} right-[10%] top-20 h-2 w-2 opacity-60`} />
          <Star className={`${corner} right-[18%] bottom-16 h-2.5 w-2.5 opacity-50`} />
        </div>,
      )}
      {p(events, <LightString className="xmas-decor absolute inset-x-0 top-0 h-8 md:h-10 w-full z-[1]" count={22} />)}
      {p(
        werken,
        <div aria-hidden="true" className="xmas-decor">
          <div className="absolute -top-20 right-[8%] h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <Star className={`${corner} right-[12%] top-16 h-4 w-4`} />
        </div>,
      )}
      {p(
        contact,
        <PineBranch aria-hidden className={`xmas-decor ${corner} -left-6 -top-3 w-[44vw] max-w-[300px] opacity-95`} ornaments={false} />,
      )}
      {p(
        footer,
        <PineBranch className={`xmas-decor ${corner} -right-6 -top-3 w-[44vw] max-w-[300px] -scale-x-100 opacity-90`} ornaments={false} />,
      )}
    </>
  );
}

function ChristmasMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = MUSIC_SRC;
    audio.loop = true;
    audio.volume = 0.2;
    audio.preload = "auto";
    audioRef.current = audio;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onPause);

    const wantsMusic = () => {
      try {
        return localStorage.getItem(PREF_KEY) !== "off";
      } catch {
        return true;
      }
    };
    const removeUnlock = () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
      window.removeEventListener("touchstart", unlock, true);
    };
    function unlock(e: Event) {
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) return;
      removeUnlock();
      if (wantsMusic() && audio.paused) audio.play().catch(() => {});
    }
    if (wantsMusic()) {
      audio.play().catch(() => {
        window.addEventListener("pointerdown", unlock, true);
        window.addEventListener("keydown", unlock, true);
        window.addEventListener("touchstart", unlock, true);
      });
    }
    return () => {
      removeUnlock();
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try { localStorage.setItem(PREF_KEY, "on"); } catch { /* */ }
      audio.play().catch(() => setPlaying(false));
    } else {
      try { localStorage.setItem(PREF_KEY, "off"); } catch { /* */ }
      audio.pause();
    }
  };

  const label = playing ? "Kerstmuziek aan" : "Kerstmuziek uit";
  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Kerstmuziek aan — klik om uit te zetten" : "Kerstmuziek uit — klik om aan te zetten"}
      className="xmas-music fixed z-50 bottom-4 left-4 md:left-auto md:right-6 md:bottom-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-foreground/95 text-champagne h-11 w-11 md:w-auto justify-center md:px-4 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:border-gold hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MusicIcon playing={playing} />
      <span className="hidden md:inline text-xs tracking-wide">{label}</span>
    </button>
  );
}

function MusicIcon({ playing }: { playing: boolean }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
      {playing ? (
        <span className="flex items-end gap-[2px] h-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="xmas-eq w-[2.5px] rounded-full bg-gold" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
          <path d="M3 3l18 18" className="text-gold" stroke="currentColor" />
        </svg>
      )}
    </span>
  );
}
