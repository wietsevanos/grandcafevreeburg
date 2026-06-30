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
  url: "https://app.wereserve.nl/widget/book/1272",
  urlMobile: "https://app.wereserve.nl/m/reservate/1272",
  ctaSelector: ".wereserve-cta",
};

let scriptLoadPromise: Promise<void> | null = null;

export function loadWeReserveWidget() {
  if (typeof window === "undefined") return;

  if (window.wereserve) {
    window.wereserve.setupBookWidget(WIDGET_CONFIG);
    return;
  }

  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    // Script tag exists but may not have loaded yet; rely on the queued promise.
    return;
  }

  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load WeReserve widget"));
      document.body.appendChild(script);
    });
  }

  scriptLoadPromise.then(() => {
    if (window.wereserve) {
      window.wereserve.setupBookWidget(WIDGET_CONFIG);
    }
  });
}
