import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const getTrends = async (time = 'day') => {
    const {data} = await axios.get(`/trending/all/${time}?api_key=${apiKey}&language=ru-RU`);
    return data
}
