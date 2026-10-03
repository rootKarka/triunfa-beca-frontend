import { getApiBaseUrl } from "./api-config";

export type PublicIngresante = {
  id: string;
  carrera: string;
  universidad: string;
  modalidad: string | null;
  imagen_url: string;
  texto_alt: string | null;
  orden: number;
};

type IngresantesResponse = {
  success: boolean;
  data: PublicIngresante[];
};

export async function fetchIngresantes(): Promise<PublicIngresante[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/public/ingresantes`, {
    headers: { Accept: "application/json" },
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ingresantes");
  }

  const result = await response.json() as IngresantesResponse;
  return result.data;
}

export function buildIngresanteImageUrl(url: string): string {
  return url.startsWith("/uploads/")
    ? `${getApiBaseUrl()}${url}`
    : url;
}