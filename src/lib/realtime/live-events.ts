import { getApiBaseUrl } from "@/lib/api/api-config";

type Listener = () => void;
type LiveEvent = { tipo?: string; [key: string]: unknown };

const listeners = new Map<string, Set<Listener>>();
let source: EventSource | null = null;

function connect() {
  if (source || typeof window === "undefined") return;

  source = new EventSource(`${getApiBaseUrl()}/api/v1/public/events`);

  source.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as LiveEvent;
      if (!data.tipo) return;

      listeners.get(data.tipo)?.forEach((listener) => listener());
    } catch {}
  };

  source.onerror = () => {
    console.warn("Conexión SSE interrumpida.");
  };
}

export function subscribeLiveEvent(tipo: string, listener: Listener) {
  if (!listeners.has(tipo)) listeners.set(tipo, new Set());

  listeners.get(tipo)!.add(listener);
  connect();

  return () => {
    const tipoListeners = listeners.get(tipo);
    tipoListeners?.delete(listener);

    if (tipoListeners?.size === 0) {
      listeners.delete(tipo);
    }

    if (listeners.size === 0 && source) {
      source.close();
      source = null;
    }
  };
}