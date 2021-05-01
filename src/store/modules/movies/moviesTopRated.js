import { getMoviesTopRated } from "@/services/movies.js";
export default {
  namespaced: true,
  state: {
    moviesTopRated: {},
  },
  mutations: {
    SET_MOVIES_TOP_RATED: (state, moviesTopRated) => {
      state.moviesTopRated = moviesTopRated;
    },
  },
  actions: {
    async GET_MOVIES_TOP_RATED({ commit }, page) {
      try {
        const MOVIES = await getMoviesTopRated(page);

        commit("SET_MOVIES_TOP_RATED", MOVIES);

        return MOVIES;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
