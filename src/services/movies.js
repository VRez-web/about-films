import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const getMoviesTopRated = async (page = 1) => {
  const { data } = await axios.get(
    `/movie/top_rated?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "movie" };
};

export const getMoviesUpcoming = async (page = 1) => {
  const { data } = await axios.get(
    `/movie/upcoming?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "movie" };
};

export const getMoviesPopular = async (page = 1) => {
  const { data } = await axios.get(
    `/movie/popular?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "movie" };
};

export const getMoviesTheatres = async (page = 1) => {
  const { data } = await axios.get(
    `/movie/now_playing?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "movie" };
};
