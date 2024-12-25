// Definir una constante para la clave del carrito
const CART_KEY = 'cart';

// Guardar el carrito en localStorage
export const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error guardando el carrito en localStorage", error);
  }
};

// Recuperar el carrito desde localStorage
export const getCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error recuperando el carrito desde localStorage", error);
    return [];
  }
};

// Limpiar el carrito de localStorage
export const clearCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Error limpiando el carrito en localStorage", error);
  }
};
