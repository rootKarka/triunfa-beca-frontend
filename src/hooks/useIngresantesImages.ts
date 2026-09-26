import { useEffect, useState } from "react";
import { fetchImagesBySection, type AdminImage } from "@/lib/api/images-api";

export function useIngresantesImages() {
  const [imagenes, setImagenes] = useState<AdminImage[]>([]);

  useEffect(() => {
    let cancelled = false;
    const cargar = async () => {
      try {
        const data = await fetchImagesBySection("Ingresantes");
        if (!cancelled) setImagenes(data);
      } catch (err) {
        console.error("Error al cargar imágenes de ingresantes:", err);
      }
    };

    cargar();
    const interval = setInterval(cargar, 3000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { imagenes };
}