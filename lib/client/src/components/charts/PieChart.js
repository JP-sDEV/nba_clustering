import React, { useState, useEffect } from 'react';
import { format_pie_data, format_playoff_prob } from '../../helper_funcs/format_help';
import { ResponsivePie } from 'nivo'

function PieChart({ data, playoff = false }) {
    const [formattedData, setFormattedData] = useState(null)
    useEffect(() => {
        if (playoff === false) {
            setFormattedData(format_pie_data(data))
        }
        else if (playoff === true) {
            setFormattedData(format_playoff_prob(data))
        }
    }, [data]);

    return (

        <div style={{ height: "25em" }}>
            <ResponsivePie
                data={formattedData}
                innerRadius={0.35}
                padAngle={1}
                cornerRadius={5}
                borderWidth={1}
                colorBy={formattedData => formattedData.color}
                enableRadialLabels={false}
                sliceLabel={function (e) { return e.id + " (" + e.value + ")" }}
                margin={{ top: 15, right: 10, bottom: 15, left: 10 }}
            />
        </div>


    )
}

export default PieChart