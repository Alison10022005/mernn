import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5500/api', // Ya incluye el prefijo /api
    withCredentials: true  // Para enviar cookies si es necesario
});

export default instance;
