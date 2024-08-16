// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Define routes
router.get('/', statsController.getStats);
// router.get('/api/chart-data', statsController.getChartData);
// router.get('/api/users', statsController.getUsers);

module.exports = router;
