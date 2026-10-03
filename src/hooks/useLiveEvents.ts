import { useEffect } from "react";
import { subscribeLiveEvent } from "@/lib/realtime/live-events";

export function useLiveEvents(
  tipo: string,
  onChange: () => void,
) {
  useEffect(() => {
    return subscribeLiveEvent(tipo, onChange);
  }, [tipo, onChange]);
}