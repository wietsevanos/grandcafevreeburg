import { useEffect } from "react";
import { loadWeReserveWidget } from "./wereserve-widget";

export function WeReserveWidgetClient() {
  useEffect(() => {
    loadWeReserveWidget();
  }, []);

  return null;
}
