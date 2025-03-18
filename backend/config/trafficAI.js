const axios = require('axios');

const getTrafficData = async (location) => {
    const apiKey = process.env.TRAFFIC_API_KEY;
    const response = await axios.get(`https://api.trafficservice.com/data?location=${location}&apikey=${apiKey}`);
    return response.data;
};

module.exports = getTrafficData;