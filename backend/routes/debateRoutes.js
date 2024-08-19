const express = require('express');
const router = express.Router();
const debateController = require('../controllers/debateController');

router.get('/', debateController.getDebates);

// Route to update approval status of a debate
router.put('/:id', debateController.updateDebateStatus);

// Route to update the code of a debate
router.put('/:id/code', debateController.updateDebateCodes);





module.exports = router;
