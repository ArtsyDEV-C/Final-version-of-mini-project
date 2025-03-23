const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alertsController');
const passport = require('passport');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});

// Protect the route with JWT middleware and apply rate limiting
router.post('/send-alert', passport.authenticate('jwt', { session: false }), limiter, alertsController.sendAlert);

module.exports = router;