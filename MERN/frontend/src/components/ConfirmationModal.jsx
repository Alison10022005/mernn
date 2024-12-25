import { useState, useEffect } from 'react';
import { saveCartToLocalStorage, getCartFromLocalStorage, clearCartFromLocalStorage } from '../utils/storage';
import { addProductToCartRequest, getCartItemsRequest, removeProductFromCartRequest, getAvailableProductsRequest } from '../api/cartApi';
import ConfirmationModal from './ConfirmationModal';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage()); // Inicializar con datos de localStorage
  const [products, setProducts] = useState([]); // Productos disponibles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  // Sincronizar carrito con localStorage
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  // Cargar productos del carrito y productos disponibles al montar el componente
  useEffect(() => {
    Promise.all([getCartItemsRequest(), getAvailableProductsRequest()])
      .then(([cartResponse, productsResponse]) => {
        setCartItems(cartResponse.data); // Productos del carrito
        setProducts(productsResponse.data); // Productos disponibles
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un error al cargar los datos.');
        setLoading(false);
      });
  }, []);

  const onAddToCart = (product) => {
    addProductToCartRequest(product.id)
      .then(() => {
        const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart); // Guardar en localStorage
      })
      .catch(() => setError('Hubo un error al agregar el producto al carrito'));
  };

  const openRemoveModal = (productId) => {
    setProductToRemove(productId);
    setIsModalOpen(true);
  };

  const closeRemoveModal = () => {
    setIsModalOpen(false);
    setProductToRemove(null);
  };

  const confirmRemoveFromCart = () => {
    if (!productToRemove) return;

    removeProductFromCartRequest(productToRemove)
      .then(() => {
        const updatedCart = cartItems.filter(item => item.id !== productToRemove);
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart); // Guardar en localStorage
      })
      .catch(() => setError('Hubo un error al eliminar el producto del carrito'))
      .finally(() => closeRemoveModal());
  };

  const clearCart = () => {
    setCartItems([]);
    clearCartFromLocalStorage(); // Limpiar localStorage
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>{item.price}€</p>
            <button onClick={() => openRemoveModal(item.id)}>Eliminar</button>
          </div>
        ))
      )}
      <button onClick={clearCart}>Vaciar Carrito</button>

      <h3>Productos Disponibles</h3>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <p>{product.name}</p>
            <p>{product.price}€</p>
            <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
          </div>
        ))
      )}

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeRemoveModal}
        onConfirm={confirmRemoveFromCart}
        message="¿Estás seguro de que deseas eliminar este producto del carrito?"
      />
    </div>
  );
};

export default Cart;
