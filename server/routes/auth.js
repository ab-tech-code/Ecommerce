const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

// --- Validation Schemas ---
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// --- Helper to generate JWT ---
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res, next) => {
    // 1. Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    try {
        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User with this email already exists.' });

        // 3. Create new user (password will be hashed by pre-save hook in model)
        user = new User({ name, email, hashedPassword: password });
        await user.save();

        // 4. Generate token and respond
        const token = generateToken(user);
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
        next(err);
    }
});


/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', async (req, res, next) => {
    // 1. Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    try {
        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        // 3. Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        // 4. Generate token and respond
        const token = generateToken(user);
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
