import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

const REFRESH_INTERVAL_MS = 3000;

export function useHeroImage() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHeroImages() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchImagesBySection("hero");

        if (!cancelled) {
          setImagenes(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al cargar las imágenes Hero"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHeroImages();
    const interval = setInterval(loadHeroImages, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const imagenPrincipal =
    imagenes.find((imagen) => imagen.orden === 1) ?? null;

  const imagenInferior =
    imagenes.find((imagen) => imagen.orden === 2) ?? null;

  const imagenSuperior =
    imagenes.find((imagen) => imagen.orden === 3) ?? null;

  return {
    imagenPrincipal,
    imagenInferior,
    imagenSuperior,
    loading,
    error,
  };
}