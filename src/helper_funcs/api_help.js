import axios from 'axios';

export const get_year_avg = async (year) => {
    const res = await axios.get(`/${year}/avg/`)
    return res.data
}