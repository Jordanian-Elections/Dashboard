

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
const adminRoutes = require('./routes/adminsRoutes.js');
const listRoutes = require('./routes/listRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
// const statsRoutes = require('./routes/statsRoutes.js');
const circleRoutes = require('./routes/circlesRoutes');
const loginRoutes = require('./routes/loginRoutes.js');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adsRoutes = require('./routes/ads');
const contactRequestsRouter = require('./routes/contactRequests');
// const electionRoutes = require('./routes/electionRoutes.js');
const debateRoutes = require('./routes/debateRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes'); // Import your payment routes
const electionRoutes = require('./routes/statsRoutes.js');


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

  res.json({
    token,
    role: admin.role,
    name: admin.name,
  });
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
app.use('/api', userRoutes); 
app.use('/api/lists', listRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/circles', circleRoutes);
// app.use('/api/stats', statsRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/contact-requests', contactRequestsRouter);
// app.use('/api/time', electionRoutes);
app.use('/api/debate', debateRoutes);
app.use('/payments', paymentRoutes);
app.use('/api/over', electionRoutes);




// Fetch Revenue Data
app.get('/api/revenue', async (req, res) => {
  try {
    const revenueData = await db('payments')
      .select('created_at', 'amount', 'currency')
      .orderBy('created_at', 'desc');

    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ error: 'An error occurred while fetching revenue data' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
