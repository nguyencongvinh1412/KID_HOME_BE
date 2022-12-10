import pandas as pd
import numpy as np
from sklearn.linear_model import Ridge
from sklearn import linear_model
from sklearn.feature_extraction.text import TfidfTransformer
import sys
import json

# read data json
historyRating = json.loads(sys.argv[1])
centres = json.loads(sys.argv[2])
serviceType = json.loads(sys.argv[3])

historyRating = np.array(historyRating)

centres = np.array(centres)


def oneHotVector(dic, vector):
    get_index_by_id = {id: i for i, id in enumerate(dic)}
    one_hot_vevtor = np.zeros((1, len(dic)), dtype=np.int8)
    for item in vector:
        indexs = get_index_by_id[item]
        one_hot_vevtor[0, indexs] = 1
    return one_hot_vevtor[0]


def EncodingData(centres):
    for centre in centres:
        styles = centre[4]
        styleOneHot = oneHotVector(serviceType, styles)
        centre[4] = int("".join(map(str, styleOneHot)))
    return centres


def calTFIDF(centres):
    centres = EncodingData(centres)
    items = centres[:, 1:].T
    items = np.array(items)

    transformer = TfidfTransformer(smooth_idf=True, norm='l2')
    tfidf = transformer.fit_transform(items).toarray().T
    return tfidf


def getCentreIndex(centres, historyRating):
    centreIds = historyRating[:, 1]

    centreIdxs = []
    for centreId in centreIds:
        centreIndex = np.where(centres[:, 0] == centreId)[0][0]
        centreIdxs.append(centreIndex)
    return centreIdxs


def getScoreTruth(historyRating):
    scores = historyRating[:, 2]
    scores = np.array(scores, dtype=np.float16)
    return scores


def preDataBeforTrain(centres):
    tfidf = calTFIDF(centres)
    d = 1
    W = np.zeros((1, tfidf.shape[1]))
    b = np.zeros((1, tfidf.shape[1]))
    return [tfidf, W, b]


def train(centres, historyRating):
    centreIdxs = getCentreIndex(centres, historyRating)
    scores = getScoreTruth(historyRating)
    tfidf, W, b = preDataBeforTrain(centres)
    Xhat = tfidf[centreIdxs, :]

    clf = Ridge(alpha=0.01, fit_intercept=True)  # SGD
    clf.fit(Xhat, scores)
    W = clf.coef_
    b = clf.intercept_

    Yhat = tfidf.dot(W) + b
    Yhat = Yhat.round(decimals=2)
    Yhat = Yhat.reshape((1, Yhat.shape[0])).T
    return [Yhat, W, b]


Yhat, W, b = train(centres, historyRating)
centreRecommend = np.concatenate((centres, Yhat), axis=1)
print(json.dumps(centreRecommend.tolist()))
