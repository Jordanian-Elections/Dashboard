const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Define routes for lists
router.get('/', listController.getAllLists);
router.post('/', listController.addList);
router.put('/:id', listController.updateList);
router.patch('/:id', listController.toggleListActive);
router.delete('/:id', listController.deleteList);

module.exports = router;
