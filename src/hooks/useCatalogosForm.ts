import { useEffect, useState, useCallback } from "react";
import { useLiveEvents } from "./useLiveEvents";

type Codigo =
  | "INFO_NIVEL_EDUCATIVO"
  | "INFO_SERVICIO_INTERES"
  | "MATRICULA_NIVEL_EDUCATIVO"
  | "MATRICULA_GRADO_MODALIDAD"
  | "MATRICULA_SERVICIO"
  | "MATRICULA_TURNO";

type Opcion = { id: string; nombre: string; orden: number };

const API = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function obtener(codigo: Codigo): Promise<string[]> {
  const res = await fetch(`${API}/api/v1/catalogos/${codigo}`);
  if (!res.ok) throw new Error(`Error al cargar ${codigo}`);

  const json = await res.json() as { data: Opcion[] };
  return json.data.map((item) => item.nombre);
}

export function useCatalogosForm() {
  const [infoNiveles, setInfoNiveles] = useState<string[]>([]);
  const [infoServicios, setInfoServicios] = useState<string[]>([]);
  const [matriculaNiveles, setMatriculaNiveles] = useState<string[]>([]);
  const [matriculaGrados, setMatriculaGrados] = useState<string[]>([]);
  const [matriculaServicios, setMatriculaServicios] = useState<string[]>([]);
  const [matriculaTurnos, setMatriculaTurnos] = useState<string[]>([]);

  const cargar = useCallback(async () => {
    try {
      const [iniv, iserv, mniv, mgrado, mserv, mturno] = await Promise.all([
        obtener("INFO_NIVEL_EDUCATIVO"),
        obtener("INFO_SERVICIO_INTERES"),
        obtener("MATRICULA_NIVEL_EDUCATIVO"),
        obtener("MATRICULA_GRADO_MODALIDAD"),
        obtener("MATRICULA_SERVICIO"),
        obtener("MATRICULA_TURNO"),
      ]);

      setInfoNiveles(iniv);
      setInfoServicios(iserv);
      setMatriculaNiveles(mniv);
      setMatriculaGrados(mgrado);
      setMatriculaServicios(mserv);
      setMatriculaTurnos(mturno);
    } catch (error) {
      console.error("Error al cargar catálogos:", error);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useLiveEvents("catalogos", cargar);

  return {
    infoNiveles,
    infoServicios,
    matriculaNiveles,
    matriculaGrados,
    matriculaServicios,
    matriculaTurnos,
  };
}