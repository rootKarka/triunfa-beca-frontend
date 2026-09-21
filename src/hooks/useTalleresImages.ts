import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

export function useTalleresImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTalleresImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("talleres");
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

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagenes, loading };
}