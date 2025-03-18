// filepath: backend/controllers/businessController.js
const BusinessData = require('../models/BusinessData');

exports.getBusinessData = async (req, res) => {
    try {
        const data = await BusinessData.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch business data' });
    }
};