# 🧠 NeuroWell — Burnout Risk Prediction Dashboard

An AI-powered web application that predicts burnout risk based on lifestyle and behavioral factors such as sleep, work hours, physical activity, screen time, and stress level.

---

## 🚀 Features

* 🔥 Real-time burnout prediction
* 📊 Interactive dashboard UI
* 🤖 Machine Learning model (Flask backend)
* 📉 7-day trend visualization (Chart.js)
* 🔍 Explainable AI (factor-wise contribution)
* 🎛️ What-if simulation using sliders

---

## 🧠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Flask (Python)
* **Machine Learning:** Scikit-learn / TensorFlow
* **Visualization:** Chart.js

---

## 📸 Demo

(Add your screenshots here)

Example:

![Dashboard](screenshot.png)

---

## ⚙️ Project Structure

```
Mini Project/
│
├── backend/
│   ├── app.py
│   ├── model/
│   │   └── model.pkl / lstm_model.h5
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── dataset/
│   └── dataset.csv
│
├── train.py
├── requirements.txt
└── README.md
```

---

## ⚙️ How to Run

### 🔹 1. Clone Repository

```
git clone https://github.com/raghavendrasingh07/NeuroWell---Burnout-Prediction.git
cd NeuroWell---Burnout-Prediction
```

---

### 🔹 2. Setup Environment

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

---

### 🔹 3. Run Backend

```
cd backend
python app.py
```

Server will start at:

```
http://127.0.0.1:5000
```

---

### 🔹 4. Run Frontend

```
cd frontend
python -m http.server 5500
```

Open:

```
http://localhost:5500
```

---

## 📊 Inputs

* 😴 Sleep Duration
* 💼 Work / Study Hours
* 🏃 Physical Activity
* 📱 Screen Time
* 😵 Stress Level

---

## 🎯 Output

* Burnout Risk (Low / Medium / High)
* Confidence Score
* Explainable AI Insights
* Trend Graph Visualization

---

## 🧠 How It Works

1. User inputs values via sliders
2. Frontend sends data to Flask API
3. ML model predicts burnout risk
4. Results are displayed in real-time dashboard

---

## 👨‍💻 Author

**Raghavendra Singh**

---

## ⭐ Future Improvements

* Model accuracy improvement
* Deployment (Render / Vercel)
* User authentication
* Historical tracking
