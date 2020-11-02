import axios from 'axios';

export const get_year_avg = async (year) => {
    const baseURL = "https://nba-clustering.herokuapp.com"
    const res = await axios.get(`${baseURL}/${year}/avg/`)
    return res.data
}