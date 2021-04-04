import axios from "axios";
export default {
  namespaced: true,
  state: {
    searchMovies: [],
  },
  mutations: {
    SET_SEARCH_MOVIES: (state, searchMovies) => {
      state.searchMovies = searchMovies;
    },
  },
  actions: {
    async GET_SEARCH_MOVIES({ commit }, { query, page = this.state.page }) {
      try {
        const MOVIES = await axios.get(
          `/search/movie?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        );
        commit("SET_SEARCH_MOVIES", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
