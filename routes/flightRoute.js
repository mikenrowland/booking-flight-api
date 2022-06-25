const express = require('express')

const router = express.Router();

const controller = require('../controllers/flightController');

router.get('/flights/', controller.getAllFlights);
router.post('/flights/', controller.createFlight);
router.get('/flights/:id', controller.getFlight);
router.put('/flights/:id', controller.updateFlight);
router.delete('/flights/:id', controller.deleteFlight);

module.exports = router;

