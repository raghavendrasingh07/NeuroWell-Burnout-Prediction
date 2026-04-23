from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "model.pkl")

model = joblib.load(MODEL_PATH)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()


    sleep = float(data.get("sleep", 6))
    activity = float(data.get("activity", 5))
    stress = float(data.get("stress", 5))

    pred = model.predict([[sleep, activity, stress]])
    risk = int(pred[0])

    labels = ["Low", "Medium", "High"]

    return jsonify({
        "risk": risk,
        "label": labels[risk],
        "confidence": 1.0
    })


if __name__ == "__main__":
    app.run(port=5000)
