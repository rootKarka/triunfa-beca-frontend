import { useEffect, useState, useCallback } from "react";
import { useLiveEvents } from "./useLiveEvents";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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

  const cargar = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/public/secciones`);
      const json = await response.json();
      setSecciones(json.data ?? []);
    } catch (err) {
      console.error("Error al cargar las secciones:", err);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("secciones", cargar);

  const getSeccion = (etiqueta: string) =>
    secciones.find((s) => s.etiqueta.toLowerCase() === etiqueta.toLowerCase());

  const isHidden = (etiqueta: string) => loaded && !getSeccion(etiqueta);

  return { secciones, getSeccion, isHidden, loading };
}