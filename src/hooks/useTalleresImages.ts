import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

const REFRESH_INTERVAL_MS = 3000;

export function useTalleresImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTalleresImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("Talleres");
        if (!cancelled) {
          setImagenes(data);
        }
      } catch (err) {
        console.error("Error al cargar las imágenes de talleres:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTalleresImages();
    const interval = setInterval(loadTalleresImages, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { imagenes, loading };
}