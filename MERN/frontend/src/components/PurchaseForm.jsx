import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function PurchaseForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mover los hooks useState fuera de cualquier estructura condicional
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [creditCard, setCreditCard] = useState('');

  // Obtiene los datos del producto y la cantidad desde la página de detalles del producto
  const { product, quantity } = location.state || {};

  // Si no se encuentra el producto, retorna un mensaje de error
  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  // Descuento por producto
  const discountedPrice = product.price * (1 - product.discount / 100);
  const totalDiscountedPrice = quantity * discountedPrice;

  // Función para manejar la compra confirmada y agregar al carrito
  const handleConfirmPurchase = () => {
    // Aquí, simulamos que agregamos el producto al carrito
    const cartItem = {
      product,
      quantity,
      totalDiscountedPrice
    };

    // Guardamos el carrito en el almacenamiento local (puedes usar una base de datos o contexto)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Muestra mensaje de compra exitosa
    alert('Compra exitosa. Puedes verificar en el carrito de productos.');

    // Redirige a la página de Carrito de Productos
    navigate('/Cart'); // Asumimos que tienes una ruta "/Cart"
  };

  // Maneja la cancelación de la compra
  const handleCancelPurchase = () => {
    navigate('/ProductList'); // Redirige a la lista de productos
  };

  return (
    <div className="purchase-form">
      <h1 className='h1_purchase' >Formulario de Compra</h1>

      {/* Información de los productos */}
      <div className="product-info">
        <h2  className='h2_purchase'  >{product.name}</h2>
        <p>Precio: ${product.price.toLocaleString("es-CO")}</p>
        {product.discount > 0 && (
          <p>
            Descuento: {product.discount}% → ${discountedPrice.toLocaleString("es-CO")}
          </p>
        )}
        <p>Cantidad: {quantity}</p>
        <p>Total con descuento: ${totalDiscountedPrice.toLocaleString("es-CO")}</p>
      </div>

<br />
      {/* Formulario de usuario */}
      <form>
        <section className='DisplayFlexPurchase' >
          <div className='Columna_dos'>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='InputPurchase'
          />
        </div>

        <div>
          <label htmlFor="surname">Apellido:</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className='InputPurchase'
          />
        </div>

        <div>
          <label htmlFor="address">Dirección:</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className='InputPurchase'
          />
        </div>

        </div>

        <div className=' inputcolumtwo Columna_dos'>

        <div>
          <label htmlFor="phone"> Teléfono:</label>
          <input
          className='InputPurchase marginTelefono'
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            
          />
        </div>

        <div>
          <label htmlFor="creditCard">Tarjeta de Crédito:</label>
          <input
            id="creditCard"
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            required
            className='InputPurchase'
          />
        </div>
        </div>
        </section>
      </form>

      {/* Botones de confirmación y cancelación */}
      <div className="buttons">
        <button className='botondetail buttons_uno ' onClick={handleConfirmPurchase}>Confirmar Compra</button>
        <button className='botondetail' onClick={handleCancelPurchase}>Cancelar Compra</button>
      </div>
    </div>
  );
}

export default PurchaseForm;
