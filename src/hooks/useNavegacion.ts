import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/config/site";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export type NavItemApi = {
  id: string;
  nombre: string;
  enlace: string;
  padre_id: string | null;
  orden: number;
};

export function useNavegacion() {
  const [items, setItems] = useState<NavItemApi[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadNavegacion() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/public/navegacion`);
        const json = await response.json();
        if (!cancelled) {
          setItems(json.data ?? []);
        }
      } catch (err) {
        console.error("Error al cargar la navegación:", err);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    loadNavegacion();
    return () => {
      cancelled = true;
    };
  }, []);

  // Mientras no haya terminado de cargar, usamos el respaldo fijo NAV_LINKS
  // (para no mostrar un menú vacío mientras llega la respuesta).
  // Una vez que ya cargó, usamos exactamente lo que diga la API,
  // aunque venga vacío (si el admin apagó todos los elementos).
  const links = loaded
    ? items
        .filter((i) => !i.padre_id)
        .sort((a, b) => a.orden - b.orden)
        .map((i) => ({ label: i.nombre, href: i.enlace }))
    : NAV_LINKS;

  return { links, loaded };
}