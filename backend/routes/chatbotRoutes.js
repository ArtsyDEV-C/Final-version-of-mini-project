// filepath: backend/routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const passport = require('passport');

// Protect the routes with JWT middleware
router.get('/history', passport.authenticate('jwt', { session: false }), chatbotController.getChatHistory);
router.post('/message', passport.authenticate('jwt', { session: false }), chatbotController.saveChatMessage);
router.get('/response', passport.authenticate('jwt', { session: false }), chatbotController.getChatbotResponse);

module.exports = router;