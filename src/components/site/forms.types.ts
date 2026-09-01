import type { NIVELES, SERVICIOS } from "@/config/site";

export type NivelValue = (typeof NIVELES)[number];
export type ServicioValue = (typeof SERVICIOS)[number];

export interface InfoPreset {
  nivel?: NivelValue;
  servicio?: ServicioValue;
  /** cambia en cada solicitud para volver a aplicar el preset */
  token: number;
}
