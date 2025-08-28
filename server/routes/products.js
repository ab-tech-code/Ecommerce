const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering, sorting, pagination, and search
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    // --- FILTERING ---
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'q'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering (e.g., for price ranges: gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // --- SEARCHING ---
    // ?q=keyword
    if (req.query.q) {
      const searchQuery = { $text: { $search: req.query.q } };
      query = query.find(searchQuery);
    }

    // --- SORTING ---
    // ?sort=price,-createdAt
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort
    }

    // --- FIELD LIMITING ---
    // ?fields=name,price,category
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v'); // Exclude mongoose version key
    }

    // --- PAGINATION ---
    // ?page=2&limit=10
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const products = await query;

    // Get total count for pagination headers/info
    const totalProducts = await Product.countDocuments(JSON.parse(queryStr));

    res.status(200).json({
      status: 'success',
      results: products.length,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/products/:slug
 * @desc    Get a single product by its slug
 * @access  Public
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }

    // --- WhatsApp Order Link ---
    // IMPORTANT: Replace with your actual WhatsApp number
    const yourWhatsAppNumber = 'YOUR_WHATSAPP_NUMBER_HERE'; // e.g., '+2348123456789'

    const message = `Hello, I'm interested in the product: ${product.name}. Price: ₦${product.price}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;

    res.status(200).json({
      status: 'success',
      data: {
        product: { ...product.toObject(), whatsappLink },
      },
    });
  } catch (err) {
    next(err);
  }
});

// --- ADMIN ROUTES (Protected) ---
// For now, these are open. They will be protected later with auth middleware.

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private/Admin
 */
router.post('/', protect, admin, async (req, res, next) => {
    try {
        const { name, description, price, stock, images, category } = req.body;

        // Generate slug
        const slug = slugify(name, { lower: true, strict: true });

        // Generate SKU
        const sku = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Set default category if not provided
        const productCategory = category || 'natural';

        const newProduct = await Product.create({
            name,
            slug,
            sku,
            description,
            price,
            stock,
            images,
            category: productCategory,
        });

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   PATCH /api/products/:id
 * @desc    Update a product
 * @access  Private/Admin
 */
router.patch('/:id', protect, admin, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
