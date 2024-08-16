const knex = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch admin by email
    const admin = await knex('admins').where({ email }).first();

    // Check if admin exists and password matches
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token and admin details
    res.json({
      token,
      role: admin.role,
      name: admin.name,
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
