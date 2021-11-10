import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const trendsDay = async () => {
    const {data} = await axios.get(`/trending/all/day?api_key=${apiKey}&language=ru-RU`);
    return data
}