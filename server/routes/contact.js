const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Validation schema for the contact form
const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('').optional(), // Phone is optional
    message: Joi.string().min(10).max(2000).required(),
});

/**
 * @route   POST /api/contact
 * @desc    Handle contact form submission
 * @access  Public
 */
router.post('/', async (req, res, next) => {
    try {
        // 1. Validate the incoming data
        const { error, value } = contactSchema.validate(req.body);
        if (error) {
            // If validation fails, send a 400 Bad Request response
            return res.status(400).json({
                status: 'fail',
                message: error.details[0].message,
            });
        }

        const { name, email, phone, message } = value;

        // 2. Process the submission
        // For this project, we'll just log it to the console.
        // In a real application, you would:
        //  - Send an email to the admin (using a service like Nodemailer)
        //  - Save the message to a database collection
        //  - Send an auto-reply email to the user
        console.log('--- New Contact Form Submission ---');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone || 'Not provided'}`);
        console.log(`Message: ${message}`);
        console.log('------------------------------------');

        // 3. Send a success response
        res.status(200).json({
            status: 'success',
            message: 'Your message has been received. We will get back to you shortly.',
        });

    } catch (err) {
        // Pass any unexpected errors to the global error handler
        next(err);
    }
});

module.exports = router;
