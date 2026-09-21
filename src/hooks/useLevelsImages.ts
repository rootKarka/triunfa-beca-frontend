import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

export function useLevelsImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadLevelsImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("niveles");
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

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagenes, loading };
}