import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

const REFRESH_INTERVAL_MS = 3000;

export function useAboutImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAboutImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("Nosotros");
        if (!cancelled) {
          setImagenes(data);
        }
      } catch (err) {
        console.error("Error al cargar las imágenes de nosotros:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAboutImages();
    const interval = setInterval(loadAboutImages, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { imagenes, loading };
}