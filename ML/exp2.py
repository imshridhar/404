import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
df = fetch_california_housing(as_frame=True).frame
plt.figure(figsize=(10,8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', fmt='.2f')
plt.title("Correlation Matrix")
plt.show()
sns.pairplot(df[['MedInc', 'HouseAge', 'AveRooms', 'AveOccup', 'MedHouseVal']])
plt.show()