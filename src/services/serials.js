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

export const getSerialDetails = async (id) => {
  const { data } = await axios.get(
    `/tv/${id}?api_key=${apiKey}&language=ru&append_to_response=content_ratings,credits,videos,external_ids`
  );
  return { data, type: "serial" };
};

export const getSerialSimilar = async (id) => {
  const { data } = await axios.get(
      `/tv/${id}/similar?api_key=${apiKey}&language=ru-RU`
  );
  return { data, type: "serial" };
};
