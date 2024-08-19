// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a payment intent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

// Route to handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

module.exports = router;
