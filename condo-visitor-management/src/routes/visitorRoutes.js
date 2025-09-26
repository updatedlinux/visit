const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Swagger annotations for each endpoint
router.post('/new', visitorController.createUniqueVisitor);
router.post('/new/frequent', visitorController.createFrequentVisitor);
router.get('/history/:wp_user_id', visitorController.getVisitorHistory);
router.put('/frequent/:id/activate', visitorController.activateFrequentVisitor);
router.put('/frequent/:id/deactivate', visitorController.deactivateFrequentVisitor);
router.get('/validate/:id_card', visitorController.validateVisitor);
router.post('/log/:visitor_id', visitorController.logVisitorArrival);
router.get('/today', visitorController.getTodaysVisitors);

module.exports = router;