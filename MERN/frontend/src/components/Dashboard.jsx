import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

function Dashboard() {
  const { products, setProducts } = useContext(ProductsContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    discount: 0,
    description: "",
    image: "",
    discountStart: "",
    discountEnd: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
      setProducts(updatedProducts);
      resetProductForm();
      navigate(`/CategoriesPage?categoria=${newProduct.category}`);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSaveEditedProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? newProduct : product
    );
    setProducts(updatedProducts);
    resetProductForm();
    navigate(`/CategoriesPage?categoria=${newProduct.category}`);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      category: "",
      discount: 0,
      description: "",
      image: "",
      discountStart: "",
      discountEnd: "",
    });
  };

  return (
    <div className="dashboard">
      <h1>Administración de Productos</h1>

      {/* Formulario */}
      <h3>{editingProduct ? "Editar Producto" : "Agregar Producto"}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Categoría"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
      />
      <button
        onClick={editingProduct ? handleSaveEditedProduct : handleAddProduct}
      >
        {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
      </button>

      {/* Listado de productos */}
      <h3>Productos Existentes</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}€
            <button onClick={() => handleEditProduct(product)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
