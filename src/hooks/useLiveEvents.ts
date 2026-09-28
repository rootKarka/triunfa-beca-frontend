import { useEffect, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();
let eventSource: EventSource | null = null;

function ensureConnection() {
  if (eventSource) return;

  eventSource = new EventSource(`${API_BASE_URL}/api/v1/public/events`);

  eventSource.onmessage = (e) => {
    try {
      const { tipo } = JSON.parse(e.data);
      listeners.get(tipo)?.forEach((cb) => cb());
    } catch {
      // ping de latido, se ignora
    }
  };

  eventSource.onerror = () => {
    eventSource?.close();
    eventSource = null;
    setTimeout(ensureConnection, 3000);
  };
}

export function useLiveEvents(tipo: string, callback: Listener) {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    ensureConnection();

    const wrapped = () => savedCallback.current();

    if (!listeners.has(tipo)) listeners.set(tipo, new Set());
    listeners.get(tipo)!.add(wrapped);

    return () => {
      listeners.get(tipo)?.delete(wrapped);
    };
  }, [tipo]);
}