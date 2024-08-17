// routes/ads.js
const express = require('express');
const router = express.Router();
const { getAds, updateAdStatus } = require('../controllers/adsController');

// Route to get all ads
router.get('/', getAds);

// Route to update ad status
router.put('/:id/status', updateAdStatus);

module.exports = router;
