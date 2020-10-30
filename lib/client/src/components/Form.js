import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { teams } from '../static_data/teams';
import axios from 'axios';

function Form({ getTeamStats }) {
    const [teamYear, setTeamYear] = useState({
        team: null,
        year: null,
        teamSelected: false
    })
    const [years, setYears] = useState([])

    useEffect(() => {
        axios.get(`/${teamYear.team}/`).then((res) => [...years, setYears(res.data.years)])
        setTeamYear({ ...teamYear, year: null })
    }, [teamYear.team])

    const ListTeams = teams["teams"].map((t) => <MenuItem value={t} key={t}>{t}</MenuItem>)
    const ListYears = years.map((t) => <MenuItem value={t} key={t}>{t}</MenuItem>)
    return (
        <div style={{ "border-bottom": "1px solid black", "padding-bottom": "2em" }}>
            <h1>Choose your Team</h1>
            <InputLabel id="label"><p>Team</p></InputLabel>
            <Select labelId="label" id="select" onChange={(e) => setTeamYear({ ...teamYear, team: e.target.value, teamSelected: true })}>
                {ListTeams}
            </Select>
            {teamYear.teamSelected &&
                <div>
                    <InputLabel id="label"><p>Year</p></InputLabel>
                    <Select labelId="label" id="select" onChange={(e) => setTeamYear({ ...teamYear, year: e.target.value })}>
                        {ListYears}
                    </Select>
                </div>}
            {teamYear.year && <Button onClick={() => getTeamStats(teamYear.year, teamYear.team)}>SUBMIT</Button>}
        </div>
    );
}

export default Form