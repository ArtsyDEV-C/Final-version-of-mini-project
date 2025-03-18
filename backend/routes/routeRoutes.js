// filepath: backend/routes/routeRoutes.js
const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

router.get('/', routeController.getRoutes);

module.exports = router;