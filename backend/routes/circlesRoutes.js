
// const express = require('express');
// const router = express.Router();
// const { getCirclesListsCandidates,addListWithCandidates } = require('../controllers/circlesController');

// // Route to get circles, lists, and candidates
// router.get('/circles-lists-candidates', getCirclesListsCandidates);
// router.post('/circles/add-list', addListWithCandidates);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const circlesController = require('../controllers/circlesController');

// // Get all circles with lists and candidates
// router.get('/circles-lists-candidates', circlesController.getCirclesWithListsAndCandidates);

// // Toggle candidate status
// router.patch('/candidates/toggle-status/:candidate_national_id', circlesController.toggleCandidateStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const circlesController = require('../controllers/circlesController');

// Get all circles with lists and candidates
router.get('/circles-lists-candidates', circlesController.getCirclesWithListsAndCandidates);

// Toggle candidate status
router.patch('/candidates/toggle-status/:candidate_national_id', circlesController.toggleCandidateStatus);

module.exports = router;
