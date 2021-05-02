import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const getMultiSearch = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/multi?api_key=${apiKey}&language=ru-RU&query=${query}&page=${page}`
  );

  return data;
};

export const getSearchMovies = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/movie?api_key=${apiKey}&language=ru-RU&query=${query}&page=${page}`
  );

  return data;
};

export const getSearchSerials = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/tv?api_key=${apiKey}&language=ru-RU&query=${query}&page=${page}`
  );

  return data;
};

export const getSearchPerson = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/person?api_key=${apiKey}&language=ru-RU&query=${query}&page=${page}`
  );

  return data;
};
