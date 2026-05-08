import pandas as pd
df =pd.read_csv('training_data.csv')
X=df.iloc[:, :-1]
y=df.iloc[:, -1]
def find_s_algorithm(X,y):
    hypothesis=['?' for _ in range(X.shape[1])]
    for i in range(len(X)):
        if y[i] == 'Yes':
            for j in range(len(X.columns)):
                if hypothesis[j] == '?' or hypothesis[j] == X.iloc[i,j]:
                    hypothesis[j]=X.iloc[i,j]
                else:
                    hypothesis[j]='?'
    return hypothesis
hypothesis=find_s_algorithm(X,y)
print("Hypothesis consistent with the positive example:",hypothesis)