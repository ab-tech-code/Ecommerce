const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for the Review model.
 * This schema defines the structure for product reviews submitted by users or guests.
 */
const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'A review must be associated with a product.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // Not required to allow guest reviews.
  },
  guestName: {
    type: String,
    trim: true,
    // Required if the user is not logged in.
  },
  rating: {
    type: Number,
    required: [true, 'A rating is required.'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'A comment is required.'],
    trim: true,
    maxlength: [2000, 'Comment cannot exceed 2000 characters.'],
  },
  isApproved: {
    type: Boolean,
    default: true, // Auto-approve for now, can be changed to false for moderation
  }
}, {
  timestamps: true,
});

// Ensure that either a user ID or a guest name is present.
reviewSchema.pre('validate', function(next) {
  if (!this.user && !this.guestName) {
    next(new Error('Review must have a user or a guest name.'));
  } else {
    next();
  }
});

// Create an index on product and user to prevent a user from leaving multiple reviews on the same product.
// This is only effective for registered users.
reviewSchema.index({ product: 1, user: 1 }, { unique: true, partialFilterExpression: { user: { $exists: true } } });


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
