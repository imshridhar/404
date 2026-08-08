# ML Lab Exam - All 10 Experiments Explained for Easy Memorization

> **🧠 Master Mnemonic: Exp Order = E C P F K L Poly D N K**
> **"Every Cat Plays Fetch, Keeps Lying, Politely Dodges Nine Kittens"**
>
> | # | Letter | Topic |
> |---|--------|-------|
> | 1 | **E** | EDA (Exploratory Data Analysis) |
> | 2 | **C** | Correlation Heatmap |
> | 3 | **P** | PCA (Dimensionality Reduction) |
> | 4 | **F** | Find-S Algorithm |
> | 5 | **K** | KNN (K-Nearest Neighbors) |
> | 6 | **L** | LWR (Locally Weighted Regression) |
> | 7 | **Poly** | Polynomial vs Linear Regression |
> | 8 | **D** | Decision Tree |
> | 9 | **N** | Naive Bayes |
> | 10 | **K** | K-Means Clustering |

---

## Exp 1: EDA — Exploratory Data Analysis (Histograms, Boxplots, Outliers)

**🧠 Remember: hist() → boxplot() → IQR outlier detection → describe()**

**What it does:** Loads the California Housing dataset, draws histograms (distribution) and boxplots (spread + outliers) for every column, then counts outliers using the IQR rule.

**Key Concept — IQR Outlier Detection:**
```
Q1 = 25th percentile, Q3 = 75th percentile
IQR = Q3 - Q1
Outlier = anything < Q1-1.5*IQR  OR  > Q3+1.5*IQR
```
> Think of it like a fence: anything outside 1.5× the box width is an outlier.

**Code Breakdown:**

```python
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing

# Step 1: Load data as a pandas DataFrame
df = fetch_california_housing(as_frame=True).frame

# Step 2: Histograms — shows distribution of each column
df.hist(figsize=(15, 10), bins=30)
plt.suptitle("Distributions")
plt.show()

# Step 3: Boxplots — shows spread + outliers visually
plt.figure(figsize=(15, 10))
for i, col in enumerate(df.columns, 1):     # loop each column
    plt.subplot(3, 3, i)                      # 3×3 grid of plots
    sns.boxplot(x=df[col])                    # one boxplot per column
    plt.title(col)
plt.tight_layout()
plt.show()

# Step 4: IQR outlier count
Q1 = df.quantile(0.25)            # 25th percentile
Q3 = df.quantile(0.75)            # 75th percentile
IQR = Q3 - Q1                     # Interquartile Range
outliers = ((df < (Q1 - 1.5 * IQR)) |
            (df > (Q3 + 1.5 * IQR))).sum()   # count outliers per column

print("Outliers per column:")
print(outliers)
print("\nSummary Statistics:")
print(df.describe())              # mean, std, min, max, quartiles
```

> **🗣 Viva Tip:** "We use histograms to see data distribution, boxplots to spot outliers visually, and the IQR rule to count outliers numerically."

---

## Exp 2: Correlation Matrix & Pairplot

**🧠 Remember: heatmap(df.corr()) + pairplot(selected columns)**

**What it does:** Creates a heatmap showing how strongly every pair of features is correlated (−1 to +1), then a pairplot showing scatter plots between selected features.

**Key Concept — Correlation:**
```
+1  = perfect positive (both go up together)
 0  = no relationship
-1  = perfect negative (one goes up, other goes down)
```

**Code Breakdown:**

```python
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing

df = fetch_california_housing(as_frame=True).frame

# Step 1: Heatmap — shows correlation between ALL columns
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(),          # correlation matrix
            annot=True,          # show numbers on cells
            cmap='coolwarm',     # red=positive, blue=negative
            fmt='.2f')           # 2 decimal places
plt.title("Correlation Matrix")
plt.show()

# Step 2: Pairplot — scatter plots for selected columns
sns.pairplot(df[['MedInc', 'HouseAge', 'AveRooms', 'AveOccup', 'MedHouseVal']])
plt.show()
```

> **🗣 Viva Tip:** "The heatmap tells us which features are strongly related. MedInc (median income) has the highest correlation with house value."

---

## Exp 3: PCA — Principal Component Analysis

**🧠 Remember: StandardScaler → PCA(n_components=2) → scatter plot colored by target**

**What it does:** Reduces the 4D Iris dataset to 2D using PCA so we can visualize the 3 flower classes on a 2D scatter plot.

**Key Concept — PCA:**
```
Many features (4D) → too hard to visualize
PCA finds the 2 "best directions" that capture the most variance
Projects all data onto those 2 axes → now we can plot it!
```
> Think of PCA like taking a photo of a 3D object — you flatten it but keep the most info.

**Code Breakdown:**

```python
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

iris = load_iris()

# Step 1: Standardize (mean=0, std=1) — REQUIRED before PCA
# Step 2: Reduce 4D → 2D
pca = PCA(n_components=2)
result = pca.fit_transform(StandardScaler().fit_transform(iris.data))

# Step 3: Plot — color = flower species (0, 1, 2)
plt.figure(figsize=(8, 6))
plt.scatter(*result.T, c=iris.target, cmap='viridis')
plt.title("PCA of Iris Dataset")
plt.xlabel("PC1"), plt.ylabel("PC2")
plt.colorbar(label='Target')
plt.show()
```

> **🧠 `*result.T` trick:** `result` is shape (150,2). `.T` makes it (2,150). `*` unpacks into `x, y` for scatter.

> **🗣 Viva Tip:** "PCA is an unsupervised dimensionality reduction technique. We scale first because PCA is sensitive to feature scales."

---

## Exp 4: Find-S Algorithm

**🧠 Remember: Start with all `?` → for each positive example → match or generalize to `?`**

**What it does:** Finds the most specific hypothesis that fits ALL positive training examples. It's the simplest concept learning algorithm.

**Key Concept — Find-S:**
```
1. Initialize hypothesis = ['?', '?', '?', ...]  (most general)
2. For each POSITIVE example (Yes):
   - If hypothesis[j] is '?' → set it to the example's value
   - If it matches → keep it
   - If it differs → generalize to '?'
3. Ignore NEGATIVE examples completely
```

**Training Data (training_data.csv):**
| Outlook  | Temperature | Humidity | Windy | PlayTennis |
|----------|-------------|----------|-------|------------|
| Sunny    | Hot         | High     | FALSE | No         |
| Sunny    | Hot         | High     | TRUE  | No         |
| Overcast | Hot         | High     | FALSE | **Yes** ✓  |
| Rain     | Cold        | High     | FALSE | **Yes** ✓  |
| Rain     | Cold        | High     | TRUE  | No         |
| Overcast | Hot         | High     | TRUE  | **Yes** ✓  |

**Code Breakdown:**

```python
import pandas as pd
df = pd.read_csv('training_data.csv')
X = df.iloc[:, :-1]       # all columns except last (features)
y = df.iloc[:, -1]        # last column (Yes/No)

def find_s_algorithm(X, y):
    hypothesis = ['?' for _ in range(X.shape[1])]   # start: ['?','?','?','?']

    for i in range(len(X)):
        if y[i] == 'Yes':                            # ONLY process positive examples
            for j in range(len(X.columns)):
                if hypothesis[j] == '?' or hypothesis[j] == X.iloc[i, j]:
                    hypothesis[j] = X.iloc[i, j]     # first time or match → adopt
                else:
                    hypothesis[j] = '?'               # conflict → generalize
    return hypothesis

hypothesis = find_s_algorithm(X, y)
print("Hypothesis consistent with the positive example:", hypothesis)
```

**Trace through positive examples:**
```
Start:        ['?', '?', '?', '?']
After Row 3:  ['Overcast', 'Hot', 'High', 'FALSE']    ← first positive
After Row 4:  ['?', '?', 'High', 'FALSE']             ← Overcast≠Rain, Hot≠Cold → generalize
After Row 6:  ['?', '?', 'High', '?']                 ← FALSE≠TRUE → generalize
```

> **🗣 Viva Tip:** "Find-S finds the most specific hypothesis. It only looks at positive examples. It can't handle noise or negative examples."

---

## Exp 5: KNN — K-Nearest Neighbors

**🧠 Remember: Generate data → try different k values → plot True vs Predicted**

**What it does:** Classifies 1D random data using KNN with different values of k (1,2,3,4,5,20,30) and shows how k affects accuracy.

**Key Concept — KNN:**
```
To classify a new point:
1. Find the K nearest training points
2. Take a majority vote
3. Assign the majority class

Small k = complex boundary (overfitting)
Large k = smooth boundary (underfitting)
```
> Think: "Ask your k closest neighbors and go with the majority opinion."

**Code Breakdown:**

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier

np.random.seed(42)
X = np.random.rand(100, 1)                  # 100 random points between 0-1
y = (X.ravel() > 0.5).astype(int)           # class 0 if x≤0.5, class 1 if x>0.5

Xtr, ytr = X[:50], y[:50]                   # first 50 = train
Xte, yte = X[50:], y[50:]                   # last 50 = test

_, axes = plt.subplots(3, 3, figsize=(12, 8))
for ax, k in zip(axes.flat, [1, 2, 3, 4, 5, 20, 30]):
    model = KNeighborsClassifier(k).fit(Xtr, ytr)    # train with k neighbors
    ax.scatter(Xte, yte, c='blue', label='True')
    ax.scatter(Xte, model.predict(Xte), c='red', label='pred', marker='x')
    ax.set(title=f'k={k}')
    ax.legend()
    print(f'k{k} -> Accuracy: {model.score(Xte, yte):.2f}')

plt.tight_layout()
plt.show()
```

> **🗣 Viva Tip:** "KNN is a lazy learner — no training phase, it just memorizes data. Choosing the right k is crucial; typically use cross-validation."

---

## Exp 6: Locally Weighted Regression (LWR)

**🧠 Remember: Like linear regression but each prediction gets its own weights based on distance**

**What it does:** Predicts California house values from median income using LWR — a non-parametric method where nearby training points get higher weights.

**Key Concept — LWR:**
```
Normal Linear Regression: one line fits ALL data
LWR: for EACH test point, fit a DIFFERENT weighted line
     → nearby training points get HIGH weight
     → far training points get LOW weight
     → uses Gaussian kernel: w = exp(-dist²/2τ²)
     → τ (tau) controls how "local" the fit is
```
> Think: "Each prediction asks nearby points more and ignores far-away points."

**Code Breakdown:**

```python
import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split

# Use only MedInc (1 feature) to predict house value
X = fetch_california_housing(as_frame=True).frame[['MedInc']].values
y = fetch_california_housing(as_frame=True).frame['MedHouseVal'].values
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)

def lwr(Xtr, ytr, Xte, t=0.1):       # t = tau (bandwidth)
    Xb = np.c_[np.ones(len(Xtr)), Xtr]  # add bias column [1, x]
    return np.array([
        [1, x[0]] @ np.linalg.lstsq(     # weighted least squares for EACH test point
            Xb * np.exp(-((Xtr - x)**2).sum(1) / (2*t*t))[:, None],   # weight matrix
            ytr * np.exp(-((Xtr - x)**2).sum(1) / (2*t*t)),           # weighted y
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
```

> **🗣 Viva Tip:** "LWR is non-parametric — no fixed model. τ controls locality: small τ = very local (may overfit), large τ = almost global (like normal regression)."

---

## Exp 7: Linear vs Polynomial Regression

**🧠 Remember: LinearRegression → PolynomialFeatures(3) + LinearRegression → compare MSE**

**What it does:** Fits both a straight line (linear) and a curve (degree-3 polynomial) to predict house value from average rooms, then compares their MSE.

**Key Concept:**
```
Linear:      y = mx + b              (straight line)
Polynomial:  y = ax³ + bx² + cx + d  (curve, degree 3)

PolynomialFeatures(3) transforms: [x] → [1, x, x², x³]
Then LinearRegression fits on these expanded features
```
> Think: "Polynomial regression = linear regression on power-expanded features."

**Code Breakdown:**

```python
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.datasets import fetch_california_housing

X = fetch_california_housing(as_frame=True).data[['AveRooms']]
y = fetch_california_housing(as_frame=True).target
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)

# Model 1: Simple Linear Regression
lin = LinearRegression().fit(Xtr, ytr)

# Model 2: Polynomial (degree 3) Regression
poly = PolynomialFeatures(3)                          # creates x, x², x³
pol = LinearRegression().fit(poly.fit_transform(Xtr), ytr)  # fit on expanded features

# Plot both side by side
for i, (pred, color, title) in enumerate([
    (lin.predict(Xte), 'red', 'Linear'),
    (pol.predict(poly.transform(Xte)), 'green', 'Polynomial')], 1):
    plt.subplot(1, 2, i)
    plt.scatter(Xte, yte, c='blue', s=5)
    plt.plot(Xte, pred, c=color)
    plt.title(title)
    print(f"{title} MSE: {mean_squared_error(yte, pred):.4f}")

plt.tight_layout()
plt.show()
```

> **⚠️ Key difference:** `fit_transform` for training (learns + transforms), `transform` for testing (only transforms).

> **🗣 Viva Tip:** "Higher degree polynomials can overfit. We compare using MSE — lower is better."

---

## Exp 8: Decision Tree Classifier

**🧠 Remember: Load → split → DecisionTreeClassifier → fit → score → plot_tree**

**What it does:** Classifies breast cancer tumors as Benign or Malignant using a Decision Tree, then visualizes the tree.

**Key Concept — Decision Tree:**
```
Works like a flowchart of yes/no questions:
  "Is feature X > 0.5?"
     ├── Yes → "Is feature Y > 3.2?" → ...
     └── No  → Class: Malignant

Uses Gini impurity (default) to decide which feature to split on.
Gini = 0 means pure node (all same class).
```
> Think: "A game of 20 questions to classify data."

**Code Breakdown:**

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

X, y = load_breast_cancer(return_X_y=True)          # 30 features, binary target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = DecisionTreeClassifier()        # default: Gini impurity, no max depth
model.fit(X_train, y_train)             # build the tree
print("Accuracy:", model.score(X_test, y_test))

pred = model.predict([X_test[0]])       # predict one sample
print("Prediction:", "Benign" if pred[0] == 1 else "Malignant")

plt.figure(figsize=(10, 6))
plot_tree(model, filled=True)           # filled=True → colors nodes by class
plt.show()
```

> **🗣 Viva Tip:** "Decision Trees are interpretable but prone to overfitting. We can limit depth (`max_depth`) or use ensemble methods like Random Forest."

---

## Exp 9: Naive Bayes Classifier (Face Recognition)

**🧠 Remember: Load faces → GaussianNB → accuracy + classification_report + confusion_matrix + cross_val**

**What it does:** Recognizes faces from the Olivetti Faces dataset using Gaussian Naive Bayes, then evaluates with multiple metrics.

**Key Concept — Naive Bayes:**
```
Based on Bayes' Theorem: P(class|features) ∝ P(features|class) × P(class)

"Naive" = assumes all features are INDEPENDENT (they usually aren't, but it still works!)

GaussianNB assumes features follow a Gaussian (bell curve) distribution.
```
> Think: "Calculate the probability of each class, pick the highest one."

**Code Breakdown:**

```python
from sklearn.datasets import fetch_olivetti_faces
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import *          # imports accuracy_score, classification_report, etc.
import matplotlib.pyplot as plt

X, y = fetch_olivetti_faces(return_X_y=True)     # 400 face images, 64×64 pixels each
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=42)

clf = GaussianNB().fit(Xtr, ytr)                  # train
pred = clf.predict(Xte)                            # predict

# 4 evaluation metrics:
print("Accuracy: {:.2f}%".format(accuracy_score(yte, pred) * 100))
print("\nClassification Report:\n", classification_report(yte, pred, zero_division=1))
print("\nConfusion Matrix:\n", confusion_matrix(yte, pred))
print("\nCross-validation Accuracy: {:.2f}%".format(
    cross_val_score(clf, X, y, cv=5).mean() * 100))     # 5-fold CV

# Display 15 sample predictions
fig, ax = plt.subplots(3, 5, figsize=(10, 6))
for a, img, t, p in zip(ax.ravel(), Xte, yte, pred):
    a.imshow(img.reshape(64, 64), cmap='gray')      # reshape flat vector → image
    a.set_title(f"T:{t}\nP:{p}")                     # T=True, P=Predicted
    a.axis('off')
plt.show()
```

> **🗣 Viva Tip:** "Naive Bayes is fast, works well with high-dimensional data, and is good for text/image classification despite the 'naive' independence assumption."

---

## Exp 10: K-Means Clustering

**🧠 Remember: StandardScaler → KMeans(n_clusters=2) → fit_predict → scatter plot colored by cluster**

**What it does:** Groups breast cancer data into 2 clusters (unsupervised — no labels used for training), then visualizes them.

**Key Concept — K-Means:**
```
1. Pick K random centroids
2. Assign each point to nearest centroid → forms clusters
3. Move centroid to mean of its cluster
4. Repeat steps 2-3 until centroids stop moving

It's UNSUPERVISED — doesn't use labels!
```
> Think: "Find K groups by repeatedly adjusting cluster centers."

**Code Breakdown:**

```python
import matplotlib
matplotlib.use('TkAgg')                  # backend for display
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler

data = load_breast_cancer()
X = data.data
y = data.target                          # not used for training! (unsupervised)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)       # scale features (important for distance-based)

kmeans = KMeans(n_clusters=2, random_state=42)
y_kmeans = kmeans.fit_predict(X_scaled)  # cluster the data

plt.figure(figsize=(10, 6))
plt.scatter(X_scaled[:, 0], X_scaled[:, 1],     # plot first 2 features
            c=y_kmeans, cmap='viridis', edgecolors='k')
plt.title('K-Means Clustering (2D) on Wisconsin Breast Cancer Data')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.colorbar(label='Cluster')
plt.show()
print("Cluster centers:\n", kmeans.cluster_centers_)
```

> **🗣 Viva Tip:** "K-Means is unsupervised clustering. We must choose K beforehand (use elbow method). Scaling is critical because it uses distance."

---

## 🧠 REPEATING PATTERNS (Memorize These Once, Use Everywhere!)

| Pattern | Exp Numbers | Code |
|---------|-------------|------|
| `import matplotlib.pyplot as plt` | 1,2,3,5,6,7,8,9,10 | Used in **9 out of 10** experiments |
| `from sklearn.datasets import ...` | 1,2,3,5,6,7,8,9,10 | Only Exp 4 uses CSV |
| `train_test_split(X, y, test_size=0.2)` | 6,7,8,9 | Standard 80/20 split |
| `StandardScaler().fit_transform(X)` | 3,10 | Required before PCA and K-Means |
| `.fit(X_train, y_train)` | 5,7,8,9 | Train the model |
| `.predict(X_test)` | 5,8,9,10 | Make predictions |
| `.score(X_test, y_test)` | 5,8 | Get accuracy |
| `plt.scatter(X, y, c=..., cmap=...)` | 3,5,6,10 | Colored scatter plots |
| `plt.subplot(rows, cols, index)` | 1,5,7 | Multiple plots in grid |
| `plt.show()` | **ALL** | Always last line |

---

## 🗂 Quick Reference Table

| # | Name | Type | Dataset | Key sklearn Class | Key Output |
|---|------|------|---------|-------------------|------------|
| 1 | EDA | Visualization | California Housing | — | Histograms, Boxplots, Outlier counts |
| 2 | Correlation | Visualization | California Housing | — | Heatmap, Pairplot |
| 3 | PCA | Dim. Reduction | Iris | `PCA(n_components=2)` | 2D scatter of 3 classes |
| 4 | Find-S | Concept Learning | CSV (PlayTennis) | — (manual) | Most specific hypothesis |
| 5 | KNN | Classification | Random 1D | `KNeighborsClassifier(k)` | Accuracy for different k |
| 6 | LWR | Regression | California Housing | — (manual) | MSE, scatter plot |
| 7 | Linear vs Poly | Regression | California Housing | `LinearRegression`, `PolynomialFeatures(3)` | MSE comparison |
| 8 | Decision Tree | Classification | Breast Cancer | `DecisionTreeClassifier` | Accuracy, tree plot |
| 9 | Naive Bayes | Classification | Olivetti Faces | `GaussianNB` | Accuracy, report, confusion matrix |
| 10 | K-Means | Clustering | Breast Cancer | `KMeans(n_clusters=2)` | Cluster scatter plot |

---

## 🏷 Categorize by Type (helps remember which is which)

```
📊 VISUALIZATION (no ML model):     Exp 1 (EDA), Exp 2 (Correlation)
📉 DIMENSIONALITY REDUCTION:        Exp 3 (PCA)
📝 CONCEPT LEARNING (manual algo):  Exp 4 (Find-S)
🔮 CLASSIFICATION (supervised):     Exp 5 (KNN), Exp 8 (Decision Tree), Exp 9 (Naive Bayes)
📈 REGRESSION (predict numbers):    Exp 6 (LWR), Exp 7 (Linear vs Poly)
🔵 CLUSTERING (unsupervised):       Exp 10 (K-Means)
```

---

## 🎯 THE 5 DATASETS (You only need to know 5!)

| Dataset | Used in | Loaded via | Features | Target |
|---------|---------|------------|----------|--------|
| **California Housing** | 1, 2, 6, 7 | `fetch_california_housing(as_frame=True).frame` | 8 numeric | MedHouseVal |
| **Iris** | 3 | `load_iris()` | 4 numeric | 3 flower species |
| **PlayTennis CSV** | 4 | `pd.read_csv('training_data.csv')` | 4 categorical | Yes/No |
| **Breast Cancer** | 8, 10 | `load_breast_cancer()` | 30 numeric | Benign/Malignant |
| **Olivetti Faces** | 9 | `fetch_olivetti_faces()` | 4096 pixels (64×64) | 40 people |

---

## ⚡ SUPERVISED vs UNSUPERVISED Cheat Sheet

| | Supervised | Unsupervised |
|---|-----------|--------------|
| **Uses labels?** | ✅ Yes | ❌ No |
| **Goal** | Predict a target | Find patterns/groups |
| **Your experiments** | KNN(5), LWR(6), LinReg(7), DTree(8), NB(9) | PCA(3), K-Means(10) |
| **Evaluation** | Accuracy, MSE | Visual inspection |

> [!IMPORTANT]
> **THE 3 THINGS every ML program does:**
>
> 1. **Load data** — `from sklearn.datasets import ...` or `pd.read_csv()`
> 2. **Process/Train** — scale, split, fit
> 3. **Visualize** — `plt.show()` is ALWAYS the last line
