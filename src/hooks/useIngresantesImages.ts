import { useEffect, useState, useCallback } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";
import { useLiveEvents } from "./useLiveEvents";

export function useIngresantesImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);

  const cargar = useCallback(async () => {
    try {
      const data = await fetchImagesBySection("Ingresantes");
      setImagenes(data);
    } catch (err) {
      console.error("Error al cargar imágenes de ingresantes:", err);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("imagenes", cargar);

  return { imagenes };
}