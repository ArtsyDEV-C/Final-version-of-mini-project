// filepath: backend/controllers/weatherController.js
const getWeatherData = require('../config/weatherAPI');

exports.getWeather = async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const data = await getWeatherData(lat, lon);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};