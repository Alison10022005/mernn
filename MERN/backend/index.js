import express from 'express';
import conectarDB from './config/db.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import cartRoutes from './routes/cart.routes.js'; // Verifica que el archivo exista y tenga este nombre

dotenv.config(); // Cargar variables de entorno

const app = express();

// Configuración de CORS (Conexión entre el back y el front)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Conectar a la base de datos
conectarDB();

// Dependencias
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api', authRoutes);
app.use('/api/cart', cartRoutes);

// Conexión al servidor
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

console.log('Ruta absoluta:', import.meta.url);
console.log('Resolviendo:', './routes/cart.routes.js');
