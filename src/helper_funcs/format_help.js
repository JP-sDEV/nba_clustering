import { theme } from '../theme'
export const format_pie_data = (stat) => {
    /* 
        formats % stats to be used with nivo pie charts
        stat: {statName: statValue}
    */
    const pie_data = [{
        id: `${stat.name} Missed`,
        label: `${stat.name} Missed`,
        value: (((1 - stat.value) * 100).toFixed(2)),
        color: theme.graphs.pie.miss
    },
    {
        id: `${stat.name} Made`,
        label: `${stat.name} Made`,
        value: (stat.value * 100).toFixed(2),
        color: theme.graphs.pie.made
    }]

    return pie_data
}

export const format_bar_data = (dataset, stats) => {
    const bar_data = stats.map(stat =>
        ({
            id: stat,
            label: stat,
            value: dataset[stat],
            color: ((stat.slice(-1)) == "A" ? theme.graphs.bar.miss : theme.graphs.bar.made)
        })
    )

    return bar_data
}

export const format_comparative_bar_data = (dataset, stats) => {
    const bar_data = []
    for (var i = 0; i < stats.length; i++) {

        const team_stat = {
            id: `${stats[i]} (${dataset["Team"]}, ${dataset["Year"]})`,
            label: stats[i],
            value: dataset[stats[i]].toFixed(2),
            color: theme.graphs.bar.made
        }

        const avg_stat = {
            id: `NBA ${stats[i]} Average (${dataset["Year"]})`,
            label: `${stats[i]} avg (${dataset.avgs[stats["year"]]})`,
            value: dataset.avgs[stats[i]].toFixed(2),
            color: theme.graphs.bar.miss
        }
        bar_data.push(avg_stat)
        bar_data.push(team_stat)
    }

    return bar_data
}

export const format_playoff_prob = (probs) => {
    const prob_data = [
        {
            id: "Playoff %",
            label: "playoff",
            value: (probs.playoff_prob["playoff"] * 100).toFixed(2),
            color: theme.graphs.prob.playoff
        },
        {
            id: "Non-Playoff %",
            label: "no playoff",
            value: (probs.playoff_prob["no_playoff"] * 100).toFixed(2),
            color: theme.graphs.prob.no_playoff
        }
    ]

    return prob_data
}