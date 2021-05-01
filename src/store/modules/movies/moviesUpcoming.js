import { getMoviesUpcoming } from "@/services/movies.js";

export default {
  namespaced: true,
  state: {
    moviesUpcoming: {},
  },
  mutations: {
    SET_MOVIES_UPCOMING: (state, moviesUpcoming) => {
      state.moviesUpcoming = moviesUpcoming;
    },
  },
  actions: {
    async GET_MOVIES_UPCOMING({ commit }, page) {
      try {
        const MOVIES = await getMoviesUpcoming(page);

        commit("SET_MOVIES_UPCOMING", MOVIES);

        return MOVIES;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
