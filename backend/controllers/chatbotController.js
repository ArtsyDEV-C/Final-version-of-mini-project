// filepath: backend/controllers/chatbotController.js
const ChatHistory = require('../models/ChatHistory');

exports.getChatHistory = async (req, res) => {
    try {
        const history = await ChatHistory.find();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
};

exports.saveChatMessage = async (req, res) => {
    const { message, user } = req.body;
    try {
        const newMessage = new ChatHistory({ message, user });
        await newMessage.save();
        res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};