const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { protect, admin } = require('../middleware/auth');

/**
 * @route   GET /api/blog
 * @desc    Get all published blog posts
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .populate('author', 'name')
      .sort({ publishedAt: -1 });

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/blog/:slug
 * @desc    Get a single blog post by slug
 * @access  Public
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true })
      .populate('author', 'name');

    if (!post) {
      const error = new Error('Blog post not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
});

// --- ADMIN ROUTES ---

/**
 * @route   POST /api/blog
 * @desc    Create a new blog post
 * @access  Private/Admin
 */
router.post('/', protect, admin, async (req, res, next) => {
  try {
    // Add the authenticated user's ID as the author
    const newPost = await BlogPost.create({ ...req.body, author: req.user.id });
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PATCH /api/blog/:id
 * @desc    Update a blog post
 * @access  Private/Admin
 */
router.patch('/:id', protect, admin, async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      const error = new Error('Blog post not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   DELETE /api/blog/:id
 * @desc    Delete a blog post
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      const error = new Error('Blog post not found');
      error.status = 404;
      return next(error);
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
