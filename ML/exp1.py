import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
df = fetch_california_housing(as_frame=True).frame
df.hist(figsize=(15, 10), bins=30)
plt.suptitle("Distributions")
plt.show()
plt.figure(figsize=(15, 10))
for i, col in enumerate(df.columns, 1):
    plt.subplot(3, 3, i)
    sns.boxplot(x=df[col])
    plt.title(col)
plt.tight_layout()
plt.show()
Q1 = df.quantile(0.25)
Q3 = df.quantile(0.75)
IQR = Q3 - Q1
outliers = ((df < (Q1 - 1.5 * IQR)) |
            (df > (Q3 + 1.5 * IQR))).sum()
print("Outliers per column:")
print(outliers)
print("\nSummary Statistics:")
print(df.describe())