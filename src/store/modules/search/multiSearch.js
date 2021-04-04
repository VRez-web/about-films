import axios from "axios";
export default {
  namespaced: true,
  state: {
    searchQuery: "",
  },
  mutations: {
    SET_SEARCH: (state, searchQuery) => {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async GET_SEARCH({ commit }, { query, page = this.state.page }) {
      try {
        const RESULT = await axios.get(
          `/search/multi?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        );
        commit("SET_SEARCH", RESULT.data);
        return RESULT.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
