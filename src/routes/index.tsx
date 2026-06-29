import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { WeReserveWidgetClient } from "@/components/wereserve-widget-client";
import heroImg from "@/assets/hero-counter.png.asset.json";
import coffeeImg from "@/assets/coffee.jpg";
import lunchImg from "@/assets/lunch.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import dinnerImg from "@/assets/dinner.jpg";
import terraceImg from "@/assets/terrace.jpg";
import daveImg from "@/assets/dave-portrait.jpg.asset.json";
import drinksImg from "@/assets/drinks.jpg";
import interiorImg from "@/assets/interior.jpg";
import dessertImg from "@/assets/dessert.jpg";
import logoAsset from "@/assets/vreeburg-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Café Vreeburg — Bloemendaal" },
      {
        name: "description",
        content:
          "Grand Café Vreeburg in het hart van Bloemendaal. Ontmoeten, genieten en samen proosten. Koffie, lunch, borrel en diner aan het Kerkplein.",
      },
      { property: "og:title", content: "Grand Café Vreeburg — Bloemendaal" },
      {
        property: "og:description",
        content: "Ontmoeten. Genieten. Samen proosten. Kerkplein 16, Bloemendaal.",
      },
      { property: "og:image", content: heroImg.url },
    ],
  }),
  component: Index,
});

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
    { href: "#werken", label: "Werken bij" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" aria-label="Grand Café Vreeburg" className="flex items-center">
          <img
            src={logoAsset.url}
            alt="Grand Café Vreeburg"
            className={`h-10 md:h-12 w-auto transition-all duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-underline transition-colors ${
                scrolled ? "text-foreground/80 hover:text-bordeaux" : "text-cream/90 hover:text-cream"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="btn-primary px-4 py-2 text-xs md:text-sm wereserve-cta"
          >
            Reserveren
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden grid h-9 w-9 place-items-center rounded-lg border ${
              scrolled ? "border-border text-foreground" : "border-cream/50 text-cream"
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg.url}
        alt="Sfeervol interieur van Grand Café Vreeburg in Bloemendaal"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/45 to-foreground/80" />

      <div className="relative z-10 container-x text-center text-cream">
        <p className="reveal eyebrow text-gold mb-6">— Sinds 2026 · Kerkplein, Bloemendaal —</p>
        <h1 className="sr-only">Grand Café Vreeburg</h1>
        <img
          src={logoAsset.url}
          alt="Grand Café Vreeburg — eten & drinken"
          className="reveal delay-1 mx-auto mb-6 w-[min(560px,82vw)] brightness-0 invert"
        />
        <p className="reveal delay-2 max-w-xl mx-auto text-cream/85 text-lg md:text-xl font-light">
          Ontmoeten. Genieten. Samen proosten.
        </p>

        <div className="reveal delay-3 mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="btn-primary wereserve-cta"
          >
            Reserveer een tafel
          </button>
          <a href="#menu" className="btn-ghost-light">
            Bekijk menukaart <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <a
        href="#over"
        aria-label="Scroll naar beneden"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80 hover:text-cream transition-colors scroll-bob"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="over" className="relative py-28 md:py-40">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5 reveal-left">
          <p className="eyebrow mb-5">Over ons</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
            Een warm welkom in <span className="italic text-bordeaux">het hart</span> van Bloemendaal.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
            Aan het Kerkplein vind je een plek waar de dag rustig begint met een verse cappuccino
            en eindigt met een glas wijn onder kaarslicht.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Koffie, lunch, borrel of diner, bij Vreeburg ben je altijd thuis. Gastvrij, eerlijk en
            met liefde voor het ambacht.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <a href="#menu" className="link-underline text-bordeaux font-medium">
              Bekijk menukaart →
            </a>
            <a href="#contact" className="link-underline font-medium">
              Vind ons aan het Kerkplein →
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 relative reveal-right">
          <div className="relative grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-8 img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-lift)]">
              <img
                src={interiorImg}
                alt="Sfeer in het café"
                loading="lazy"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="col-span-4 mt-12 img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-soft)]">
              <img
                src={coffeeImg}
                alt="Verse cappuccino"
                loading="lazy"
                className="w-full h-[280px] object-cover"
              />
            </div>
            <div className="col-span-7 col-start-3 -mt-10 img-zoom rounded-xl overflow-hidden shadow-[var(--shadow-lift)] border-8 border-background relative z-10">
              <img
                src={terraceImg}
                alt="Terras aan het Kerkplein"
                loading="lazy"
                className="w-full h-[240px] object-cover"
              />
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
    { src: drinksImg, label: "Wijn & Bier", h: "h-[320px]" },
    { src: terraceImg, label: "Terras", h: "h-[400px]" },
  ];
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <div className="reveal-left">
            <p className="eyebrow mb-4">Sfeer</p>
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

const MENU = [
  {
    cat: "Koffie",
    items: [
      ["Espresso", "Single origin, donker gebrand", "3,20"],
      ["Cappuccino", "Met fluweelzachte melkschuim", "3,80"],
      ["Latte Macchiato", "Drie lagen, langzaam geserveerd", "4,20"],
      ["Verse muntthee", "Met honing", "3,60"],
    ],
  },
  {
    cat: "Lunch",
    items: [
      ["Burrata & tomaat", "Heirloom tomaten, basilicum, olijfolie", "13,50"],
      ["Tosti Vreeburg", "Old Amsterdam, truffelmayo, ui", "9,50"],
      ["Soep van de dag", "Met sourdough", "8,50"],
      ["Steak sandwich", "Bavette, mosterd, gekarameliseerde ui", "16,50"],
    ],
  },
  {
    cat: "Hoofdgerechten",
    items: [
      ["Zalmfilet", "Seizoensgroente, beurre blanc", "26,50"],
      ["Tournedos", "Pepersaus, frites, salade", "32,50"],
      ["Risotto met paddenstoelen", "Truffel, parmezaan", "22,00"],
      ["Catch of the day", "Vraag onze bediening", "MP"],
    ],
  },
  {
    cat: "Wijnen",
    items: [
      ["Sauvignon Blanc", "Loire, Frankrijk", "6,50"],
      ["Chardonnay", "Bourgogne", "7,50"],
      ["Pinot Noir", "Languedoc", "7,00"],
      ["Bordeaux Supérieur", "Château huiselijk", "8,50"],
    ],
  },
  {
    cat: "Bieren",
    items: [
      ["Pils van de tap", "Vers en koud", "3,20"],
      ["Witbier", "Met citroen", "4,20"],
      ["IPA lokaal", "Haarlem brouwerij", "5,50"],
      ["Trappist", "Donker en vol", "5,80"],
    ],
  },
  {
    cat: "Cocktails",
    items: [
      ["Negroni", "Klassiek, met sinaasappel", "11,50"],
      ["Aperol Spritz", "Bruisend en fris", "9,50"],
      ["Espresso Martini", "Vreeburg signature", "12,00"],
      ["Old Fashioned", "Bourbon, suiker, bitters", "12,50"],
    ],
  },
  {
    cat: "Desserts",
    items: [
      ["Chocolade fondant", "Vanille ijs, bramen", "9,50"],
      ["Crème brûlée", "Vanille uit Madagaskar", "8,50"],
      ["Kaasplankje", "Selectie van vier", "12,50"],
      ["Affogato", "Espresso over vanille ijs", "6,50"],
    ],
  },
];

function MenuSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="menu" className="py-28 md:py-36 relative">
      <div className="container-x max-w-5xl">
        <div className="text-center mb-14 reveal">
          <p className="eyebrow mb-4">Menukaart</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Eerlijk, vers en met <span className="italic text-bordeaux">karakter</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Onze kaart wisselt mee met het seizoen. Een kleine greep uit wat je bij ons vindt.
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)] overflow-hidden reveal">
          {MENU.map((g, i) => {
            const isOpen = open === i;
            return (
              <div key={g.cat} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 md:px-10 py-6 text-left group"
                >
                  <span className="font-display text-2xl md:text-3xl group-hover:text-bordeaux transition-colors">
                    {g.cat}
                  </span>
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-500 ${
                      isOpen ? "bg-bordeaux text-cream border-bordeaux rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-700 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-10 pb-8 grid sm:grid-cols-2 gap-x-10 gap-y-5">
                      {g.items.map(([name, desc, price]) => (
                        <div key={name} className="flex items-baseline gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-medium truncate">{name}</span>
                              <span className="flex-1 border-b border-dotted border-border/80 translate-y-[-3px]" />
                              <span className="text-bordeaux font-medium tabular-nums shrink-0">
                                € {price}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Careers() {
  const jobs = [
    { title: "Keuken", desc: "Sous-chefs en koks met passie voor verse producten." },
    { title: "Bediening", desc: "Gastvrije collega's die het verschil maken." },
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
            <p className="eyebrow text-gold mb-5">Werken bij Vreeburg</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Bouw met ons mee aan een <span className="italic text-gold">nieuw thuis</span> voor Bloemendaal.
            </h2>
          </div>
          <p className="lg:col-span-5 text-cream/75 reveal-right">
            We zoeken enthousiaste collega's die houden van gastvrijheid, kwaliteit en gezelligheid.
            Word onderdeel van een hecht team.
          </p>
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

        <div className="reveal">
          <a
            href="mailto:werken@grandcafevreeburg.nl"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gold text-foreground font-medium hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all duration-500"
          >
            Solliciteer direct <ArrowRight className="h-4 w-4" />
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
              <img src={daveImg.url} alt="Dave, gastheer van Grand Café Vreeburg" loading="lazy" className="w-full h-[560px] object-cover object-top" />
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
    { img: dessertImg, caption: "Zoete afsluiter" },
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
      value: "Kerkplein 16, 2061 JD Bloemendaal",
      href: "https://www.google.com/maps?q=Kerkplein+16,+2061+JD+Bloemendaal",
      cta: "Route",
    },
    {
      icon: Phone,
      label: "Telefoon",
      value: "023 — 500 00 00",
      href: "tel:+31235000000",
      cta: "Bel",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "hallo@grandcafevreeburg.nl",
      href: "mailto:hallo@grandcafevreeburg.nl",
      cta: "Mail",
    },
  ];

  const hours: [string, string][] = [
    ["Maandag", "Gesloten"],
    ["Dinsdag – Donderdag", "09:00 – 23:00"],
    ["Vrijdag – Zaterdag", "09:00 – 01:00"],
    ["Zondag", "10:00 – 22:00"],
  ];

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
          </div>
        </div>

        <div className="lg:col-span-7 reveal-right">
          <div className="overflow-hidden rounded-xl border border-border h-[300px] md:h-[390px]">
            <iframe
              title="Locatie Grand Café Vreeburg"
              src="https://www.google.com/maps?q=Kerkplein+16,+2061+JD+Bloemendaal&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm">
            <p className="text-muted-foreground">Kerkplein 16 · 2061 JD Bloemendaal</p>
            <a
              href="https://www.google.com/maps?q=Kerkplein+16,+2061+JD+Bloemendaal"
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
              src={logoAsset.url}
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
              <li>2061 JD Bloemendaal</li>
              <li>
                <a href="mailto:hallo@grandcafevreeburg.nl" className="link-underline">
                  hallo@grandcafevreeburg.nl
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

        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Grand Café Vreeburg. Alle rechten voorbehouden.</p>
          <p>Bloemendaal — met liefde gemaakt.</p>
        </div>
      </div>
    </footer>
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
      
      <Careers />
      <Dave />
      <Reviews />
      <InstagramFeed />
      <Contact />
      <Footer />
    </main>
  );
}
