// const knex = require('../db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Login controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch admin by email
//     const admin = await knex('admins').where({ email }).first();

//     // Check if admin exists and password matches
//     if (!admin || !(await bcrypt.compare(password, admin.password))) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     // Respond with token and admin details
//     res.json({
//       token,
//       role: admin.role,
//       name: admin.name,
//     });
//   } catch (error) {
//     console.error('Error during login:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


const knex = require('../db'); // Import the Knex library for database interactions
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing and comparison
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating JWT tokens

// Login controller function
exports.login = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Fetch the admin record from the database by email
    const admin = await knex('admins').where({ email }).first();

    // Check if the admin exists and if the provided password matches the hashed password in the database
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      // If no matching admin or password does not match, return a 400 status with an error message
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If credentials are valid, generate a JWT token with the admin's id and role
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set the token expiration time to 1 hour
    });

    // Respond with the token, admin's role, and name
    res.json({
      token, // The JWT token for authentication
      role: admin.role, // The role of the admin
      name: admin.name, // The name of the admin
    });
  } catch (error) {
    // Log the error and respond with a 500 status for any unexpected issues
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
