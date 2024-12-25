import { useState, useEffect } from 'react';
import { saveCartToLocalStorage, getCartFromLocalStorage, clearCartFromLocalStorage } from '../utils/storage';
import { addProductToCartRequest, getCartItemsRequest, removeProductFromCartRequest } from '../api/cartApi';

const Cart = () => {
  const userId = '64b8d5f73d9e5a1b9c7d4a8f'; // Aquí puedes poner el id del usuario actual

  // Estado para el carrito
  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage()); // Cargar desde localStorage
  const [error, setError] = useState(null); // Manejo de errores

  // Productos disponibles (estado estático, no requiere setter)
  const products = [
    { id: '64b8d5f73d9e5a1b9c7d4a8f', name: 'Producto 1', price: 10 },
    { id: '64b8d5f73d9e5a1b9c7d4a9f', name: 'Producto 2', price: 20 },
    { id: '64b8d5f73d9e5a1b9c7d4a10f', name: 'Producto 3', price: 30 },
  ];

  // Sincroniza el carrito con localStorage cada vez que cambia
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  // Carga inicial del carrito desde el backend
 useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await getCartItemsRequest(userId);
      if (response && response.items) {
        setCartItems(response.items);
      } else {
        setError('El carrito está vacío o no se pudo cargar');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Hubo un error al cargar los productos del carrito'
      );
      console.error('Error obteniendo los artículos del carrito:', error);
    }
  };

  fetchCartItems();
}, [userId]);


  // Agregar producto al carrito
  const onAddToCart = (product) => {
    addProductToCartRequest(userId, { productId: product.id, quantity: 1 })
      .then((updatedCart) => {
        setCartItems(updatedCart.items); // Actualizamos el carrito con la respuesta del backend
      })
      .catch(() => setError('Hubo un error al agregar el producto al carrito'));
  };

  // Eliminar producto del carrito
  const onRemoveFromCart = (productId) => {
    removeProductFromCartRequest(userId, productId)
      .then((updatedCart) => {
        setCartItems(updatedCart.items); // Actualizamos el carrito con la respuesta del backend
      })
      .catch(() => setError('Hubo un error al eliminar el producto del carrito'));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    clearCartFromLocalStorage();
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <p>{item.productName}</p> {/* Asegúrate de que "productName" sea un campo de los objetos de tu carrito */}
            <p>{item.price}€</p> {/* Asume que el precio está disponible en la respuesta del backend */}
            <button onClick={() => onRemoveFromCart(item.productId)}>Eliminar</button>
          </div>
        ))
      )}
      <button onClick={clearCart}>Vaciar Carrito</button>

      <h3>Productos Disponibles</h3>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <p>{product.name}</p>
          <p>{product.price}€</p>
          <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
