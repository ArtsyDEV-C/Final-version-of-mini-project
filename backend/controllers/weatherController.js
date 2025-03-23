// filepath: backend/controllers/weatherController.js
const getWeatherData = require('../config/weatherAPI');

exports.getWeather = async (req, res) => {
    const { lat, lon } = req.query;

    // Validate input
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: "Invalid or missing coordinates." });
    }

    try {
        const data = await getWeatherData(lat, lon);

        // Cache the result
        if (res.locals.cacheKey) {
            weatherCache.set(res.locals.cacheKey, data);
        }

        res.json(data);
    } catch (error) {
        console.error("Weather API error:", error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};