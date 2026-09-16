import { getApiBaseUrl } from "./api-config";

export type AdminImage = {
  id: string;
  url: string;
  texto_alt: string | null;
  seccion: string;
  orden: number;
  es_activa: boolean;
  fecha_creacion: string;
};

function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = payload as { message?: string } | null;
    throw new Error(error?.message || `Error ${response.status}`);
  }
  return payload as T;
}

export async function fetchImagesBySection(seccion: string): Promise<AdminImage[]> {
  const params = new URLSearchParams();
  if (seccion) {
    params.set("seccion", seccion);
  }
  
  const response = await fetch(getApiUrl(`/api/v1/public/imagenes?${params.toString()}`), {
    headers: {
      Accept: "application/json",
    },
    credentials: "omit",
  });
  
  const data = await handleResponse<{ success: boolean; data: AdminImage[] }>(response);
  return data.data;
}

export function buildImageUrl(url: string): string {
  if (url.startsWith("/uploads/")) {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}${url}`;
  }
  return url;
}