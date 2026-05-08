import numpy as np 
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
np.random.seed(42)
X=np.random.rand(100,1)
y=(X.ravel()>0.5).astype(int)
Xtr ,ytr =X[:50] , y[:50]
Xte ,yte =X[50:] , y[50:]
_, axes =plt.subplots(3,3,figsize=(12,8))
for ax ,k in zip(axes.flat,[1,2,3,4,5,20,30]):
    model=KNeighborsClassifier(k).fit(Xtr,ytr)
    ax.scatter(Xte , yte , c='blue' , label='True')
    ax.scatter(Xte,model.predict(Xte), c='red' , label='pred' , marker='x')
    ax.set(title=f'k={k}')
    ax.legend()
    print(f'k{k} -> Accuracy : {model.score(Xte ,yte):.2f}')
plt.tight_layout()
plt.show()