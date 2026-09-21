import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const REFRESH_INTERVAL_MS = 5000; // cada 5 segundos

export type SeccionApi = {
  id: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  texto_boton: string | null;
  orden: number;
};

export function useSecciones() {
  const [secciones, setSecciones] = useState<SeccionApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSecciones() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/public/secciones`);
        const json = await response.json();
        if (!cancelled) {
          setSecciones(json.data ?? []);
        }
      } catch (err) {
        console.error("Error al cargar las secciones:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoaded(true);
        }
      }
    }

    loadSecciones();

    // Vuelve a consultar cada cierto tiempo, para que los cambios
    // hechos en el panel admin aparezcan solos, sin recargar la página.
    const interval = setInterval(loadSecciones, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const getSeccion = (etiqueta: string) =>
    secciones.find((s) => s.etiqueta.toLowerCase() === etiqueta.toLowerCase());

  const isHidden = (etiqueta: string) => loaded && !getSeccion(etiqueta);

  return { secciones, getSeccion, isHidden, loading };
}