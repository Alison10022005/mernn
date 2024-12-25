import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/db.js'; // Asegúrate de importar la clave secreta desde el archivo de configuración

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded; // Agregar los datos del usuario a la solicitud
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'El token ha expirado. Por favor, inicie sesión de nuevo.' });
    }
    return res.status(401).json({ error: 'Token inválido o no autorizado.' });
  }
};  
