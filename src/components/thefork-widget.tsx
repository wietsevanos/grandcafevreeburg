import { useEffect } from "react";

/**
 * TheFork-reserveringswidget (aangeleverde widgetcode van Grand Café Vreeburg).
 * De eigen zwevende knop van de widget is verborgen; alle bestaande
 * reserveerknoppen met de class `reserve-cta` openen het venster.
 */
const COLOR = "#C33D15";
const HOVER = "#C33D15";
const WIDGET_URL = "https://widget.thefork.com/df62499d-c1d8-4a86-8016-68761f16b137";
const LOGO = "https://raw.githubusercontent.com/sofiamoliboga/theforklogo/main/thefork-logo.png";

export function TheForkWidget() {
  useEffect(() => {
    if (document.getElementById("tf-reserve-widget-host")) return;
    const host = document.createElement("div");
    host.id = "tf-reserve-widget-host";
    document.body.appendChild(host);

    if (!document.getElementById("tf-widget-font")) {
      const fontLink = document.createElement("link");
      fontLink.id = "tf-widget-font";
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap";
      document.head.appendChild(fontLink);
    }

    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = `
    <style>
      :host { all: initial; }
      *, *::before, *::after { box-sizing: border-box; margin: 0; font-family: 'Montserrat', sans-serif; }
      .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); backdrop-filter: blur(3px); opacity: 0; pointer-events: none; transition: opacity .3s; z-index: 2147483646; }
      .overlay.active { opacity: 1; pointer-events: auto; }
      .logo { width: 24px; height: 24px; filter: brightness(0) invert(1); flex-shrink: 0; display: block; }
      .sep { width: 1px; height: 16px; background: rgba(255,255,255,.35); margin: 0 11px; flex-shrink: 0; }
      .widget { position: fixed; top: 12px; bottom: 82px; right: 28px; width: 420px; background: #fff; border-radius: 12px; overflow: hidden; border: 2px solid ${COLOR}; box-shadow: 0 20px 50px rgba(0,0,0,.15); display: flex; flex-direction: column; opacity: 0; pointer-events: none; transform: translateY(20px); transition: all .3s ease; z-index: 2147483647; }
      .widget.active { transform: translateY(0); opacity: 1; pointer-events: auto; bottom: 8px; }
      .widget-head { height: 46px; flex-shrink: 0; background: ${COLOR}; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; font-weight: 600; font-size: 13px; }
      .head-left { display: flex; align-items: center; flex: 1; }
      .head-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
      .back-btn { background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3); color: #fff; border-radius: 5px; padding: 4px 9px; cursor: pointer; font-size: 12px; }
      .back-btn:hover { background: ${HOVER}; }
      .back-btn::before { content: '\\2039 '; }
      .close { cursor: pointer; font-size: 22px; line-height: 1; border: none; background: none; color: #fff; opacity: .85; padding: 0; }
      .close:hover { opacity: 1; }
      iframe { display: block; flex: 1; min-height: 0; width: 100%; border: none; }
      @media (max-width: 760px) { .widget { width: calc(100% - 40px); right: 20px; } }
      @media (max-width: 480px) { .widget { top: 8px; bottom: 72px; width: 100%; right: 0; border-radius: 16px 16px 0 0; border-bottom: none; } .widget.active { bottom: 0; } }
    </style>
    <div class="overlay" id="ov"></div>
    <div class="widget" id="w" role="dialog" aria-label="Reserveren">
      <div class="widget-head">
        <div class="head-left">
          <img class="logo" style="width:20px;height:20px" src="${LOGO}" alt="TheFork">
          <span class="sep"></span>Reserveren
        </div>
        <div class="head-right">
          <button class="back-btn" id="back">Terug</button>
          <button class="close" id="close-btn" aria-label="Sluiten">&#215;</button>
        </div>
      </div>
      <iframe id="wframe" src="${WIDGET_URL}" allow="payment *" title="Reserveren bij Grand Café Vreeburg"></iframe>
    </div>`;

    const ov = root.getElementById("ov")!;
    const w = root.getElementById("w")!;
    const wframe = root.getElementById("wframe") as HTMLIFrameElement;
    const open = () => { w.classList.add("active"); ov.classList.add("active"); };
    const close = () => { w.classList.remove("active"); ov.classList.remove("active"); };
    ov.addEventListener("click", close);
    root.getElementById("close-btn")!.addEventListener("click", close);
    root.getElementById("back")!.addEventListener("click", () => {
      try { wframe.contentWindow?.history.back(); } catch { wframe.src = wframe.src; }
    });

    const onClick = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(".reserve-cta")) { e.preventDefault(); open(); }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      host.remove();
    };
  }, []);
  return null;
}
