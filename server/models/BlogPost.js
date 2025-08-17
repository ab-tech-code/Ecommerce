const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for the BlogPost model.
 * This schema defines the structure for blog posts, including content, author,
 * and publication status.
 */
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required.'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters.'],
  },
  slug: {
    type: String,
    required: [true, 'Blog post slug is required.'],
    unique: true,
    lowercase: true,
  },
  heroImage: {
    type: String,
    // URL to the main image for the blog post.
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required.'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters.'],
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required.'],
  },
  tags: {
    type: [String],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    // Set this date when isPublished is changed to true.
  },
}, {
  timestamps: true,
});

/**
 * Middleware to set the publishedAt date when a post is published.
 */
blogPostSchema.pre('save', function(next) {
  // If the post is being published and publishedAt is not already set
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
