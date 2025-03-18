// filepath: backend/controllers/routeController.js
const RouteData = require('../models/RouteData');

exports.getRoutes = async (req, res) => {
    try {
        const routes = await RouteData.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};