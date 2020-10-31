import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from db_queries import StatQueries
from models import LogModel, RandomForestModel, SVMModel

# INIT APP
app = Flask(__name__, static_url_path='')
dirname = os.path.dirname(__file__)
cors = CORS(app)


@app.route('/')
@app.route('/<year>/<team_name>/<predict>/', methods=["GET"])
@cross_origin()
def get_team_year(team_name=None, year=None, predict=0):

    if team_name == None and year == None:

        return {"msg": "hello world"}

    else:
        db_conn = StatQueries()
        clf = LogModel()
        res = db_conn.get_team_year(team_name, year)[0]
        if request.method == "GET" and predict == "0":
            return ((res))

        elif request.method == "GET" and predict == "1":
            prediction = clf.predict(res)
            return prediction
        else:
            return {"msg": "INPUT ISSUES"}


@ app.route("/<team>/", methods=["GET"])
@cross_origin()
def get_years_of_team(team):
    db_conn = StatQueries()
    years = db_conn.get_years_of_team(team)
    return years


@ app.route("/<year>/avg/", methods=["GET"])
@cross_origin()
def get_year_avg(year):
    db_conn = StatQueries()
    avg = db_conn.get_year_stat_avgs(year)
    return avg


if __name__ == '__main__':
    app.run(host='0.0.0.0')
