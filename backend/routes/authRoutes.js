// filepath: backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']  // include email!
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // You can return token via JSON or redirect
    res.redirect(`/dashboard?token=${token}`);
  } catch (error) {
    console.error("Google login error:", error.message);
    res.redirect('/login?error=auth_failed');
  }
});

module.exports = router;