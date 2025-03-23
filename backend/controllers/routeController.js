const axios = require('axios');
const RouteData = require('../models/RouteData');

exports.getRoutes = async (req, res) => {
    const { user, limit = 100, sort = '-createdAt' } = req.query;

    try {
        const query = user ? { user } : {};
        const routes = await RouteData.find(query).limit(parseInt(limit)).sort(sort);
        res.json(routes);
    } catch (error) {
        console.error("Route fetch error:", error.message);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};

exports.getRoute = async (req, res) => {
    const { start, end } = req.body;

    if (
        !Array.isArray(start) || start.length !== 2 ||
        !Array.isArray(end) || end.length !== 2 ||
        typeof start[0] !== 'number' || typeof start[1] !== 'number' ||
        typeof end[0] !== 'number' || typeof end[1] !== 'number'
    ) {
        return res.status(400).json({ error: "Start and end must be [lon, lat] arrays." });
    }

    try {
        const orsRes = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            { coordinates: [start, end] },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTESERVICE_API_KEY}`
                }
            }
        );

        // Optionally save the generated route to the database
        const newRoute = new RouteData({
            routeName: `Route from ${start} to ${end}`,
            user: req.user._id,
            data: {
                coordinates: orsRes.data.features[0].geometry.coordinates,
                distance: orsRes.data.features[0].properties.segments[0].distance,
                duration: orsRes.data.features[0].properties.segments[0].duration,
                summary: orsRes.data.features[0].properties.summary
            }
        });
        await newRoute.save();

        res.json(orsRes.data);
    } catch (error) {
        console.error("Route API error:", error.message);
        res.status(500).json({ message: "Route fetch failed" });
    }
};