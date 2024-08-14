// routes/circlesRoutes.js
const express = require('express');
const router = express.Router();
const circlesController = require('../controllers/circlesController');

router.get('/', circlesController.getCircles);
router.post('/', circlesController.createCircle);
router.put('/:id', circlesController.updateCircle);
router.delete('/:id', circlesController.deleteCircle);

module.exports = router;
