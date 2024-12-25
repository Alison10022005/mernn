// authUtils.js

const ADMIN_CREDENTIALS = {
    email: "alisoncortes2220@gmail.com", 
    password: "Alison10022005",    
  };
  
  /**
   * Valida las credenciales de administrador.
   * @param {string} email - Email ingresado.
   * @param {string} password - Contraseña ingresada.
   * @returns {boolean} - True si las credenciales coinciden, false en caso contrario.
   */
  export const validateAdmin = (email, password) => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
  };
  
  /**
   * Registra un nuevo usuario (solo ejemplo, sin base de datos).
   * @param {Object} userDetails - Datos del usuario.
   * @returns {Object} - Información del usuario registrado.
   */
  export const registerUser = (userDetails) => {
    console.log("Usuario registrado:", userDetails);
    return { ...userDetails, id: Date.now() }; // Retorna un usuario simulado con ID único.
  };
  