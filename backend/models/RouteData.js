// filepath: backend/models/RouteData.js
const mongoose = require('mongoose');

const RouteDataSchema = new mongoose.Schema({
    routeName: String,
    data: Object,
});

module.exports = mongoose.model('RouteData', RouteDataSchema);