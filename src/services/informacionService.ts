const API_URL = 'http://localhost:3000/api/v1/solicitudes';

export interface SolicitudInfoData {
  nombres_apellidos: string;
  dni: string;
  celular: string;
  correo: string;
  nivel_educativo: string;
  servicio_interes: string;
  canal_preferido?: string;
  mensaje?: string;
}

export const informacionService = {
    /**
     * Envía una solicitud de información al backend
     * @param {Object} data - Datos del formulario
     * @returns {Promise<Object>} - Respuesta del backend
     */

    crearSolicitud: async (data: SolicitudInfoData) => {
        try {
            const response = await fetch(`${API_URL}/informacion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al enviar la solicitud');
            }

            return result;

        } catch (error) {
            console.error('Error en informationService.crearSolicitud: ', error);
            throw error;
        }
    },
};