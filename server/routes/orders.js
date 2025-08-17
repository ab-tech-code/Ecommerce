const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
// const authMiddleware = require('../middleware/auth'); // To be added later

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Public (but user ID can be attached if logged in)
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      user, // Optional: User ID if logged in
      guestInfo, // Optional: { email, name } if guest
      items, // [{ productId, quantity }]
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cannot create an order with no items.' });
    }
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Shipping address and payment method are required.' });
    }
     if (!user && !(guestInfo && guestInfo.email)) {
      return res.status(400).json({ message: 'Order must be linked to a user or a guest email.' });
    }

    // --- Calculate totals from the backend to prevent client-side manipulation ---
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}.` });
      }

      const price = product.salePrice || product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: price,
        quantity: item.quantity,
        image: product.images[0] || '',
      });
    }

    // TODO: Implement actual shipping cost calculation logic
    const shippingCost = subtotal > 100 ? 0 : 10; // Example: Free shipping over $100
    const total = subtotal + shippingCost;

    // Create the new order
    const newOrder = new Order({
      user: user || undefined,
      guestInfo: user ? undefined : guestInfo,
      items: orderItems,
      totals: {
        subtotal,
        shipping: shippingCost,
        total,
      },
      shippingAddress,
      paymentMethod,
      // Default statuses are set in the model
    });

    const savedOrder = await newOrder.save();

    // TODO: Decrement product stock (can be done here or after payment confirmation)

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully.',
      data: {
        order: savedOrder,
      },
    });

  } catch (err) {
    next(err);
  }
});


/**
 * @route   GET /api/orders/:id
 * @desc    Get a single order by its ID
 * @access  Private (should be protected to only allow the user who owns it or an admin)
 */
router.get('/:id', async (req, res, next) => {
  try {
    // In a real app, you'd add auth middleware here to check if the user is the owner or an admin
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');

    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
});


/**
 * @route   GET /api/orders/user/:userId
 * @desc    Get all orders for a specific user
 * @access  Private
 */
// router.get('/user/:userId', authMiddleware, async (req, res, next) => { ... });


module.exports = router;
