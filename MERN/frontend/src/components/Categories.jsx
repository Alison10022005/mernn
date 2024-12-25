import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Categories({ selectedCategory: initialSelectedCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || null); // Estado local para la categoría seleccionada
  const navigate = useNavigate();
  const location = useLocation();  // Para obtener la ubicación actual

  const mainCategories = [
    "Hamburguesas",
    "Pizza",
    "Tacos",
    "Sándwiches",
    "Ensaladas"
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Actualizamos el estado con la categoría seleccionada
    navigate(`/CategoriesPage?categoria=${category}`); // Redirige a la ruta con el parámetro seleccionado
  };

  // Verificar si estamos en la página de inicio
  const isHomePage = location.pathname === "/";

  return (
    <nav className="categories-nav">
      <ul className="flex gap-x-2">
        {mainCategories.map((category) => (
          <li key={category}>
            {/* Si estamos en la HomePage, no aplicamos los estilos de botones */}
            <button
              onClick={() => handleCategorySelect(category)}
              className={`text-white ${!isHomePage ? `${selectedCategory === category ? 'bg-blue-500' : 'bg-gray-300'} px-4 py-2` : ''}`}
            >
              {category}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => navigate("/CategoriesPage")} className="text-white">
            Otras
          </button>
        </li>
      </ul>
    </nav>
  );
}

Categories.propTypes = {
  selectedCategory: PropTypes.string, // La categoría seleccionada desde el componente principal
};

export default Categories;
