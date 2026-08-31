import { Router } from "express"; // El Router de Express
import { crearSolicitudInfo, crearSolicitudMatricula} from '../controllers/solicitudes.controller.js';

const router = Router(); // Creamos laa instancia del router

// Definimos los edpoints
router.post('/informacion', crearSolicitudInfo);
router.post('/matricula', crearSolicitudMatricula);

export default router; // Lo exportamos para que app.js pueda usarlo