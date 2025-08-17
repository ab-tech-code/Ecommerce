const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for the Order model.
 * This schema defines the structure of order documents, capturing all necessary
 * information for processing and tracking customer orders.
 */
const orderSchema = new Schema({
  // Link to the User model if the order is placed by a registered user.
  // This is not required to allow for guest checkouts.
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // Information for guest checkouts.
  guestInfo: {
    email: { type: String, trim: true, lowercase: true },
    name: { type: String, trim: true },
  },
  // Array of items included in the order.
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true }, // Denormalized for convenience
    price: { type: Number, required: true }, // Price at the time of purchase
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }, // Denormalized for convenience
  }],
  // Detailed breakdown of the order costs.
  totals: {
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
  },
  // Customer's shipping address.
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String },
  },
  // Payment details.
  paymentMethod: {
    type: String,
    required: true,
    enum: ['paystack', 'cod'], // 'cod' for Cash on Delivery
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  // Reference from the Paystack transaction for verification.
  paystackRef: {
    type: String,
    trim: true,
  },
  // Current status of the order fulfillment process.
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields.
  timestamps: true,
});

// Ensure that either a user ID or guest email is present.
orderSchema.pre('validate', function(next) {
  if (!this.user && (!this.guestInfo || !this.guestInfo.email)) {
    next(new Error('Order must be associated with a user or a guest email.'));
  } else {
    next();
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
