import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChristmasTheme } from "@/lib/christmas-theme";
import { GoldDivider, HangingBaubles, LightString, PineBranch, Star } from "@/components/christmas-decor";

const TRACKS = ["/audio/merry-christmas-everyone.mp3", "/audio/last-christmas.mp3", "/audio/sleigh-ride.mp3"];

/** Geschudde volgorde; begint nooit met het nummer dat net speelde. */
function shuffled(last?: string) {
  const a = [...TRACKS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (last && a[0] === last) [a[0], a[a.length - 1]] = [a[a.length - 1], a[0]];
  return a;
}
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
    <div className="absolute inset-x-0 bottom-full mb-2 md:mb-3 pointer-events-none normal-case tracking-normal text-center [text-shadow:0_2px_14px_rgba(0,0,0,0.65)]">
      <p className="font-display italic text-gold xmas-gold-text text-[1.65rem] md:text-4xl leading-none">Fijne feestdagen</p>
      <p className="hidden mt-2 items-center justify-center gap-2 md:gap-3 whitespace-nowrap text-champagne text-[9.5px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.28em]">
        <Star className="h-2.5 w-2.5" />
        Vier de feestdagen bij Vreeburg
        <Star className="h-2.5 w-2.5" />
      </p>
    </div>
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
  const [home, header, gallery, menu, agenda, events, werken, over, contact, footer] = useTargets([
    "#home",
    "header",
    "#galerij",
    "#menu",
    "#agenda",
    "#events",
    "#werken",
    "#over",
    "#contact",
    "main > footer",
  ]);
  const p = (el: Element | null, node: React.ReactNode) => (el ? createPortal(node, el) : null);
  const branchL = (cls: string, opts: { ornaments?: boolean } = {}) => (
    <PineBranch ornaments={opts.ornaments ?? false} className={`${corner} ${cls}`} />
  );
  const branchR = (cls: string, opts: { ornaments?: boolean } = {}) => (
    <PineBranch ornaments={opts.ornaments ?? false} className={`${corner} -scale-x-100 ${cls}`} />
  );
  return (
    <>
      {p(
        home,
        <div aria-hidden="true" className="xmas-decor">
          <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,200,120,0.22),transparent_55%),linear-gradient(to_bottom,rgba(22,48,31,0.55),transparent_35%,transparent_70%,rgba(22,48,31,0.7))]" />
          <LightString className="absolute inset-x-0 top-[58px] md:top-[84px] h-7 md:h-9 w-full z-[1]" count={26} />
          {/* bovenhoeken: rijke takken; op mobiel smaller en hoger zodat logo en tekst vrij blijven */}
          {branchL("-left-10 -top-6 w-[64vw] max-w-[620px] md:w-[44vw] drop-shadow-[0_10px_22px_rgba(0,0,0,0.5)]", { ornaments: true })}
          {branchR("-right-10 -top-6 w-[64vw] max-w-[620px] md:w-[44vw] drop-shadow-[0_10px_22px_rgba(0,0,0,0.5)]", { ornaments: true })}
          {branchL("hidden md:block -left-16 top-[22%] w-[22vw] max-w-[300px] rotate-[18deg] opacity-90")}
          {branchR("hidden md:block -right-16 top-[22%] w-[22vw] max-w-[300px] -rotate-[18deg] opacity-90")}
          <HangingBaubles className="hidden md:block absolute left-[3%] top-[70px] h-[260px] w-[120px] z-[1]" items={[{ x: 20, len: 120, r: 11, red: true }, { x: 60, len: 70, r: 8 }, { x: 88, len: 160, r: 9 }]} />
          <HangingBaubles className="hidden md:block absolute right-[3%] top-[70px] h-[260px] w-[120px] z-[1]" items={[{ x: 12, len: 150, r: 9 }, { x: 44, len: 80, r: 11, red: true }, { x: 82, len: 120, r: 8 }]} />
          {branchL("md:hidden -left-12 bottom-14 w-[52vw] rotate-[-160deg] opacity-80 scale-y-[-1]")}
          {branchR("md:hidden -right-12 bottom-14 w-[52vw] rotate-[160deg] opacity-80 scale-y-[-1]")}
          <div className="xmas-snowglow absolute inset-0 z-[1] pointer-events-none" />
        </div>,
      )}
      {p(header, <span aria-hidden="true" className="xmas-decor xmas-navline" />)}
      {p(
        gallery,
        <div aria-hidden="true" className="xmas-decor">
          <LightString className="absolute inset-x-0 top-0 h-8 w-full z-[1]" count={24} />
          {branchR("-right-10 -top-4 w-[44vw] max-w-[340px]", { ornaments: true })}
          <GoldDivider className="absolute bottom-8 inset-x-0 z-[1]" />
        </div>,
      )}
      {p(
        menu,
        <div aria-hidden="true" className="xmas-decor">
          {branchL("-left-10 -top-5 w-[48vw] max-w-[380px]", { ornaments: true })}
          {branchR("-right-10 -top-5 w-[48vw] max-w-[380px]", { ornaments: true })}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        </div>,
      )}
      {p(
        agenda,
        <div aria-hidden="true" className="xmas-decor">
          {branchL("-left-10 -top-4 w-[40vw] max-w-[320px]", { ornaments: true })}
          <Star className={`${corner} right-[8%] top-16 h-4 w-4`} />
          <Star className={`${corner} right-[16%] top-28 h-2.5 w-2.5 opacity-70`} />
          <Star className={`${corner} left-[10%] bottom-16 h-3 w-3 opacity-60`} />
        </div>,
      )}
      {p(
        events,
        <div aria-hidden="true" className="xmas-decor">
          <LightString className="absolute inset-x-0 top-0 h-8 md:h-10 w-full z-[1]" count={22} />
          {branchR("-right-10 -bottom-2 w-[36vw] max-w-[280px] scale-y-[-1] opacity-90")}
        </div>,
      )}
      {p(
        werken,
        <div aria-hidden="true" className="xmas-decor">
          <div className="absolute -top-20 right-[8%] h-72 w-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
          {branchR("-right-10 -top-4 w-[44vw] max-w-[340px]", { ornaments: true })}
          <Star className={`${corner} left-[10%] top-14 h-4 w-4`} />
        </div>,
      )}
      {p(over, <GoldDivider className="xmas-decor absolute top-8 md:top-12 inset-x-0 z-[1]" />)}
      {p(contact, <div aria-hidden="true" className="xmas-decor">{branchL("-left-8 -top-3 w-[42vw] max-w-[320px]", { ornaments: true })}</div>)}
      {p(
        footer,
        <div aria-hidden="true" className="xmas-decor">
          <LightString className="absolute inset-x-0 top-0 h-8 w-full z-[1]" count={24} />
          {branchR("-right-8 -top-3 w-[42vw] max-w-[320px]", { ornaments: true })}
        </div>,
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
    let queue = shuffled();
    let current = queue.shift()!;
    audio.src = current;
    const onEnded = () => {
      if (!queue.length) queue = shuffled(current);
      current = queue.shift()!;
      audio.src = current;
      audio.play().catch(() => {});
    };
    audio.addEventListener("ended", onEnded);
    audio.volume = 0.2;
    audio.preload = "metadata";
    audioRef.current = audio;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onPause);

    const wantsMusic = () => {
      try {
        return sessionStorage.getItem(PREF_KEY) !== "off";
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
      try { sessionStorage.setItem(PREF_KEY, "on"); } catch { /* */ }
      audio.play().catch(() => setPlaying(false));
    } else {
      try { sessionStorage.setItem(PREF_KEY, "off"); } catch { /* */ }
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
      className="xmas-music fixed z-50 left-4 bottom-[calc(16px+env(safe-area-inset-bottom))] md:left-auto md:right-6 md:bottom-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-foreground/95 text-champagne h-11 w-11 md:w-auto justify-center md:px-4 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:border-gold hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
