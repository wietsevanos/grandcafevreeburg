import { useEffect } from "react";
import { loadWeReserveWidget } from "./wereserve-widget";

export function WeReserveWidgetClient() {
  useEffect(() => {
    loadWeReserveWidget();

    // Re-run setup whenever new .wereserve-cta elements appear in the DOM
    // (e.g. the mobile navigation menu).
    const observer = new MutationObserver(() => {
      loadWeReserveWidget();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
