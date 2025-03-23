const express = require('express');
const router = express.Router();
const trafficController = require('../controllers/trafficController');

router.get('/traffic', trafficController.getTrafficData);

module.exports = router;