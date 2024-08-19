// controllers/paymentController.js
const stripe = require('../stripeConfig'); // Import Stripe configuration
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Save payment intent details to your database
    await db('payments').insert({
      stripe_payment_id: paymentIntent.id,
      amount,
      currency,
      status: paymentIntent.status,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Handle Stripe Webhooks
exports.handleWebhook = async (req, res) => {
  const endpointSecret = 'your_webhook_signing_secret'; // Replace with your Stripe webhook secret
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await db('payments')
        .where({ stripe_payment_id: paymentIntent.id })
        .update({ status: 'succeeded' });
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      await db('payments')
        .where({ stripe_payment_id: paymentIntentFailed.id })
        .update({ status: 'failed' });
      console.log('PaymentIntent failed!');
      break;
    // Handle other event types if necessary
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
