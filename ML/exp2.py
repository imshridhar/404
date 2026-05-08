import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
df=fetch_california_housing(as_frame=True).frame
fig ,axes=plt.subplots(2,1,figsize=(12,12))
sns.heatmap(df.corr(),annot=True,fmt='.2f',cmap="coolwarm",cbar=True,ax=axes[0])
axes[0].set_title("correlation Matrix Heatmap")
sns.pairplot(df[['MedInc','HouseAge','AveRooms','AveOccup','MedHouseVal']],diag_kind="kde")
plt.subplots_adjust(hspace=0.4)
plt.show()