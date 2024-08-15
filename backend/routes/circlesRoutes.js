
const express = require('express');
const router = express.Router();
const { getCirclesListsCandidates } = require('../controllers/circlesController');

// Route to get circles, lists, and candidates
router.get('/circles-lists-candidates', getCirclesListsCandidates);

module.exports = router;
