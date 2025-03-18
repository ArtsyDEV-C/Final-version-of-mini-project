// filepath: backend/models/ChatHistory.js
const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema({
    message: String,
    user: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatHistory', ChatHistorySchema);