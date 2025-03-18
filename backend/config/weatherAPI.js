// filepath: backend/config/weatherAPI.js
const axios = require('axios');

const getWeatherData = async (lat, lon) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return response.data;
};

module.exports = getWeatherData;