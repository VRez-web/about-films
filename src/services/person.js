import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const getDataPerson = async (id) => {
    const {data} = await axios.get(
        `/person/${id}?api_key=${apiKey}&language=ru-RU&append_to_response=movie_credits,tv_credits,external_ids`
    );
    return data
};

export const getPersonsPopular = async (page = 1) => {
    const {data} = await axios.get(
      `/person/popular?api_key=${apiKey}&language=ru-RU&page=${page}`
    );
    return data
};
