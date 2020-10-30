import React, { useState, useEffect } from 'react';
import { format_bar_data, format_comparative_bar_data } from '../../helper_funcs/format_help';
import { ResponsiveBar } from 'nivo'

const BarChart = ({ data, compare = false }) => {
    const [formattedData, setFormattedData] = useState(null)
    useEffect(() => {
        if (compare === true) {
            setFormattedData(format_comparative_bar_data(data.dataset, data.stats))
        }
        else if (compare === false) {
            setFormattedData(format_bar_data(data.dataset, data.stats))
        }

    }, [data]);

    return (
        <div style={{ height: "25em" }}>
            {formattedData && <ResponsiveBar
                data={formattedData}
                colors={formattedData.map(c => c.color)}
                colorBy="index"
                margin={{ top: 30, right: 90, bottom: 40, left: 90 }}
            />}

        </div>
    )
}

export default BarChart
