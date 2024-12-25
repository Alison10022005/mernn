import axios from './axios';

// Obtener todos los productos
export const getProductsRequest = () => axios.get("/products");

// Obtener un producto específico por ID
export const getProductRequest = (id) => axios.get(`/products/${id}`);

// Crear un nuevo producto (solo admin)
export const createProductRequest = (product) => axios.post("/products", product);

// Actualizar un producto por ID (solo admin)
export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product);

// Eliminar un producto por ID (solo admin)
export const deleteProductRequest = (id) => axios.delete(`/products/${id}`);
