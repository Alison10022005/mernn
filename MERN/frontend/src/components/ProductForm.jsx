import { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import PropTypes from 'prop-types';

const ProductForm = ({ categories, productToEdit }) => {
  const { addProduct } = useContext(ProductsContext); // Contexto para agregar productos
  const [formData, setFormData] = useState({
    name: productToEdit?.name || '',
    price: productToEdit?.price || '',
    description: productToEdit?.description || '',
    category: productToEdit?.category || '',
    image: productToEdit?.image || '',
    discount: productToEdit?.discount || '',
    discountStartDate: productToEdit?.discountStartDate || '',
    discountEndDate: productToEdit?.discountEndDate || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, price, category } = formData;

    // Validaciones
    if (!name || !price || !category) {
      setError('Por favor completa los campos obligatorios.');
      return;
    }

    if (price <= 0 || (formData.discount && formData.discount < 0)) {
      setError('El precio y el descuento deben ser números positivos.');
      return;
    }

    setError(''); // Limpiar error en caso de éxito
    addProduct(formData); // Agregar producto usando el contexto
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Nombre del producto"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="image"
        placeholder="Imagen URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="number"
        name="discount"
        placeholder="Descuento (%)"
        value={formData.discount}
        onChange={handleChange}
      />
      <input
        type="date"
        name="discountStartDate"
        placeholder="Fecha inicio descuento"
        value={formData.discountStartDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="discountEndDate"
        placeholder="Fecha fin descuento"
        value={formData.discountEndDate}
        onChange={handleChange}
      />
      <button type="submit">Guardar Producto</button>
    </form>
  );
};
// Definición de las validaciones de los props
ProductForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  productToEdit: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    discount: PropTypes.number,
    discountStartDate: PropTypes.string,
    discountEndDate: PropTypes.string,
  }),
};

export default ProductForm;
