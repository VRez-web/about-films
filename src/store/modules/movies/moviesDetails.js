import { getMoviesDetails } from "@/services/movies.js";

export default {
  namespaced: true,
  state: {
    moviesDetails: {},
  },
  mutations: {
    SET_MOVIES_DETAILS: (state, moviesDetails) => {
      state.moviesDetails = moviesDetails;
    },
  },
  actions: {
    async GET_MOVIES_DETAILS({ commit }, id) {
      try {
        const MOVIES = await getMoviesDetails(id);

        commit("SET_MOVIES_DETAILS", MOVIES.data);

        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
