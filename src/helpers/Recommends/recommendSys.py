import pandas as pd 
import numpy as np
from sklearn.linear_model import Ridge
from sklearn import linear_model
from sklearn.feature_extraction.text import TfidfTransformer
import sys, json

# ratingHistory = sys.argv[1]
# centresA = sys.argv[2]

# read data json
historyRating = json.loads(sys.argv[1])
centres = json.loads(sys.argv[2])

historyRating = np.array(historyRating)

centres = np.array(centres)

items = centres[:, 1:].T
items = np.array(items, dtype=np.int8)

transformer = TfidfTransformer(smooth_idf=True, norm='l2')
tfidf= transformer.fit_transform(items).toarray().T

d = 1
W = np.zeros((1, tfidf.shape[1]))
b = np.zeros((1, tfidf.shape[1]))

centreIds, scores = historyRating[:, 1], historyRating[:, 2]
scores = np.array(scores, dtype=np.float16)

centreIdxs = []
for centreId in centreIds:
  centreIndex = np.where(centres[:, 0] == centreId)[0][0]
  centreIdxs.append(centreIndex)

Xhat = tfidf[centreIdxs, :]
clf = Ridge(alpha=0.01, fit_intercept= True) # SGD
clf.fit(Xhat, scores)
W = clf.coef_
b = clf.intercept_

Yhat = tfidf.dot(W) + b
Yhat = Yhat.round(decimals=2)
Yhat = Yhat.reshape((1, Yhat.shape[0])).T
centreRecommend = np.concatenate((centres, Yhat), axis=1)
print(json.dumps(centreRecommend.tolist()))