const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const passport = require('passport');
const NodeCache = require('node-cache');

const weatherCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Middleware to check cache
const checkCache = (req, res, next) => {
    const { lat, lon } = req.query;
    const cacheKey = `${lat},${lon}`;

    if (weatherCache.has(cacheKey)) {
        return res.json(weatherCache.get(cacheKey));
    }

    res.locals.cacheKey = cacheKey;
    next();
};

// Protect the route with JWT middleware and check cache
router.get('/', passport.authenticate('jwt', { session: false }), checkCache, weatherController.getWeather);

module.exports = router;