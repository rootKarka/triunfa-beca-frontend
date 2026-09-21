import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

export function useAboutImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAboutImages() {
      try {
        setLoading(true);
        const data = await fetchImagesBySection("nosotros");
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

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagenes, loading };
}