import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

function ProductList() {
  const { products: contextProducts } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();
  const location = useLocation();

  // Función para normalizar cadenas (elimina acentos y caracteres especiales)
  const normalizeString = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Actualizar categoría seleccionada desde la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("categoria");
    setSelectedCategory(categoryFromUrl || "Todos");
  }, [location.search]);

  // Filtrar productos según la categoría seleccionada
  useEffect(() => {
    if (!contextProducts || contextProducts.length === 0) {
      console.warn("No hay productos disponibles o están cargando...");
      setFilteredProducts([]);
      return;
    }

    if (selectedCategory === "Todos") {
      setFilteredProducts(contextProducts);
    } else {
      const filtered = contextProducts.filter(
        (product) =>
          normalizeString(product.category) === normalizeString(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, contextProducts]);

  // Cambiar de categoría y actualizar la URL
  const handleCategoryClick = (category) => {
    navigate(`/CategoriesPage?categoria=${category}`);
  };

  return (
    <div className="product-list">
      {/* Navegación de categorías */}
      <nav className="flex gap-x-4">
        {["Hamburguesas", "Pizza", "Tacos", "Sándwiches", "Ensaladas", "Todos"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 ${
              cat === selectedCategory ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <h1 className="text-2xl font-bold mt-4">Categoría:</h1>

      {/* Mostrar productos filtrados */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos para esta categoría.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card border p-4 shadow-md">
              <img src={product.image} alt={product.name} className="product-image w-full h-40 object-cover" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p>Precio: ${product.price.toLocaleString("es-CO")}</p>
              {product.discount > 0 && (
                <p className="text-green-500">Descuento: {product.discount}%</p>
              )}
              <p>{product.description}</p>
              <button
  onClick={() => {
    console.log(`Navigating to /product-detail/${product.id}`);
    navigate(`/product-detail/${product.id}`);
  }}
  className="bg-indigo-500 text-white px-4 py-2 mt-2 rounded"
>
  Comprar
</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
