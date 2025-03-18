// filepath: backend/controllers/chatbotController.js
const axios = require('axios');
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

exports.getChatbotResponse = async (req, res) => {
    const { message } = req.query;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get chatbot response' });
    }
};