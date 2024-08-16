
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all admins
router.get('/admins', adminController.getAllAdmins);

// Route to add a new admin
router.post('/admins', adminController.addAdmin);

// Route to update an admin
router.put('/admins/:id', adminController.updateAdmin);

// Route to deactivate an admin
router.post('/admins/:id/deactivate', adminController.deactivateAdmin);

// Route to activate an admin
router.post('/admins/:id/activate', adminController.activateAdmin);

module.exports = router;
