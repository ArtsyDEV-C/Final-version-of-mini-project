const axios = require('axios');
const RouteData = require('../models/RouteData');

exports.getRoutes = async (req, res) => {
    try {
        const routes = await RouteData.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};

exports.getRoute = async (req, res) => {
    const { start, end } = req.body;

    try {
        const orsRes = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            {
                coordinates: [start, end]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTESERVICE_API_KEY}`
                }
            }
        );
        res.json(orsRes.data);
    } catch (error) {
        console.error("Route API error:", error.message);
        res.status(500).json({ message: "Route fetch failed" });
    }
};