import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, LogisticRegression

# Name of cvs data gose in those brackets
df= pd.read_csv("VideoGameSales.csv")
 
#check video for help with next part
df = df.replace('nan', np.nan)
df = df.dropna()

X  = df[["Critic_Score"]]
y = df["Global_Sales"]

model = LinearRegression()
model.fit(X,y)


x_line= np.linspace(X["Critic_Score"].min(), X["Critic_Score"].max(), 100).reshape(-1,1)
y_line = model.predict(x_line)

plt.figure()
plt.scatter(X["Critic_Score"],y)
plt.plot(x_line, y_line)
plt.xlabel("Critic_Score")
plt.ylabel("Global_Sales")
plt.title("Critic Scores effect on Global Sales")
plt.show()

print("Liner Regression Equation:")
print(f"Global_Sales = {model.coef_[0]:.2f} * Critic_Score + {model.intercept_:.2f}")
