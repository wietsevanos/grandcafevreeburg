import jazzFlyer from "@/assets/live-jazz-flyer.jpg";
import quizFlyer from "@/assets/quiz-time-flyer.png";

export type AgendaEvent = {
  id: string;
  image: string;
};

export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "live-jazz",
    image: jazzFlyer,
  },
  {
    id: "quiz-time",
    image: quizFlyer,
  },
];
