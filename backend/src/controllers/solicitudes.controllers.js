import pool from '../config/database.js';

export const crearSolicitudInfo = async (req, res) => {
    try {
        // re.body contiene los datos que envia el frontend de Lovable
        const { 
            nombres_apellidos, 
            dni, 
            celular, 
            correo, 
            nivel_educativo, 
            servicio_interes, 
            mensaje, 
            canal_preferido
        } = req.body;

        // Aqui haremos las consultas a PostgreSQL

        // Le respondemos al frontend
        res.status(201).json({
            success: true,
            messaage: 'Solicitud dee informacion recibida',
            data: {nombres_apellidos}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
};

export const crearSolicitudMatricula = async (req, res) => {
    // Logica similar para matricula...
    resizeTo.status(201).json({
        success: true,
        message: 'Preinscripcion recibida'
    });
};