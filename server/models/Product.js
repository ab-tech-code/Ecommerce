const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for the Product model.
 * This schema defines the structure of product documents in the MongoDB collection.
 */
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
    maxlength: [150, 'Product name cannot exceed 150 characters.'],
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required.'],
    unique: true,
    lowercase: true,
    // A slug is a URL-friendly version of the name.
    // Example: "Natural Golden Plant" -> "natural-golden-plant"
  },
  sku: {
    type: String,
    required: [true, 'Product SKU is required.'],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
    enum: {
      values: ['natural', 'synthetic', 'furniture', 'planter'],
      message: '{VALUE} is not a supported category.',
    },
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
    min: [0, 'Price cannot be negative.'],
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price cannot be negative.'],
    // Optional field for when an item is on sale.
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required.'],
    min: [0, 'Stock cannot be negative.'],
    default: 0,
  },
  images: {
    type: [String],
    required: [true, 'At least one product image is required.'],
    // Array of URLs to product images.
  },
  isFeatured: {
    type: Boolean,
    default: false,
    // To identify products to be featured on the homepage.
  },
  tags: {
    type: [String],
    // For filtering and search purposes.
  },
  specs: {
    type: Map,
    of: String,
    // Key-value pairs for product specifications (e.g., {"Material": "Ceramic", "Color": "White"}).
  },
  dimensions: {
    height: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    depth: { type: Number, min: 0 },
    // Dimensions with units stored separately if needed, or implied (e.g., in 'cm').
  },
  careInfo: {
    type: String,
    trim: true,
    // Specific care instructions, primarily for plant products.
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields.
  timestamps: true,
});

// Create a text index on name and description for text search capabilities.
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
