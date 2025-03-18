// filepath: backend/models/BusinessData.js
const mongoose = require('mongoose');

const BusinessDataSchema = new mongoose.Schema({
    industry: String,
    data: Object,
});

module.exports = mongoose.model('BusinessData', BusinessDataSchema);