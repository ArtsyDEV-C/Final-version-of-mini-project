const axios = require('axios');

exports.getTrafficData = async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const response = await axios.get(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&key=${process.env.TOMTOM_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Traffic API error:", error.message);
        res.status(500).json({ message: "Failed to fetch traffic data" });
    }
};