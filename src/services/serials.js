import axios from "@/plugins/axios";

const apiKey = process.env.VUE_APP_API_KEY;

export const getSerialsTopRated = async (page = 1) => {
  const { data } = await axios.get(
    `/tv/top_rated?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "serial" };
};

export const getSerialsPopular = async (page = 1) => {
  const { data } = await axios.get(
    `/tv/popular?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "serial" };
};

export const getSerialsWeek = async (page = 1) => {
  const { data } = await axios.get(
    `/tv/on_the_air?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "serial" };
};

export const getSerialToday = async (page = 1) => {
  const { data } = await axios.get(
    `/tv/airing_today?api_key=${apiKey}&language=ru-RU&page=${page}`
  );
  return { data, type: "serial" };
};
