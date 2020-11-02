import React, { useState, useEffect } from 'react';
import './App.css';
import { Grid, Paper } from '@material-ui/core';
import Form from './components/Form'
import Header from './components/Header'
import PieChart from './components/charts/PieChart'
import BarChart from './components/charts/BarChart'
import { theme } from "./theme";
import axios from 'axios';
function App() {

  // changing html settings
  useEffect(() => {
    document.body.style.backgroundColor = theme.bodyColor
    document.body.style.fontFamily = "Arial";
  }, [])

  // STATES
  const [EDA, setEDA] = useState({
    isVisible: false,
    data: null
  });

  const baseURL = "https://nba-clustering.herokuapp.com"

  // METHODS
  const getTeamStats = async (year, team) => {
    const req = await axios.get(`${baseURL}/${year}/${team}/0/`)
    const req_avg = await axios.get(`${baseURL}/${year}/avg/`)
    const playoff_req = await axios.get(`${baseURL}/${year}/${team}/1/`)
    const data = await req.data
    data["avgs"] = req_avg.data
    data["playoff_prob"] = playoff_req.data
    setEDA({ ...EDA, data: data, isVisible: true })
  }
  const grid = {
    container: 6,
    item: 3
  }



  return (
    <div style={{
      "background-color": theme.bodyColor
    }}>
      <div>
        <Header />
      </div>

      {/* GRID START */}
      <Grid container spacing={grid.container} justify="center" align="center" display="flex" style={{ padding: "2em 3em" }}>
        {/* form */}
        <Grid item xs={8} style={{ "padding": "1rem" }}>
          <Form getTeamStats={getTeamStats} />
        </Grid>

        {/* EDA START */}
        {EDA.isVisible &&
          // playoff prob
          <div>
            <h1>Playoff Probability for: {EDA.data.Year}, {EDA.data.Team}</h1>
            < Grid container spacing={grid.container} alignItems="center" justify="center">
              <Grid item xs={grid.item}>
                <PieChart data={EDA.data} playoff={true} />
              </Grid>
            </Grid>

            {/* stats */}
            <Grid container spacing={grid.container} alignItems="center" justify="center">
              <Grid item xs={grid.item}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <h1>Field Goals</h1>
                    <PieChart data={{ name: "FG%", value: EDA.data["FG%"] }} />
                  </Grid>

                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["FGA", "FG"] }} />
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={grid.item}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <h1>2-Pointers</h1>
                    <PieChart data={{ name: "2P%", value: EDA.data["2P%"] }} />
                  </Grid>
                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["2PA", "2P"] }} />
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={grid.item}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <h1>Free Throws</h1>
                    <PieChart data={{ name: "FT%", value: EDA.data["FT%"] }} />
                  </Grid>
                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["FTA", "FT"] }} />
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={grid.item}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <h1>3-Pointers</h1>
                    <PieChart data={{ name: "3P%", value: EDA.data["3P%"] }} />
                  </Grid>
                  <Grid justify="center">
                    <BarChart data={{ dataset: EDA.data, stats: ["3PA", "3P"] }} />
                  </Grid>
                </Paper>
              </Grid>

              {/* bar graphs */}
              <Grid container justify="center">
                <h1>{EDA.data.Year} {EDA.data.Team} vs. {EDA.data.Year} NBA Averages</h1>
              </Grid>
              <Grid item xs={grid.container}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["PTS"] }} compare={true} />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={grid.container}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["TRB"] }} compare={true} />
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={grid.container}>
                <Paper style={{ height: "100%", backgroundColor: theme.paper.backgroundColor }} elevation="5" variant="outlined">
                  <Grid item>
                    <BarChart data={{ dataset: EDA.data, stats: ["STL", "BLK"] }} compare={true} />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
          // EDA.isVisible
        }
      </Grid>
    </div >
  );
}

export default App;
