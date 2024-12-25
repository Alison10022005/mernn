import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext"; // Asegúrate de tener un contexto o fuente de datos

function ProductDetail() {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const { products } = useContext(ProductsContext); // Usa tu contexto de productos
  const navigate = useNavigate();

  // Encuentra el producto con el ID proporcionado
  const product = products.find((item) => item.id.toString() === id);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const discountedPrice = product.price * (1 - product.discount / 100);
  const totalPrice = quantity * discountedPrice;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Evita que la cantidad sea menor a 1
  };

  const handleBuyClick = () => {
    navigate("/PurchaseForm", {
      state: {
        product,
        quantity,
        totalPrice,
      },
    });
  };

  return (
    <div className="product-detail">
      <section className="ProductContenedor">
        <div className="left columna_uno">
          <img
            className="Img-detalles"
            src={product.image || "placeholder.jpg"}
            alt={product.name}
          />
        </div>
        <div className="right columna_uno">
          <h1>{product.name}</h1>
          <p>Categoría: {product.category}</p>
          <p>Descripción: {product.description}</p>
          <p>
            Precio: ${product.price.toLocaleString("es-CO")}
            {product.discount > 0 && (
              <span>
                {" "}
                Descuento: {product.discount}% → $
                {discountedPrice.toLocaleString("es-CO")}
              </span>
            )}
          </p>

          <div>
            <button
              className="botondetail"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            &nbsp;&nbsp;
            <span className="quantifyDetail">{quantity}</span>
            &nbsp;&nbsp;
            <button
              className="botondetail"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <p>Total: ${totalPrice.toLocaleString("es-CO")}</p>
          <br />
          <br />
          <button className="botondetail" onClick={handleBuyClick}>
            Comprar
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
