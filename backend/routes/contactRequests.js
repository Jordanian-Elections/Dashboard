// backend/routes/contactRequests.js
const express = require('express');
const router = express.Router();
const knex = require('../db'); // Adjust the path to your knex instance

// Get all contact requests
router.get('/', async (req, res) => {
  try {
    const contactRequests = await knex('contact_request').select('*');
    res.json(contactRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact requests' });
  }
});

module.exports = router;
