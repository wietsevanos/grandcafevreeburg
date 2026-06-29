declare global {
  interface Window {
    wereserve?: {
      setupBookWidget: (config: {
        url: string;
        urlMobile: string;
        ctaSelector: string;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://app.wereserve.nl/widget/book/latest";
const WIDGET_CONFIG = {
  url: "https://app.wereserve.nl/widget/book/1275",
  urlMobile: "https://app.wereserve.nl/m/reservate/1275",
  ctaSelector: ".wereserve-cta",
};

export function WeReserveWidget() {
  return null;
}

export function loadWeReserveWidget() {
  if (typeof window === "undefined") return;

  if (window.wereserve) {
    window.wereserve.setupBookWidget(WIDGET_CONFIG);
    return;
  }

  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  script.onload = () => {
    if (window.wereserve) {
      window.wereserve.setupBookWidget(WIDGET_CONFIG);
    }
  };
  document.body.appendChild(script);
}
