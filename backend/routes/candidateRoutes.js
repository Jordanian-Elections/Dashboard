
// const express = require('express');
// const router = express.Router();
// const { toggleCandidateStatus } = require('../controllers/candidateController');

// // Route to toggle candidate status
// router.post('/toggle-status', toggleCandidateStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { toggleCandidateStatus } = require('../controllers/candidateController'); // Adjust path as necessary

router.patch('/toggle-status', toggleCandidateStatus);

module.exports = router;
