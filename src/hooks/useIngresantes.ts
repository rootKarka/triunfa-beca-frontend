import { useCallback, useEffect, useState } from "react";
import {
  fetchIngresantes,
  type PublicIngresante,
} from "@/lib/api/ingresantes-api";
import { useLiveEvents } from "./useLiveEvents";

export function useIngresantes() {
  const [ingresantes, setIngresantes] = useState<PublicIngresante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchIngresantes();
      setIngresantes(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los ingresantes",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("ingresantes", cargar);

  return {
    ingresantes,
    loading,
    error,
  };
}