import jazzFlyer from "@/assets/live-jazz-flyer.jpg";
import quizFlyer from "@/assets/quiz-time-flyer.png";

export type AgendaEvent = {
  /** Unieke id */
  id: string;
  /** Korte titel (alleen voor toegankelijkheid / alt-tekst) */
  title: string;
  /** De flyer of foto van het evenement */
  image: string;
  /**
   * Alle datums (ISO yyyy-mm-dd) waarop het evenement plaatsvindt.
   * Datums in het verleden vallen automatisch weg; is de lijst leeg,
   * dan verdwijnt het evenement van de website.
   */
  dates: string[];
};

/**
 * BEHEER
 * ------
 * Foto/evenement toevoegen:
 *   1. Zet de flyer in `src/assets/` en importeer hem bovenaan dit bestand.
 *   2. Voeg een object toe aan de lijst hieronder met id, title, image en dates.
 *
 * Foto/evenement verwijderen:
 *   Verwijder het object uit de lijst (of laat de datums verlopen).
 */
export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "live-jazz",
    title: "Live Jazz — Hans Keune Trio",
    image: jazzFlyer,
    dates: [
      "2026-09-20",
      "2026-10-18",
      "2026-11-15",
      "2027-01-17",
      "2027-02-21",
      "2027-03-21",
      "2027-04-18",
    ],
  },
  {
    id: "quiz-time",
    title: "Quiz Time",
    image: quizFlyer,
    dates: ["2026-10-14", "2026-11-11"],
  },
];
