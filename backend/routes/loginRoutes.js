const express = require('express');
const router = express.Router();
const adminController = require('../controllers/loginController');

// Login Route
router.post('/login', adminController.login);

module.exports = router;
