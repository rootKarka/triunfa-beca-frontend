export function getApiBaseUrl(value = import.meta.env?.VITE_API_BASE_URL): string {
  if (!value?.trim()) {
    throw new Error("Configura VITE_API_BASE_URL para conectar con la API.");
  }

  try {
    const url = new URL(value.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username || url.password || url.search || url.hash ||
      url.pathname !== "/"
    ) {
      throw new Error();
    }
    return url.origin;
  } catch {
    throw new Error("VITE_API_BASE_URL debe ser el origen HTTP de la API, sin /api/v1 ni credenciales.");
  }
}