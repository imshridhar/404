from sklearn.datasets import fetch_olivetti_faces
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import *
import matplotlib.pyplot as plt
X, y = fetch_olivetti_faces(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=42)
clf = GaussianNB().fit(Xtr, ytr)
pred = clf.predict(Xte)
print("Accuracy: {:.2f}%".format(accuracy_score(yte, pred) * 100))
print("\nClassification Report:\n", classification_report(yte, pred, zero_division=1))
print("\nConfusion Matrix:\n", confusion_matrix(yte, pred))
print("\nCross-validation Accuracy: {:.2f}%".format(
    cross_val_score(clf, X, y, cv=5).mean() * 100))
fig, ax = plt.subplots(3, 5, figsize=(10, 6))
for a, img, t, p in zip(ax.ravel(), Xte, yte, pred):
    a.imshow(img.reshape(64, 64), cmap='gray')
    a.set_title(f"T:{t}\nP:{p}")
    a.axis('off')
plt.show()