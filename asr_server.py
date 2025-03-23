from flask import Flask, request, jsonify
from vosk import Model, KaldiRecognizer
import wave
import json

app = Flask(__name__)
model = Model("./model-en")  # Ensure the path is correct

@app.route("/asr", methods=["POST"])
def transcribe():
    file = request.files['audio']
    wf = wave.open(file, "rb")
    rec = KaldiRecognizer(model, wf.getframerate())
    text = ""
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            text += json.loads(rec.Result())["text"] + " "
    return jsonify({ "text": text.strip() })

if __name__ == "__main__":
    app.run(port=5005)