import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
df = fetch_california_housing(as_frame=True).frame
num = df.select_dtypes(include=[np.number]).columns
df[num].hist(figsize=(15,10), bins=30, color='blue', edgecolor='black')
plt.suptitle('Distributions')
plt.tight_layout()
plt.show()
fig, axes = plt.subplots(3, 3, figsize=(15, 10))
for ax, col in zip(axes.flatten(), num):
    sns.boxplot(x=df[col], color='orange', ax=ax).set_title(col)
plt.tight_layout()
plt.show()
Q1, Q3 = df[num].quantile(0.25), df[num].quantile(0.75)
IQR = Q3 - Q1
outliers = ((df[num] < Q1 - 1.5*IQR) | (df[num] > Q3 + 1.5*IQR)).sum()
print("Outliers:\n", outliers)
print("\nSummary:\n", df.describe())