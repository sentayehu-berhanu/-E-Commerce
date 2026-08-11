const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get all orders (for admin or filtering by email)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Stripe Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { email, items, total } = req.body;
    
    // Create order as pending
    const order = new Order({
      email,
      items,
      total,
      status: 'Pending',
      paymentStatus: 'Pending'
    });
    const savedOrder = await order.save();

    if (!process.env.STRIPE_SECRET_KEY) {
      // Simulate success if no stripe key provided
      return res.json({ url: `http://localhost:5173/checkout/success?orderId=${savedOrder._id}` });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${savedOrder._id}`,
      cancel_url: `http://localhost:5173/cart`,
      customer_email: email,
    });

    savedOrder.stripeSessionId = session.id;
    await savedOrder.save();

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create new order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
