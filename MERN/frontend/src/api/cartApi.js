import axios from './axios';

// Obtener los artículos del carrito de un usuario
export const getCartItemsRequest = async (userId) => {
  try {
    const response = await axios.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los artículos del carrito:', error);
    throw error;
  }
};

// Agregar un producto al carrito
export const addProductToCartRequest = async (userId, productData) => {
  try {
    const response = await axios.post(`/cart/${userId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error agregando producto al carrito:', error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCartRequest = async (userId, productId) => {
  try {
    const response = await axios.delete(`/cart/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando producto del carrito:', error);
    throw error;
  }
};
