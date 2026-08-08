import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split

X = fetch_california_housing(as_frame=True).frame[['MedInc']].values
y = fetch_california_housing(as_frame=True).frame['MedHouseVal'].values
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)

def lwr(Xtr, ytr, Xte, t=0.1):
    Xb = np.c_[np.ones(len(Xtr)), Xtr]
    return np.array([
        [1, x[0]] @ np.linalg.lstsq(
            Xb * np.exp(-((Xtr - x)**2).sum(1)/(2*t*t))[:, None],
            ytr * np.exp(-((Xtr - x)**2).sum(1)/(2*t*t)),
            rcond=None
        )[0] for x in Xte
    ])

yp = lwr(Xtr, ytr, Xte)
print("MSE:", round(((yp - yte)**2).mean(), 4))

plt.scatter(Xte, yte, s=10, label="True")
plt.scatter(Xte, yp, s=10, label="Predicted")
plt.xlabel("Median Income")
plt.ylabel("Median House Value")
plt.legend()
plt.grid()
plt.show()