// filepath: backend/models/City.js
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: String,
    country: String,
    coordinates: {
        lat: Number,
        lon: Number,
    },
});

module.exports = mongoose.model('City', CitySchema);