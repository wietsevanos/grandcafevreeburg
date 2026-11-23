export type AgendaEvent = {
  id: string;
  image: string;
  title?: string;
  date?: string;
};

export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "live-jazz",
    image: "/agenda/live-jazz-flyer.jpg",
  },
  {
    id: "quiz-time",
    image: "/agenda/quiz-time-flyer.webp",
  },
];
