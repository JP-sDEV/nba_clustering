import os
import joblib
import numpy as np
from db_queries import StatQueries
from helper_functions import format_query, format_prediction


dirname = os.path.dirname(__file__)
db_conn = StatQueries()


class LogModel():
    def __init__(self):
        self.prediction = None,
        self.clf_path = os.path.join(dirname, 'trained_models/0.pkl')
        self.clf = joblib.load(self.clf_path)

    def predict(self, q):
        format_q = format_query(q)
        clf_prob = self.clf.predict_proba(format_q)

        return (format_prediction(clf_prob))


class RandomForestModel():
    def __init__(self):
        self.prediction = None,
        self.clf_path = os.path.join(dirname, 'trained_models/1.pkl')
        self.clf = joblib.load(self.clf_path)

    def predict(self, team_name, year):
        q = db_conn.get_team_year("{}".format(team_name), year)[0]
        format_q = format_query(q)
        clf_prob = self.clf.predict_proba(format_q)

        return (format_prediction(clf_prob))


class SVMModel():
    def __init__(self):
        self.prediction = None,
        self.clf_path = os.path.join(dirname, 'trained_models/2.pkl')
        self.clf = joblib.load(self.clf_path)

    def predict(self, team_name, year):
        q = db_conn.get_team_year("{}".format(team_name), year)[0]
        format_q = format_query(q)
        clf_prob = self.clf.predict_proba(format_q)

        return (format_prediction(clf_prob))
