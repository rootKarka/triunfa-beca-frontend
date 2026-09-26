import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

const REFRESH_INTERVAL_MS = 3000;

export function useLevelsImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadLevelsImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("Niveles");
        if (!cancelled) {
          setImagenes(data);
        }
      } catch (err) {
        console.error("Error al cargar las imágenes de niveles:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLevelsImages();
    const interval = setInterval(loadLevelsImages, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { imagenes, loading };
}