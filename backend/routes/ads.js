

const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');

// Get all ads
router.get('/', adsController.getAds);

// Update ad status
router.put('/:id/status', adsController.updateAdStatus);

module.exports = router;