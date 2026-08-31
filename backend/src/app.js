import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Importamos nuestras rutas
import solicitudesRoutes from './routes/solicitudesRoutes';

// Cargamos variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ---- MIDDLEWARES ----
app.use(cors());  // permite  la conexion con servicios externos
app.use(express.json()); // permite a Express entender JSON
app.use(morgan('dev')); // muestra en la consola las peticiones que  llegan

// ---- RUTAS ----
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message:  'API de Triunfa Beca funcionando jejeje'
    });
});

// Le decimos a Express: "Todas las rutas que empiecen con /api/solicitudes,
// mándalas al archivo de rutas"
app.use('/api/solicitudes', solicitudesRoutes);

// ---- INICIAMOS EL SERVIDOR ----
app.listen(PORT, () => {
    console.log('Tamo activo en http://localhost:${PORT}');
});