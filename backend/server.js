

// // server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const knex = require('knex');
// const knexConfig = require('./knexfile');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');
// const listRoutes = require('./routes/listRoutes');
// // const candidateRoutes = require('./routes/candidateRoutes');
// const circleRoutes = require('./routes/circlesRoutes');
// // const circleRoutes = require('./routes/circlesRoutes');
// const candidateRoutes = require('./routes/candidateRoutes');

// const app = express();
// const db = knex(knexConfig.development);

// app.use(cors());
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid Token' });
//     req.user = user;
//     next();
//   });
// }

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await knex('admins').where({ email }).first();

//   if (!admin || !(await bcrypt.compare(password, admin.password))) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   res.json({ token, role: admin.role });
// });

// // Get Admins (Super Admin Only)
// app.get('/admins', authenticateToken, async (req, res) => {
//   if (req.user.role !== 'super') {
//     return res.status(403).json({ message: 'Access Denied' });
//   }

//   const admins = await knex('admins').select('id', 'name', 'email', 'role', 'is_active');
//   res.json(admins);
// });

// // Update Admin (Super Admin Only)
// app.put('/admins/:id', authenticateToken, async (req, res) => {
//   if (req.user.role !== 'super') {
//     return res.status(403).json({ message: 'Access Denied' });
//   }

//   const { id } = req.params;
//   const { name, email, password, role, is_active } = req.body;

//   const updatedAdmin = {
//     name,
//     email,
//     role,
//     is_active,
//   };

//   if (password) {
//     updatedAdmin.password = await bcrypt.hash(password, 10);
//   }

//   await knex('admins').where({ id }).update(updatedAdmin);
//   res.json({ message: 'Admin updated successfully' });
// });
// // Use the routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/lists', listRoutes);
// app.use('/api/candidates', candidateRoutes);
// app.use('/api/circles', circleRoutes);
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// app.use('/api/candidates', candidateRoutes);
// // app.use('/candidates', candidateRoutes);



// app.post('/create-payment-intent', async (req, res) => {
//   const { amount, currency } = req.body;

//   if (!amount || isNaN(amount) || amount <= 0) {
//     return res.status(400).json({ error: 'Invalid amount' });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     await db('payments').insert({
//       stripe_payment_id: paymentIntent.id,
//       amount,
//       currency,
//       status: paymentIntent.status,
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Error creating payment intent:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const circleRoutes = require('./routes/circlesRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Initialize app and database
const app = express();
const db = knex(knexConfig.development);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Middleware
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
}

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await db('admins').where({ email }).first();

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({  token,
    role: admin.role,
    name: admin.name  });
});

// Get Admins (Super Admin Only)
app.get('/admins', authenticateToken, async (req, res) => {
  if (req.user.role !== 'super') {
    return res.status(403).json({ message: 'Access Denied' });
  }

  const admins = await db('admins').select('id', 'name', 'email', 'role', 'is_active');
  res.json(admins);
});

// Update Admin (Super Admin Only)
app.put('/admins/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'super') {
    return res.status(403).json({ message: 'Access Denied' });
  }

  const { id } = req.params;
  const { name, email, password, role, is_active } = req.body;

  const updatedAdmin = {
    name,
    email,
    role,
    is_active,
  };

  if (password) {
    updatedAdmin.password = await bcrypt.hash(password, 10);
  }

  await db('admins').where({ id }).update(updatedAdmin);
  res.json({ message: 'Admin updated successfully' });
});

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/circles', circleRoutes);

// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

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
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
