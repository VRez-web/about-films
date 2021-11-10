import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const genresMovie = async () => {
    const {data} = await axios.get(`/genre/movie/list?api_key=${apiKey}&language=ru-RU`)
    return data
}

export const genresTv = async () => {
    const {data} = await axios.get(`/genre/tv/list?api_key=${apiKey}&language=ru-RU`)
    return data
}