const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // La respuesta no tenía cuerpo JSON válido
  }

  if (!res.ok) {
    throw new ApiError(
      data?.message || "Ocurrió un error al enviar la solicitud.",
      res.status
    );
  }

  return data as T;
}

export function enviarSolicitudInformacion(payload: {
  nombres_apellidos: string;
  dni: string;
  celular: string;
  correo: string;
  nivel_educativo: string;
  servicio_interes: string;
  mensaje?: string;
}) {
  return postJSON("/api/v1/solicitudes/informacion", payload);
}

export function enviarSolicitudMatricula(payload: {
  est_nombres: string;
  est_apellido_paterno: string;
  est_apellido_materno: string;
  est_dni: string;
  est_fecha_nacimiento: string;
  est_celular: string;
  est_correo: string;
  nivel_educativo: string;
  grado_modalidad: string;
  servicio_contratar: string;
  turno_preferido: string;
  apod_nombre_completo: string;
  apod_dni: string;
  apod_celular: string;
  apod_correo?: string;
}) {
  return postJSON("/api/v1/solicitudes/matricula", payload);
}