import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String }, // Para la URL de la imagen del producto
  category: { type: String }, // Categoría del producto
  stock: { type: Number, default: 0 }, // Para gestionar la cantidad de productos disponibles
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;

