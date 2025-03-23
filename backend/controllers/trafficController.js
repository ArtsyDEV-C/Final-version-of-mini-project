const axios = require('axios');
const TrafficData = require('../models/TrafficData'); // Assuming you have a TrafficData model

exports.getTrafficData = async (req, res) => {
    const { lat, lon, zoom = 10 } = req.query;

    // Validate input
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ message: "Invalid or missing coordinates" });
    }

    try {
        const response = await axios.get(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/${zoom}/json`,
            {
                params: {
                    point: `${lat},${lon}`,
                    key: process.env.TOMTOM_API_KEY
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("❌ Traffic API error:", error.message);
        res.status(500).json({ message: "Failed to fetch traffic data" });
    }
};

// Optional: Add a method for logging traffic data
exports.logTrafficData = async (req, res) => {
    const { lat, lon, zoom = 10 } = req.body;

    // Validate input
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ message: "Invalid or missing coordinates" });
    }

    try {
        const response = await axios.get(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/${zoom}/json`,
            {
                params: {
                    point: `${lat},${lon}`,
                    key: process.env.TOMTOM_API_KEY
                }
            }
        );

        // Save the traffic data to the database
        const newTrafficData = new TrafficData({
            coordinates: [lat, lon],
            data: response.data
        });
        await newTrafficData.save();

        res.status(201).json({ message: 'Traffic data logged successfully' });
    } catch (error) {
        console.error("❌ Traffic API error:", error.message);
        res.status(500).json({ message: "Failed to log traffic data" });
    }
};