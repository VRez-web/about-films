import axios from "axios";
export default {
  namespaced: true,
  state: {
    searchSerials: [],
  },
  mutations: {
    SET_SEARCH_SERIALS: (state, searchSerials) => {
      state.searchSerials = searchSerials;
    },
  },
  actions: {
    async GET_SEARCH_SERIALS({ commit }, { query, page = this.state.page }) {
      try {
        const TV_SHOWS = await axios.get(
          `/search/tv?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        );
        commit("SET_SEARCH_SERIALS", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
