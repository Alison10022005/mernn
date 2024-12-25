import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import hamburguesaClasica from "/img/HamburguesaClasica.jpg";
import PizzaMargarita from "/img/PizzaMargarita.jpg";
import TacosAlPastor from "/img/TacosAlPastor.jpg";
import SandwichDePollo from "/img/SandwichDePollo.jpg";
import EnsaladaCesar from "/img/EnsaladaCesar.jpg";




export const ProductsContext = createContext(); // Exportación explícita

// Hook personalizado para acceder al contexto de productos
export const useProducts = () => useContext(ProductsContext);


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Productos de ejemplo (puedes cargar tus productos de esta manera mientras pruebas)
  const exampleProducts = [
    { id: 1, name: "Hamburguesa Clásica", category: "Hamburguesas", price: 12000, description: "Deliciosa hamburguesa con queso.", image: hamburguesaClasica , discount: 10 },
    { id: 2, name: "Pizza Margarita", category: "Pizza", price: 18000, description: "Pizza tradicional con queso y albahaca.", image: PizzaMargarita , discount: 5 },
    { id: 3, name: "Taco al Pastor", category: "Tacos", price: 8000, description: "Taco clásico mexicano.", image: TacosAlPastor , discount: 0 },
    { id: 4, name: "Sándwich de Pollo", category: "Sándwiches", price: 10000, description: "Sándwich con pollo asado.", image: SandwichDePollo , discount: 15 },
    { id: 5, name: "Ensalada César", category: "Ensaladas", price: 9000, description: "Ensalada fresca con aderezo César.", image: EnsaladaCesar , discount: 0 },
  ];

  useEffect(() => {
    // Solo carga productos de ejemplo si el estado está vacío
    if (products.length === 0) {
      console.log("Cargando productos de ejemplo...");
      setProducts(exampleProducts);
    }
  }, []); // Cambié la dependencia vacía para que se ejecute solo una vez

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo React
};
