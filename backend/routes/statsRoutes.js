// // routes/statsRoutes.js
// const express = require('express');
// const router = express.Router();
// const statsController = require('../controllers/statsController');

// // Define routes
// router.get('/', statsController.getStats);
// router.get('/recent-elections', statsController.getRecentElections);
// router.post('/elections', statsController.addElection);
// router.get('/elections/upcoming', statsController.getUpcomingElection);



// module.exports = router;


// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Define routes
router.get('/', statsController.getStats);
router.get('/recent-elections', statsController.getRecentElections);
router.post('/elections', statsController.addElection);
router.get('/elections/upcoming', statsController.getUpcomingElection);

module.exports = router;
