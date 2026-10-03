import { useCallback, useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";
import { useLiveEvents } from "./useLiveEvents";

export function useHeroImage() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchImagesBySection("Portada");
      setImagenes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar las imágenes de portada");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("imagenes", cargar);

  const imagenPrincipal =
    imagenes.find((imagen) => imagen.grupo === "Principal") ??
    imagenes.find((imagen) => imagen.orden === 1) ??
    null;

  const imagenInferior =
    imagenes.find((imagen) => imagen.grupo === "Inferior") ??
    imagenes.find((imagen) => imagen.orden === 2) ??
    null;

  const imagenSuperior =
    imagenes.find((imagen) => imagen.grupo === "Superior") ??
    imagenes.find((imagen) => imagen.orden === 3) ??
    null;

  return {
    imagenPrincipal,
    imagenInferior,
    imagenSuperior,
    loading,
    error,
  };
}