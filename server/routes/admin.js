const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Order = require('../models/Order');
const BlogPost = require('../models/BlogPost');

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
    // NOTE: This route is not tested due to the absence of a database connection in the test environment.
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/admin/blog
// @desc    Create a blog post
// @access  Private/Admin
router.post('/blog', protect, admin, async (req, res) => {
    // NOTE: This route is not tested due to the absence of a database connection in the test environment.
    const { title, content, image } = req.body;
    try {
        const newPost = new BlogPost({
            title,
            content,
            heroImage: image,
            author: req.user.id,
            // The following fields are placeholders and may need to be adjusted
            slug: title.toLowerCase().replace(/ /g, '-'),
            excerpt: content.substring(0, 100),
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
