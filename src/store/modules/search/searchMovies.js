import { getSearchMovies } from "@/services/search";

export default {
  namespaced: true,
  state: {
    searchMovies: {},
  },
  mutations: {
    SET_SEARCH_MOVIES: (state, searchMovies) => {
      state.searchMovies = searchMovies;
    },
  },
  actions: {
    async GET_SEARCH_MOVIES({ commit }, { query, page }) {
      try {
        const MOVIES = await getSearchMovies(query, page);

        commit("SET_SEARCH_MOVIES", MOVIES);

        return MOVIES;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
