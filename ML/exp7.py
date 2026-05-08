import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.datasets import fetch_california_housing
data = fetch_california_housing(as_frame=True)
X = data.data[['AveRooms']]
y = data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
lin = LinearRegression().fit(X_train, y_train)
y_lin = lin.predict(X_test)
poly = PolynomialFeatures(3)
X_train_p = poly.fit_transform(X_train)
X_test_p = poly.transform(X_test)
poly_model = LinearRegression().fit(X_train_p, y_train)
y_poly = poly_model.predict(X_test_p)
plt.subplot(1,2,1)
plt.scatter(X_test, y_test, color='blue')
plt.plot(X_test, y_lin, color='red')
plt.title("Linear")
plt.subplot(1,2,2)
plt.scatter(X_test, y_test, color='blue')
plt.plot(X_test, y_poly, color='green')
plt.title("Polynomial")
plt.tight_layout()
plt.show()
print("Linear MSE:", mean_squared_error(y_test, y_lin))
print("Polynomial MSE:", mean_squared_error(y_test, y_poly)) 