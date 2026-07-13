
import { useEffect, useState, type FormEvent } from "react";
import {
  MapPin,
  ChevronDown,
  Plus,
  Minus,
  Phone,
  Mail,
  Clock,
  Instagram,
  ArrowRight,
  Star,
  Quote,
  Sparkles,
  PartyPopper,
  Users,
  Briefcase,
  Presentation,
  Utensils,
  Send,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { WeReserveWidgetClient } from "@/components/wereserve-widget-client";
import coffeeImg from "@/assets/sfeer-coffee.png";
import lunchImg from "@/assets/sfeer-sandwich.png";
import cocktailsImg from "@/assets/sfeer-cocktails.png";
import dinnerImg from "@/assets/sfeer-burger.png";
import terraceImg from "@/assets/sfeer-terras.png";
import beersImg from "@/assets/sfeer-beers.png";

import aboutFacadeAsset from "@/assets/about-facade.png";
import aboutLunchAsset from "@/assets/about-lunch.png";
import historicFacade1 from "@/assets/historic-facade-1.jpg";
import historicFacade2 from "@/assets/historic-facade-2.jpg";
import daveImg from "@/assets/dave-portrait.jpg";
import drinksImg from "@/assets/drinks.jpg";
import interiorImg from "@/assets/interior.jpg";
import dessertImg from "@/assets/dessert.jpg";
import logoAsset from "@/assets/vreeburg-logo.png";
import headerLogoAsset from "@/assets/vreeburg-logo-header.png";
import heroSketchAsset from "@/assets/hero-sketch.png";

export default function IndexPage() {
  return <Index />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#over", label: "Over ons" },
    { href: "#menu", label: "Menukaart" },
    { href: "#galerij", label: "Galerij" },
    { href: "#events", label: "Vieren & zakelijk" },
    { href: "#werken", label: "Werken bij" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border py-3"
          : "bg-cream/80 border-transparent py-6"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" aria-label="Grand Café Vreeburg" className="flex items-center">
          <img
            src={headerLogoAsset}
            alt="Grand Café Vreeburg"
            className={`h-7 md:h-10 w-auto transition-all duration-500`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-underline transition-colors ${
                scrolled ? "text-foreground/80 hover:text-bordeaux" : "text-foreground/80 hover:text-bordeaux"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="hidden md:inline-flex btn-primary px-4 py-2 text-xs md:text-sm wereserve-cta"
          >
            Reserveren
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden grid h-9 w-9 place-items-center rounded-lg border ${
              scrolled ? "border-border text-foreground" : "border-foreground/40 text-foreground"
            }`}
          >
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 rounded-xl border border-border bg-background/95 backdrop-blur p-5 space-y-3 shadow-lg">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-foreground/90 hover:text-bordeaux"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="btn-primary w-full wereserve-cta"
          >
            Reserveren
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      <img
        src={heroSketchAsset}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-[36%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[min(680px,94vw)] md:max-w-[900px] h-auto max-h-[66vh] md:max-h-[78vh] object-contain opacity-30 contrast-125 pointer-events-none select-none"
      />
      <div className="relative z-10 container-x text-center text-foreground drop-shadow-[0_1px_10px_rgba(240,237,225,0.95)]">
        <p className="reveal eyebrow text-bordeaux mb-6">Welkom bij Grand Café Vreeburg</p>
        <h1 className="sr-only">Grand Café Vreeburg</h1>
        <img
          src={logoAsset}
          alt="Grand Café Vreeburg — eten & drinken"
          className="reveal delay-1 mx-auto mb-6 w-[min(560px,82vw)]"
        />
        <p className="reveal delay-2 max-w-xl mx-auto text-foreground text-lg md:text-xl font-normal">
          Vanaf 7 juli openen wij onze deuren aan het Kerkplein 16 in Bloemendaal.
        </p>

        <div className="reveal delay-3 mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="btn-primary wereserve-cta"
          >
            Reserveer een tafel
          </button>
          <a href="#menu" className="btn-ghost bg-cream/55 backdrop-blur-sm border-foreground/40 hover:bg-foreground hover:text-cream hover:border-foreground">
            Bekijk menukaart <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <a
        href="#over"
        aria-label="Scroll naar beneden"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/70 hover:text-foreground transition-colors scroll-bob"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="over" className="relative py-28 md:py-40">
      <div className="container-x">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 reveal-left">
            <p className="eyebrow mb-5">Over ons</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
              Een vertrouwde naam, <span className="italic text-bordeaux">een nieuw hoofdstuk</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              Vreeburg is al jarenlang een vertrouwde naam in Bloemendaal en heeft in juli 2026
              haar deuren heropend als een eigentijdse ontmoetingsplek waar gastvrijheid,
              kwaliteit en gezelligheid samenkomen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Met trots bouwen wij voort op de rijke historie en geven wij Vreeburg een nieuwe
              toekomst als de huiskamer van Bloemendaal, onder de naam Grand Café Vreeburg.
            </p>
          </div>

          <div className="lg:col-span-6 reveal-right">
            <figure className="relative">
              <div className="img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-lift)]">
                <img
                  src={historicFacade1}
                  alt="Historische gevel van Vreeburg met restaurantbord"
                  loading="lazy"
                  className="w-full h-[440px] md:h-[520px] object-cover sepia-[0.15]"
                />
              </div>
              <figcaption className="absolute -bottom-4 left-4 md:left-6 bg-background px-4 py-2 rounded-md shadow-[var(--shadow-soft)] text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Vreeburg, door de jaren heen
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 md:my-28 flex items-center gap-6 reveal">
          <div className="h-px flex-1 bg-border" />
          <span className="font-display italic text-bordeaux text-lg">Een plek met geschiedenis</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Heritage block */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 reveal-left">
            <figure className="relative">
              <div className="img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-lift)]">
                <img
                  src={historicFacade2}
                  alt="Historisch terras van Vreeburg aan het Kerkplein"
                  loading="lazy"
                  className="w-full h-[420px] md:h-[520px] object-cover sepia-[0.1]"
                />
              </div>
            </figure>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 reveal-right">
            <h3 className="font-display text-3xl md:text-4xl leading-tight mb-8">
              Aan het <span className="italic text-bordeaux">Kerkplein</span>, het kloppend hart van Bloemendaal.
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              Gelegen op een van de mooiste plekken van het dorp, rondom de karakteristieke
              kerk aan het Kerkplein, zijn inwoners, bezoekers en passanten meer dan welkom
              voor een ontspannen lunch, sfeervol diner of gezellige borrel.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Of u nu langskomt voor een kop koffie op het terras, een diner met familie en
              vrienden, een zakelijke afspraak of een feestelijke gelegenheid, bij Grand Café
              Vreeburg is iedereen welkom.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <a href="#menu" className="link-underline text-bordeaux font-medium">
                Bekijk onze menukaart →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: coffeeImg, label: "Koffie", h: "h-[420px]" },
    { src: cocktailsImg, label: "Cocktails", h: "h-[300px]" },
    { src: lunchImg, label: "Lunch", h: "h-[360px]" },
    { src: dinnerImg, label: "Diner", h: "h-[440px]" },
    { src: beersImg, label: "Wijn & Bier", h: "h-[320px]" },
    { src: terraceImg, label: "Terras", h: "h-[400px]" },
  ];
  return (
    <section id="galerij" className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <div className="reveal-left">
            <p className="eyebrow mb-4">Galerij</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Een dag bij <span className="italic text-bordeaux">Vreeburg</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md md:justify-self-end reveal-right">
            Van de eerste espresso om half tien tot het laatste glas rode wijn, elk moment van de
            dag heeft zijn eigen ritme.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`reveal-zoom delay-${(i % 4) + 1} mb-4 md:mb-6 break-inside-avoid img-zoom rounded-xl overflow-hidden relative group`}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                className={`w-full ${it.h} object-cover`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <span className="text-cream font-display text-xl italic">{it.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const lunchPdf = { url: "/menus/lunch.pdf" };
const dinerPdf = { url: "/menus/diner.pdf" };
const barBitesPdf = { url: "/menus/bar-bites.pdf" };
const drankenPdf = { url: "/menus/dranken.pdf" };
const wijnkaartPdf = { url: "/menus/wijnkaart.pdf" };

type MenuCard = {
  id: string;
  label: string;
  tagline: string;
  url: string;
};

const MENU_CARDS: MenuCard[] = [
  { id: "lunch", label: "Lunch", tagline: "Broodjes, salades en klassiekers", url: lunchPdf.url },
  { id: "diner", label: "Diner", tagline: "Voor-, hoofd- en bijgerechten", url: dinerPdf.url },
  { id: "bar-bites", label: "Bar Bites", tagline: "Om te delen bij de borrel", url: barBitesPdf.url },
  { id: "dranken", label: "Dranken", tagline: "Koffie, fris, bier & cocktails", url: drankenPdf.url },
  { id: "wijnen", label: "Wijnkaart", tagline: "Zorgvuldig geselecteerde wijnen", url: wijnkaartPdf.url },
];

function MenuSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = MENU_CARDS.find((m) => m.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  return (
    <section id="menu" className="py-28 md:py-36 relative overflow-hidden bg-foreground text-cream">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[50vw] h-[50vw] rounded-full bg-bordeaux/20 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow text-gold mb-4">Menukaart</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-cream">
            Onze <span className="italic text-gold">kaart</span>
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto">
            Kies een categorie om de bijbehorende menukaart te bekijken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 max-w-6xl mx-auto">
          {MENU_CARDS.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setOpenId(card.id)}
              className={`reveal-zoom delay-${(i % 5) + 1} group text-left bg-cream/[0.03] border border-cream/10 rounded-2xl p-6 md:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_28px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.25),0_20px_40px_-16px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-gold/30 hover:bg-cream/[0.06] transition-all duration-500 cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gold/10 blur-2xl pointer-events-none group-hover:bg-gold/20 transition-colors" />
              <div className="relative">
                <Utensils className="h-6 w-6 text-gold mb-4" />
                <h3 className="font-display text-xl md:text-2xl leading-tight mb-1 text-cream">
                  {card.label}
                </h3>
                <p className="text-sm text-cream/60 leading-snug mb-5">
                  {card.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold link-underline">
                  Bekijk kaart <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-16 reveal">
          <button type="button" className="btn-primary wereserve-cta">
            Reserveer een tafel
          </button>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center p-0 sm:p-3 md:p-6 bg-foreground/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpenId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Menukaart ${active.label}`}
        >
          <div
            className="relative w-full h-full sm:h-[95vh] md:h-[90vh] max-w-6xl bg-card sm:rounded-2xl shadow-[var(--shadow-lift)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 md:px-7 py-3 md:py-4 border-b border-border bg-card">
              <div className="min-w-0">
                <p className="eyebrow text-[0.65rem]">Menukaart</p>
                <h3 className="font-display text-lg md:text-2xl leading-tight truncate">
                  {active.label}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-bordeaux transition-colors px-2.5 sm:px-3 py-1.5 rounded-md border border-border hover:border-bordeaux/50"
                >
                  <span className="hidden sm:inline">Openen in nieuw tabblad</span>
                  <span className="sm:hidden">Openen</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  aria-label="Sluiten"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-bordeaux hover:border-bordeaux/50 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4 rotate-45" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-muted overflow-auto">
              <object
                key={active.id}
                data={`${active.url}#view=FitH&zoom=page-width&toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-full border-0 block"
                aria-label={`Menukaart ${active.label}`}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Je browser kan deze PDF niet direct tonen. Open de menukaart in een nieuw tabblad.
                  </p>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Open {active.label}
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



type RequestFormProps = {
  kind: "vieren" | "zakelijk";
  idPrefix: string;
  accent?: "bordeaux" | "gold";
};

function RequestForm({ kind, idPrefix, accent = "bordeaux" }: RequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: hook up to backend endpoint
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  };

  const btnClass =
    accent === "gold"
      ? "inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-4 rounded-xl bg-gold text-foreground font-medium hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all duration-500"
      : "btn-primary w-full sm:w-auto";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)] animate-[fade-in_0.5s_ease-out]">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-bordeaux">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h4 className="font-display text-2xl md:text-3xl mb-3">Bedankt voor je aanvraag</h4>
        <p className="text-muted-foreground max-w-md mx-auto">
          We hebben je bericht ontvangen en nemen zo spoedig mogelijk contact met je op om de
          {kind === "vieren" ? " viering" : " bijeenkomst"} samen vorm te geven.
        </p>
      </div>
    );
  }

  const inputClass =
    "peer w-full bg-transparent border-0 border-b border-border focus:border-bordeaux focus:ring-0 outline-none py-3 text-sm md:text-base placeholder-transparent transition-colors";
  const labelClass =
    "pointer-events-none absolute left-0 top-3 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-bordeaux peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs";
  const fieldClass = "relative pt-2";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-[var(--shadow-soft)]"
    >
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        <div className={fieldClass}>
          <input id={`${idPrefix}-naam`} name="naam" type="text" required placeholder="Naam" className={inputClass} />
          <label htmlFor={`${idPrefix}-naam`} className={labelClass}>Naam</label>
        </div>
        <div className={fieldClass}>
          <input id={`${idPrefix}-email`} name="email" type="email" required placeholder="E-mailadres" className={inputClass} />
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>E-mailadres</label>
        </div>
        <div className={fieldClass}>
          <input id={`${idPrefix}-tel`} name="telefoon" type="tel" placeholder="Telefoonnummer" className={inputClass} />
          <label htmlFor={`${idPrefix}-tel`} className={labelClass}>Telefoonnummer</label>
        </div>
        <div className={fieldClass}>
          <input id={`${idPrefix}-datum`} name="datum" type="date" required placeholder="Datum" className={`${inputClass} text-foreground`} />
          <label htmlFor={`${idPrefix}-datum`} className={`${labelClass} -top-2 text-xs`}>Datum</label>
        </div>
        <div className={`${fieldClass} sm:col-span-2`}>
          <input id={`${idPrefix}-personen`} name="personen" type="number" min={1} required placeholder="Aantal personen" className={inputClass} />
          <label htmlFor={`${idPrefix}-personen`} className={labelClass}>Aantal personen</label>
        </div>
        <div className={`${fieldClass} sm:col-span-2`}>
          <textarea id={`${idPrefix}-bericht`} name="bericht" rows={4} placeholder="Bericht" className={`${inputClass} resize-none`} />
          <label htmlFor={`${idPrefix}-bericht`} className={labelClass}>Bericht</label>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-muted-foreground">We reageren meestal binnen 24 uur.</p>
        <button type="submit" disabled={loading} className={btnClass}>
          {loading ? "Versturen…" : "Aanvraag versturen"} <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function Events() {
  const [open, setOpen] = useState<"vieren" | "zakelijk" | null>(null);

  const cards = [
    {
      key: "vieren" as const,
      eyebrow: "Feesten & vieringen",
      eyebrowIcon: Sparkles,
      title: "Iets te vieren",
      titleAccent: "vieren",
      image: cocktailsImg,
      paragraphs: [
        "Iets te vieren? Bij Grand Café Vreeburg bent u aan het juiste adres! Of u nu een informeel diner of een groots feest wilt geven, wij denken graag met u mee om uw viering onvergetelijk te maken!",
        "Graag nemen wij de tijd om uw wensen te bespreken en een voorstel op maat te maken: van de ontvangst tot het laatste drankje zorgt ons team ervoor dat u en uw gasten onbezorgd kunnen genieten.",
      ],
      idPrefix: "vier",
    },
    {
      key: "zakelijk" as const,
      eyebrow: "Zakelijk",
      eyebrowIcon: Briefcase,
      title: "Zakelijke bijeenkomst",
      titleAccent: "bijeenkomst",
      image: interiorImg,
      paragraphs: [
        "Op zoek naar een informele locatie voor een vergadering, presentatie, training of zakelijke bijeenkomst? De aparte zaal van Grand Café Vreeburg biedt een comfortabele en informele omgeving voor bijeenkomsten tot 35 personen.",
        "Wij denken graag met u mee over het verloop van de bijeenkomst: de inrichting van de zaal, de gewenste opstelling en de culinaire invulling van de dag. Wij nemen dit graag uit handen zodat u zich volledig kunt richten op uw gasten en de inhoud van uw bijeenkomst.",
      ],
      idPrefix: "zak",
    },
  ];

  return (
    <section id="events" className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-bordeaux/10 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <p className="eyebrow mb-3">Vieren & zakelijk</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Maak van uw moment <span className="italic text-bordeaux">iets bijzonders</span>
          </h2>
        </div>

        <div id="vieren" className="sr-only" aria-hidden />
        <div id="zakelijk" className="sr-only" aria-hidden />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {cards.map((c, i) => {
            const isOpen = open === c.key;
            const Icon = c.eyebrowIcon;
            return (
              <article
                key={c.key}
                className={`reveal delay-${i + 1} group rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] flex flex-col`}
              >
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/95 backdrop-blur text-[10px] uppercase tracking-[0.18em] text-foreground">
                    <Icon className="h-3 w-3 text-bordeaux" />
                    {c.eyebrow}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4">
                    {c.title.split(c.titleAccent)[0]}
                    <span className="italic text-bordeaux">{c.titleAccent}</span>
                    {c.title.split(c.titleAccent)[1]}
                  </h3>
                  <div className="space-y-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed flex-1">
                    {c.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : c.key)}
                    aria-expanded={isOpen}
                    className="mt-6 inline-flex items-center justify-between gap-3 w-full px-5 py-3 rounded-xl border border-border hover:border-bordeaux/50 hover:bg-bordeaux/[0.03] transition-all duration-300 group/btn"
                  >
                    <span className="inline-flex items-center gap-3 text-sm font-medium">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full border border-border text-bordeaux transition-all duration-500 ${
                          isOpen ? "bg-bordeaux text-cream border-bordeaux rotate-180" : ""
                        }`}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                      Aanvraagformulier
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover/btn:text-bordeaux transition-colors">
                      {isOpen ? "Sluit" : "Open"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-700 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <RequestForm kind={c.key} idPrefix={c.idPrefix} accent="bordeaux" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Careers() {
  const jobs = [
    { title: "Keuken", desc: "Koks en assistenten met passie voor eerlijke, verse producten." },
    { title: "Bediening", desc: "Gastvrije collega's die ieder bezoek nét wat mooier maken." },
    { title: "Afwas", desc: "De stille kracht achter een goed draaiende keuken." },
  ];
  return (
    <section id="werken" className="py-28 md:py-36 bg-foreground text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={interiorImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 mb-14 items-end">
          <div className="lg:col-span-7 reveal-left">
            <p className="eyebrow text-gold mb-5">Werken bij</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Wij zoeken <span className="italic text-gold">collega’s!</span>
            </h2>
          </div>
          <div className="lg:col-span-5 text-cream/75 reveal-right space-y-4">
            <p>
              De voorbereidingen voor de opening van Grand Café Vreeburg zijn in volle gang. Daarom zijn wij op zoek naar enthousiaste collega’s die samen met ons willen bouwen aan iets moois.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12">
          {jobs.map((j, i) => (
            <div
              key={j.title}
              className={`reveal delay-${i + 1} group p-8 rounded-xl border border-cream/15 bg-cream/[0.04] backdrop-blur transition-all duration-500 hover:bg-cream/[0.08] hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-3xl">{j.title}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/30 transition-transform duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <p className="text-cream/70 text-sm leading-relaxed">{j.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl reveal">
          <p className="text-cream/85 text-lg leading-relaxed mb-6">
            Of je nu graag in de keuken staat, energie krijgt van gasten ontvangen of liever achter de schermen zorgt dat alles op rolletjes loopt; we hebben plek voor jou.
          </p>
          <p className="text-cream/75 leading-relaxed mb-8">
            Lijkt het je leuk om vanaf het begin onderdeel te zijn van een nieuw team, mee te denken en samen een plek neer te zetten waar gastvrijheid, kwaliteit en gezelligheid centraal staan? Dan maken we graag kennis met je!
          </p>
          <a
            href="mailto:dave@grandcafevreeburg.nl"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gold text-foreground font-medium hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all duration-500"
          >
            Mail naar dave@grandcafevreeburg.nl <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Dave() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5 reveal-left order-2 lg:order-1">
          <div className="relative">
            <div className="img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-lift)] max-w-md">
              <img src={daveImg} alt="Dave, gastheer van Grand Café Vreeburg" loading="lazy" className="w-full h-[560px] object-cover object-top" />
            </div>
            <div className="absolute -bottom-6 -right-2 md:-right-10 bg-cream rounded-xl p-6 max-w-[240px] shadow-[var(--shadow-lift)] border border-border">
              <Quote className="h-5 w-5 text-bordeaux mb-3" />
              <p className="font-display italic text-lg leading-snug">
                "Iedereen die binnenkomt moet zich welkom voelen."
              </p>
              <p className="text-xs text-muted-foreground mt-3">— Dave</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 reveal-right order-1 lg:order-2">
          <p className="eyebrow mb-5">Maak kennis met</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
            Achter Grand Café Vreeburg staat een vertrouwd <span className="italic text-bordeaux">gezicht</span> in de horeca: Dave.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
            Met zijn passie voor gastvrijheid, oog voor kwaliteit en liefde voor mooie momenten brengt hij straks een plek tot leven waar iedereen zich welkom voelt. Een grand café waar je binnenloopt voor een goede kop koffie, blijft hangen voor een gezellige borrel en graag terugkomt voor een heerlijk diner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dave gelooft in kleine gebaren, eerlijke producten en een goed glas wijn op het juiste moment. We kijken ernaar uit je te verwelkomen.
          </p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const data = [
    {
      name: "Mariska",
      text: "Heerlijk gegeten en wat een gastvrijheid. Dit wordt onze nieuwe vaste stek in Bloemendaal.",
    },
    {
      name: "Jeroen",
      text: "Beste cappuccino van het dorp en een prachtig interieur. De zaterdagochtenden zijn weer compleet.",
    },
    {
      name: "Familie van der Linden",
      text: "Fijn diner, prachtige wijnen en een team dat oprecht aandacht heeft. We komen terug.",
    },
    {
      name: "Sophie",
      text: "Het terras is een verademing op een zonnige dag. Aperol Spritz en zon — meer heb je niet nodig.",
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % data.length), 6000);
    return () => clearInterval(t);
  }, [data.length]);

  return (
    <section className="py-28 md:py-36 bg-secondary/40">
      <div className="container-x max-w-4xl text-center">
        <p className="eyebrow mb-5 reveal">Wat gasten zeggen</p>
        <div className="flex justify-center gap-1 mb-6 reveal">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <div className="flex justify-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-border/50 shadow-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-xs font-medium text-muted-foreground tracking-wide">Google Reviews</span>
          </div>
        </div>

        <div className="relative min-h-[160px] reveal">
          {data.map((r, idx) => (
            <blockquote
              key={r.name}
              className={`absolute inset-0 transition-all duration-700 ${
                i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="font-display text-2xl md:text-3xl leading-snug italic">"{r.text}"</p>
              <footer className="mt-6 text-sm text-muted-foreground tracking-wide uppercase">
                — {r.name}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Review ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-10 bg-bordeaux" : "w-4 bg-border hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramFeed() {
  const posts = [
    { img: coffeeImg, caption: "Goedemorgen Bloemendaal ☕" },
    { img: cocktailsImg, caption: "Vrijdagavond signature ✨" },
    { img: lunchImg, caption: "Lunch met zon op het terras" },
    { img: dinnerImg, caption: "Vanavond op de kaart" },
    { img: beersImg, caption: "Proost 🍺" },
    { img: terraceImg, caption: "Aan het Kerkplein" },
  ];
  return (
    <section className="py-28 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal-left">
            <p className="eyebrow mb-4">Volg ons</p>
            <h2 className="font-display text-4xl md:text-5xl">
              @grandcafe<span className="italic text-bordeaux">vreeburg</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/grandcafevreeburg/"
            target="_blank"
            rel="noreferrer noopener"
            className="reveal-right inline-flex items-center gap-2 link-underline text-bordeaux font-medium"
          >
            <Instagram className="h-4 w-4" /> Bekijk Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {posts.map((p, i) => (
            <a
              key={i}
              href="https://www.instagram.com/grandcafevreeburg/"
              target="_blank"
              rel="noreferrer noopener"
              className={`reveal-zoom delay-${(i % 4) + 1} img-zoom rounded-xl overflow-hidden relative group aspect-square block`}
            >
              <img src={p.img} alt={p.caption} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-cream p-3 text-center">
                <Instagram className="h-6 w-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contactItems = [
    {
      icon: MapPin,
      label: "Adres",
      value: "Kerkplein 16, Bloemendaal",
      href: "https://www.google.com/maps?q=Kerkplein+16+Bloemendaal",
      cta: "Route",
    },
    {
      icon: Phone,
      label: "Telefoon",
      value: "+31 (0)23 74 30 125",
      href: "tel:+31237430125",
      cta: "Bel",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "Info@grandcafevreeburg.nl",
      href: "mailto:Info@grandcafevreeburg.nl",
      cta: "Mail",
    },
  ];

  const hours: [string, string][] = [
    ["Maandag", "Gesloten"],
    ["Dinsdag – Zondag", "12:00 – 00:00"],
  ];
  const kitchenNote = "Keuken tot 22:00";

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30 border-t border-border">
      <div className="container-x grid lg:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="lg:col-span-5 reveal-left">
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
            Tot ziens aan het <span className="italic text-bordeaux">Kerkplein</span>.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
            Loop binnen voor koffie, lunch, borrel of diner. Reserveren kan telefonisch of direct online.
          </p>
          <button
            type="button"
            className="btn-primary mb-10 wereserve-cta"
          >
            Direct reserveren
          </button>

          <div className="border-y border-border divide-y divide-border mb-8">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-5 py-4"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-bordeaux" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="block truncate text-sm md:text-base">{item.value}</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-bordeaux transition-transform group-hover:translate-x-1">
                    {item.cta} →
                  </span>
                </a>
              );
            })}
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-bordeaux" />
              Openingstijden
            </div>
            <ul className="space-y-2 text-sm">
              {hours.map(([day, time]) => (
                <li key={day} className="flex justify-between gap-6">
                  <span className="text-muted-foreground">{day}</span>
                  <span className={time === "Gesloten" ? "italic text-muted-foreground" : "tabular-nums"}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{kitchenNote}</p>
          </div>
        </div>

        <div className="lg:col-span-7 reveal-right">
          <div className="overflow-hidden rounded-xl border border-border h-[300px] md:h-[390px]">
            <iframe
              title="Locatie Grand Café Vreeburg"
              src="https://www.google.com/maps?q=Kerkplein+16+Bloemendaal&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm">
            <p className="text-muted-foreground">Kerkplein 16 Bloemendaal</p>
            <a
              href="https://www.google.com/maps?q=Kerkplein+16+Bloemendaal"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium text-bordeaux"
            >
              Bekijk route →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-cream/80 pt-20 pb-10">
      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <img
              src={logoAsset}
              alt="Grand Café Vreeburg"
              className="h-16 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-cream/60 max-w-sm text-sm leading-relaxed">
              Ontmoeten. Genieten. Samen proosten. Een warm grand café aan het Kerkplein in
              Bloemendaal.
            </p>
          </div>
          <div>
            <p className="text-cream font-medium mb-4 text-sm uppercase tracking-wider">Menu</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#over" className="link-underline">Over ons</a></li>
              <li><a href="#menu" className="link-underline">Menukaart</a></li>
              <li><a href="#werken" className="link-underline">Werken bij</a></li>
              <li><a href="#contact" className="link-underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-cream font-medium mb-4 text-sm uppercase tracking-wider">Contact</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Kerkplein 16</li>
              <li>Bloemendaal</li>
              <li>
                <a href="mailto:Info@grandcafevreeburg.nl" className="link-underline">
                  Info@grandcafevreeburg.nl
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/grandcafevreeburg/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 link-underline"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Grand Café Vreeburg. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-cream/60">
            <span><span className="text-cream/40 mr-1.5">KVK</span><span className="text-cream/80 font-medium">42035923</span></span>
            <span className="h-3 w-px bg-cream/20" aria-hidden />
            <span><span className="text-cream/40 mr-1.5">BTW</span><span className="text-cream/80 font-medium">NL8694.11.937.B01</span></span>
          </div>
          <p>Bloemendaal — met liefde gemaakt.</p>
        </div>
    </footer>
  );
}

function MobileReserveButton() {
  return (
    <button
      type="button"
      className="md:hidden fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full btn-primary px-4 py-3 shadow-lg wereserve-cta"
      aria-label="Reserveer een tafel"
    >
      <Calendar className="h-4 w-4" />
      <span className="text-sm font-medium">Reserveer</span>
    </button>
  );
}

function Index() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <WeReserveWidgetClient />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <MenuSection />
      <Events />
      <Careers />
      <Dave />
      <Reviews />
      <InstagramFeed />
      <Contact />
      <Footer />
      <MobileReserveButton />
    </main>
  );
}
