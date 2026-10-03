import { useEffect, useState, useCallback } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";
import { useLiveEvents } from "./useLiveEvents";

export function useAboutImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    try {
      const data = await fetchImagesBySection("nosotros");
      setImagenes(data);
    } catch (err) {
      console.error("Error al cargar las imágenes de nosotros:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("imagenes", cargar);

  return { imagenes, loading };
}