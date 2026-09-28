import { useEffect, useState, useCallback } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";
import { useLiveEvents } from "./useLiveEvents";

export function useLevelsImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    try {
      const data = await fetchImagesBySection("niveles");
      setImagenes(data);
    } catch (err) {
      console.error("Error al cargar las imágenes de niveles:", err);
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