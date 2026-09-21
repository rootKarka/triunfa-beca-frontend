import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/config/site";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const REFRESH_INTERVAL_MS = 5000; // cada 5 segundos

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

    const interval = setInterval(loadNavegacion, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const links = loaded
    ? items
        .filter((i) => !i.padre_id)
        .sort((a, b) => a.orden - b.orden)
        .map((i) => ({ label: i.nombre, href: i.enlace }))
    : NAV_LINKS;

  return { links, loaded };
}