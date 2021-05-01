import { getMoviesPopular } from "@/services/movies.js";

export default {
  namespaced: true,
  state: {
    moviesPopular: {},
  },
  mutations: {
    SET_MOVIES_POPULAR: (state, moviesPopular) => {
      state.moviesPopular = moviesPopular;
    },
  },
  actions: {
    async GET_MOVIES_POPULAR({ commit }, page) {
      try {
        const MOVIES = await getMoviesPopular(page);

        commit("SET_MOVIES_POPULAR", MOVIES);

        return MOVIES;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
