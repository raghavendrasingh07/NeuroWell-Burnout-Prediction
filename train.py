import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

df = pd.read_csv("dataset/dataset.csv")

df = df.dropna()

X = df[["Sleep Duration", "Physical Activity Level", "Stress Level"]]

y = df["Sleep Disorder"]
y = y.map({
"None": 0,
"Insomnia": 1,
"Sleep Apnea": 2
})

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

joblib.dump(model, "backend/model/model.pkl")

print("Model trained & saved")
