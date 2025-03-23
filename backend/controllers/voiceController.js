const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.transcribeAudio = async (req, res) => {
    try {
        const form = new FormData();
        form.append('audio', fs.createReadStream(req.file.path));

        const response = await axios.post('http://localhost:5005/asr', form, {
            headers: form.getHeaders()
        });

        res.json({ text: response.data.text });
    } catch (error) {
        console.error("ASR API error:", error.message);
        res.status(500).json({ message: "ASR transcription failed" });
    }
};