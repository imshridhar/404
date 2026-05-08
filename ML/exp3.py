import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
iris = load_iris()
pca = PCA(n_components=2)
result = pca.fit_transform(StandardScaler().fit_transform(iris.data))
plt.figure(figsize=(8,6))
plt.scatter(*result.T, c=iris.target, cmap='viridis')
plt.title("PCA of Iris Dataset")
plt.xlabel("PC1"), plt.ylabel("PC2")
plt.colorbar(label='Target')
plt.show()