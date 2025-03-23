const express = require('express');
const multer = require('multer');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

const upload = multer({ dest: 'uploads/' });

router.post('/transcribe', upload.single('audio'), voiceController.transcribeAudio);

module.exports = router;