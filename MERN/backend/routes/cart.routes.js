import express from 'express';
import Cart from '../models/cart.js'; // Importa el modelo de carrito

const router = express.Router();

// Obtener los artículos del carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error obteniendo los artículos del carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Agregar un producto al carrito
router.post('/:userId', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      // Si no existe un carrito para el usuario, creamos uno nuevo
      cart = new Cart({
        userId: req.params.userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Si el carrito ya existe, agregamos el producto
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (productIndex >= 0) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        cart.items[productIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, lo agregamos
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error agregando producto al carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar un producto del carrito
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Filtrar el producto que se eliminará
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error eliminando producto del carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
