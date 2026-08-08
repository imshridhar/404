import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.datasets import fetch_california_housing
X = fetch_california_housing(as_frame=True).data[['AveRooms']]
y = fetch_california_housing(as_frame=True).target
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
lin = LinearRegression().fit(Xtr, ytr)
poly = PolynomialFeatures(3)
pol = LinearRegression().fit(poly.fit_transform(Xtr), ytr)
for i, (pred, color, title) in enumerate([
    (lin.predict(Xte), 'red', 'Linear'),
    (pol.predict(poly.transform(Xte)),  'green', 'Polynomial')], 1):
    plt.subplot(1, 2, i)
    plt.scatter(Xte, yte, c='blue', s=5)
    plt.plot(Xte, pred, c=color)
    plt.title(title)
    print(f"{title} MSE: {mean_squared_error(yte, pred):.4f}")
plt.tight_layout()
plt.show()