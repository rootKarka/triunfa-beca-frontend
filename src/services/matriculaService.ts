const API_URL = import.meta.env.VITE_API_URL;

export interface SolicitudMatriculaData {
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
}

export const matriculaService = {
    /**
     * Envía la informacion de la matricula al backend
     * @param {Object} data - Datos del formulario
     * @returns {Promise<Object>} - Respuesta del backend
     */

    crearSolicitud: async (data: SolicitudMatriculaData) => {
        try {
            const response = await fetch(`${API_URL}/matricula`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al enviar la solicitud');
            }

            return result;

        } catch (error) {
            console.error('Error en la matriculaServicee.crearSolicitud: ', error);
            throw  error;
        }
    },
};