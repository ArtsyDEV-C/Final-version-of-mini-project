const express = require('express');
const router = express.Router();
const trafficController = require('../controllers/trafficController');
const passport = require('passport');

// Protect the route with JWT middleware
router.get('/data', passport.authenticate('jwt', { session: false }), trafficController.getTrafficData);

// Optional: Add a POST endpoint for capturing traffic snapshots
router.post('/log', passport.authenticate('jwt', { session: false }), trafficController.logTrafficData);

module.exports = router;