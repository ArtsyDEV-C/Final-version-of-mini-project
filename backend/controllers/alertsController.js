// filepath: backend/controllers/alertsController.js
const twilioClient = require('../config/twilio');

exports.sendAlert = (req, res) => {
    const { message, to } = req.body;

    twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
    })
    .then(message => res.json({ success: true, message: message.sid }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
};