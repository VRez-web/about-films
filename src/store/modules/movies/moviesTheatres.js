import { getMoviesTheatres } from "@/services/movies.js";

export default {
  namespaced: true,
  state: {
    moviesTheatres: {},
  },
  mutations: {
    SET_MOVIES_THEATRES: (state, moviesTheatres) => {
      state.moviesTheatres = moviesTheatres;
    },
  },
  actions: {
    async GET_MOVIES_THEATRES({ commit }, page) {
      try {
        const MOVIES = await getMoviesTheatres(page);

        commit("SET_MOVIES_THEATRES", MOVIES);

        return MOVIES;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
