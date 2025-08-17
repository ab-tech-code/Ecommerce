const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();
const Order = require('../models/Order');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET;

const paystack = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * @route   POST /api/payments/paystack/init
 * @desc    Initialize a Paystack transaction
 * @access  Public
 */
router.post('/paystack/init', async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required.' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const email = order.user ? (await order.populate('user')).user.email : order.guestInfo.email;
    const amount = Math.round(order.totals.total * 100); // Amount in kobo

    const response = await paystack.post('/transaction/initialize', {
      email,
      amount,
      metadata: {
        order_id: order._id.toString(),
      },
      // callback_url: `${process.env.CLIENT_URL}/order-confirmation?ref={reference}`
    });

    // Save the reference to the order for verification later
    order.paystackRef = response.data.data.reference;
    await order.save();

    res.status(200).json(response.data);

  } catch (err) {
    console.error('Paystack initialization error:', err.response ? err.response.data : err.message);
    next(err);
  }
});

/**
 * @route   POST /api/payments/paystack/verify
 * @desc    Verify a Paystack transaction
 * @access  Public
 */
router.post('/paystack/verify', async (req, res, next) => {
    try {
        const { reference } = req.body;
        if (!reference) {
            return res.status(400).json({ message: 'Transaction reference is required.' });
        }

        const response = await paystack.get(`/transaction/verify/${reference}`);
        const { status, data } = response;

        if (status === 200 && data.data.status === 'success') {
            const order = await Order.findOne({ paystackRef: reference });
            if (order) {
                order.paymentStatus = 'paid';
                order.status = 'processing';
                await order.save();
                // TODO: Decrement stock
            }
            res.status(200).json({ status: 'success', message: 'Payment verified successfully.', order });
        } else {
            res.status(400).json({ status: 'failed', message: 'Payment verification failed.' });
        }
    } catch (err) {
        next(err);
    }
});


/**
 * @route   POST /api/payments/paystack/webhook
 * @desc    Handle Paystack webhook events
 * @access  Public
 */
router.post('/paystack/webhook', async (req, res) => {
    // Validate the webhook signature
    const hash = crypto.createHmac('sha512', PAYSTACK_WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex');
    if (hash !== req.headers['x-paystack-signature']) {
        console.warn('Invalid Paystack webhook signature.');
        return res.sendStatus(401); // Unauthorized
    }

    const event = req.body;

    if (event.event === 'charge.success') {
        const { reference } = event.data;
        const order = await Order.findOne({ paystackRef: reference });

        if (order && order.paymentStatus !== 'paid') {
            order.paymentStatus = 'paid';
            order.status = 'processing';
            await order.save();
            console.log(`Order ${order._id} marked as paid via webhook.`);
            // TODO: Decrement stock, send order confirmation email
        }
    }

    res.sendStatus(200);
});


module.exports = router;
