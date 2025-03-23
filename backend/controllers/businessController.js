// filepath: backend/controllers/businessController.js
const BusinessData = require('../models/BusinessData');

exports.getBusinessData = async (req, res) => {
    const { industry, limit = 100, sort = '-createdAt' } = req.query;

    try {
        const query = industry ? { industry } : {};
        const data = await BusinessData.find(query).limit(parseInt(limit)).sort(sort);
        res.json(data);
    } catch (error) {
        console.error("❌ Business data fetch error:", error.message);
        res.status(500).json({ error: 'Failed to fetch business data' });
    }
};

exports.getBusinessDataByIndustry = async (req, res) => {
    const { industry, limit = 100, sort = '-createdAt' } = req.query;

    try {
        const query = industry ? { industry } : {};
        const data = await BusinessData.find(query).limit(parseInt(limit)).sort(sort);
        res.json(data);
    } catch (error) {
        console.error("Business data fetch error:", error.message);
        res.status(500).json({ error: 'Failed to fetch business data' });
    }
};

// Additional routes for admin control (optional)
exports.createBusinessData = async (req, res) => {
    const { industry, data, source, region } = req.body;

    try {
        const newBusinessData = new BusinessData({ industry, data, source, region });
        await newBusinessData.save();
        res.status(201).json({ message: 'Business data created successfully' });
    } catch (error) {
        console.error("Business data creation error:", error.message);
        res.status(500).json({ error: 'Failed to create business data' });
    }
};

exports.updateBusinessData = async (req, res) => {
    const { id } = req.params;
    const { industry, data, source, region } = req.body;

    try {
        const updatedBusinessData = await BusinessData.findByIdAndUpdate(id, { industry, data, source, region }, { new: true });
        res.json(updatedBusinessData);
    } catch (error) {
        console.error("Business data update error:", error.message);
        res.status(500).json({ error: 'Failed to update business data' });
    }
};

exports.deleteBusinessData = async (req, res) => {
    const { id } = req.params;

    try {
        await BusinessData.findByIdAndDelete(id);
        res.json({ message: 'Business data deleted successfully' });
    } catch (error) {
        console.error("Business data deletion error:", error.message);
        res.status(500).json({ error: 'Failed to delete business data' });
    }
};