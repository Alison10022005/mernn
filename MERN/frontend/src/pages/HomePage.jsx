import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import Categories from "../components/Categories";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { products } = useContext(ProductsContext); // Contexto para obtener productos
  const navigate = useNavigate(); // Configuración de navegación

  return (
    <>
      <main>
        {/* Categorías */}

      <div className="HeaderYNav">
        <div className="CategoriesHome">
        <Categories />
        </div>

        {/* Encabezado */}
        <div className="home-container">
          <div className="text-center p-5">
            <h2 className="text-3xl font-bold">Rápido y Sabroso</h2>
            <br/>
            <p className="text-lg">
              Comida chatarra, pero rica y deliciosa, para satisfacer tus antojos.
            </p>
            <button
              onClick={() => navigate("/CategoriesPage")}
              className="bg-indigo-500 px-4 py-2 rounded-md mt-5"
            >
              Ver todas las categorías
            </button>
          </div>
        </div>

        </div>
        <br />

        {/* Listado de Productos */}
        <section>
          <h3 className="text-xl font-bold mb-4">Productos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card border p-4 shadow-md cursor-pointer"
                onClick={() =>
                  navigate(`/product-detail/${product.id}`, { state: { product } })
                } // Redirigir al detalle del producto
              >
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p>{product.description}</p>
                <p>Precio: ${product.price.toLocaleString("es-CO")}</p>
                <img
                  src={product.image}
                  alt={product.name}
                  width="100"
                  className="product-image"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <br />
      <br />

     
     
     
     
     
    </>
  );
}

export default HomePage;
