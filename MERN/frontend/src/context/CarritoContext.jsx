import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Crear el contexto del carrito
export const CarritoContext = createContext(); // Exportación explícita

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarProductoAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  // Eliminar producto del carrito por índice
  const eliminarProductoDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, index) => index !== id));
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular el total del carrito
  const obtenerTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProductoAlCarrito,
        eliminarProductoDelCarrito,
        vaciarCarrito,
        obtenerTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo React
};
