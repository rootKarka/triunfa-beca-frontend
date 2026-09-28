import { useEffect, useState, useCallback } from "react";
import { NAV_LINKS } from "@/config/site";
import { useLiveEvents } from "./useLiveEvents";

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

  const cargar = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/public/navegacion`);
      const json = await response.json();
      setItems(json.data ?? []);
    } catch (err) {
      console.error("Error al cargar la navegación:", err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("navegacion", cargar);

  const links = loaded
    ? items
        .filter((i) => !i.padre_id)
        .sort((a, b) => a.orden - b.orden)
        .map((i) => ({ label: i.nombre, href: i.enlace }))
    : NAV_LINKS;

  return { links, loaded };
}