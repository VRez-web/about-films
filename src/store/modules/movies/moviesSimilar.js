import { getMoviesSimilar } from "@/services/movies.js";

export default {
  namespaced: true,
  state: {
    moviesSimilar: {},
  },
  mutations: {
    SET_MOVIE_SIMILAR: (state, moviesSimilar) => {
      state.moviesSimilar = moviesSimilar;
    },
  },
  actions: {
    async GET_MOVIE_SIMILAR({ commit }, id) {
      try {
        const MOVIES = await getMoviesSimilar(id);

        commit("SET_MOVIE_SIMILAR", MOVIES.data);

        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
