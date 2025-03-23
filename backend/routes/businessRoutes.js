// filepath: backend/routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const passport = require('passport');

// Protect the route with JWT middleware
router.get('/', passport.authenticate('jwt', { session: false }), businessController.getBusinessDataByIndustry);

// Admin routes for creating, updating, and deleting business data
router.post('/', passport.authenticate('jwt', { session: false }), businessController.createBusinessData);
router.put('/:id', passport.authenticate('jwt', { session: false }), businessController.updateBusinessData);
router.delete('/:id', passport.authenticate('jwt', { session: false }), businessController.deleteBusinessData);

module.exports = router;