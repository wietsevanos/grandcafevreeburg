import jazzFlyer from "@/assets/live-jazz-flyer.jpg";

export type AgendaEvent = {
  /** Unieke id */
  id: string;
  /** Naam van het evenement */
  title: string;
  /** Korte omschrijving */
  description: string;
  /** Tijd, bv. "15:00 - 18:00" */
  time?: string;
  /** Losse label boven de titel, bv. "Live muziek", "Pubquiz", "Comedy" */
  category?: string;
  /** Terugkerend? Dan worden alle datums getoond */
  recurring?: string;
  /** Alle datums (ISO yyyy-mm-dd) waarop het evenement plaatsvindt */
  dates: string[];
  /** Optionele afbeelding of flyer */
  image?: string;
  /** Optionele extra informatie, bv. prijs of aanmelden */
  details?: string[];
};

/**
 * Nieuw evenement toevoegen? Voeg simpelweg een object toe aan deze lijst.
 * Datums in het verleden worden automatisch weggelaten.
 */
export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "live-jazz",
    title: "Live Jazz — Hans Keune Trio",
    category: "Live muziek",
    recurring: "Elke 3e zondag van de maand",
    time: "15:00 - 18:00",
    description:
      "Elke derde zondag van de maand strijkt het Hans Keune Trio bij ons neer voor een middag vol warme, swingende jazz. Schuif aan met een glas wijn of een borrel en laat de zondag langzaam voorbijgaan.",
    dates: [
      "2026-09-20",
      "2026-10-18",
      "2026-11-15",
      "2027-01-17",
      "2027-02-21",
      "2027-03-21",
      "2027-04-18",
    ],
    image: jazzFlyer.url,
    details: ["Muzikale bijdrage € 6,50 p.p.", "Reserveren wordt aangeraden"],
  },
];
