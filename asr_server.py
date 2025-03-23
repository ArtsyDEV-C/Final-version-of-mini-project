from flask import Flask, request, jsonify
from flask_cors import CORS
from vosk import Model, KaldiRecognizer
import wave
import json

app = Flask(__name__)
CORS(app)  # Enable CORS if frontend ever hits Flask directly

model = Model("./model-en")  # Ensure the path is correct

@app.route("/asr", methods=["POST"])
def transcribe():
    try:
        file = request.files['audio']
        if not file or not file.filename.endswith(".wav"):
            return jsonify({ "error": "Invalid or missing .wav audio file" }), 400

        wf = wave.open(file, "rb")
        rec = KaldiRecognizer(model, wf.getframerate())

        text = ""
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text += result.get("text", "") + " "

        return jsonify({ "text": text.strip() })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == "__main__":
    app.run(port=5005)