import pandas as pd
import os
import sqlite3
import helper_functions


dirname = os.path.dirname(__file__)
db_dir = os.path.join(dirname, "../stats.db")


class StatQueries():

    def __init__(self):
        self.conn = sqlite3.connect(db_dir)
        self.db_path = db_dir

    def jsonify_res(self, q):
        colname = [d[0] for d in q.description]
        result_list = [dict(zip(colname, r)) for r in q.fetchall()]
        return result_list

    def get_team_year(self, team_name, year):
        cur = self.conn.cursor()
        sql_query = ("SELECT * FROM STATS WHERE (Team = ? AND Year = ?)")

        query_res = cur.execute(sql_query, (team_name, year))

        json_res = self.jsonify_res(query_res)
        return json_res
        cur.close()

    def get_names(self):
        cur = self.conn.cursor()
        query = ("SELECT * FROM STATS")
        cur.execute(query)

        names = [desc[0] for desc in cur.description]
        return names
        cur.close()

    def get_unique_years(self):
        """
            get all the unique values from the 'Year' column
            i.e) get all the years as a list
        """
        cur = self.conn.cursor()
        query = ("SELECT DISTINCT Team FROM STATS")
        cur.execute(query)

        return_list = list(i[0] for i in (cur.fetchall()))

        return ({"years": return_list})
        cur.close()

    def get_years_of_team(self, team):
        """
            get all the teams from year X
        """
        cur = self.conn.cursor()
        # sql_query = ("SELECT Team FROM STATS WHERE (Year = ?)")
        sql_query = ("SELECT Year FROM STATS WHERE (Team = ?)")
        query_res = cur.execute(sql_query, (team,))
        return_list = list(i[0] for i in (cur.fetchall()))

        return({"years": return_list})
        cur.close()

    def get_single_team(self, team_name, year):
        q = "SELECT * FROM STATS WHERE Team='{}' and Year={}".format(
            team_name, year)

        main_df = pd.read_sql_query(
            q, self.conn).to_dict()

        team_stats = {}
        for attr, val in main_df.items():
            team_stats[attr] = val[0]

        return team_stats.keys()

    def get_year_stat_avgs(self, year, stats=["FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA", "2P%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL", "BLK", "TOV", "PF", "PTS", "PPM", "POSS", "DRBP", "DE", "OE", "ED", "TR", "EFG%", "FTR"]):
        s = format(", ".join(stats))
        q = "SELECT * FROM STATS WHERE Year={}".format(
            year)

        main_df = pd.read_sql_query(
            q, self.conn)[stats]

        out_obj = {}
        for s in stats:
            out_obj[s] = main_df[s].mean()

        return out_obj

    def test1(self):
        """
            get all the teams from year X
        """
        cur = self.conn.cursor()
        # sql_query = ("SELECT Team FROM STATS WHERE (Year = ?)")
        sql_query = ("SELECT DISTINCT(Team) FROM STATS")
        query_res = cur.execute(sql_query)
        return_list = list(i[0] for i in (cur.fetchall()))

        return({"years": return_list})
        cur.close()


# test = StatQueries()
# # out = test.test1()
# out = test.test1()
# print(len(out['years']))
