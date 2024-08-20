// // const express = require('express');
// // const router = express.Router();
// // const requestController = require('../controllers/requestController');

// // // Fetch requests
// // router.get('/', requestController.getRequests);

// // // Approve request
// // router.post('/approve/:type/:id', requestController.approveRequest);

// // // Reject request
// // router.post('/reject/:type/:id', requestController.rejectRequest);

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const requestController = require('../controllers/requestController');

// // Fetch requests
// router.get('/', requestController.getRequests);

// // Approve request
// router.post('/approve/:type/:id', requestController.approveRequest);

// // Reject request
// router.post('/reject/:type/:id', requestController.rejectRequest);

// module.exports = router;


const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Fetch requests
router.get('/', requestController.getRequests);

// Approve request
router.post('/approve/:type/:id', requestController.approveRequest);

// Reject request
router.post('/reject/:type/:id', requestController.rejectRequest);

module.exports = router;
