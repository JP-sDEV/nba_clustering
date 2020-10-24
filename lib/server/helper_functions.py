import numpy as np


def add_adv_stats(df):
    df["PPM"] = df["PTS"]/df["MP"]  # Points per Minute
    df["POSS"] = 0.96*((df["FGA"]+df["TOV"]) +
                       (0.44*df["FTA"]-df["ORB"]))  # Possession
    # Defensive Rebounding Percentage
    df["DRBP"] = df["DRB"]/(df["DRB"] + df.mean()["ORB"])
    df["DE"] = 100*(df.mean()["PTS"]/df["POSS"])  # Defensive Efficiency
    df["OE"] = 100*(df["PTS"]/df["POSS"])  # Offensive Efficiency
    df["ED"] = df["OE"] - df["DE"]  # Efficiency Differential
    df["TR"] = (df["TOV"] * 100) / (df["FGA"] + (df["FTA"]*44) +
                                    df["AST"] + df["TOV"])  # Turnover Ratio
    df["EFG%"] = df["FG"] + (0.5*df["3P"]/df["FGA"])  # effective field goal %
    # Free Throw Rate - how often team shoots FT
    df["FTR"] = df["FTA"]/df["FGA"]
    return df


def format_query(q):
    for var in ["Year", "Team", "G", "Rk", "Playoff"]:
        del(q[var])
    return (np.array(list(q.values())).reshape(-1, 31))


def format_prediction(clf_prob):
    return (dict(zip(["no_playoff", "playoff"], clf_prob[0])))
