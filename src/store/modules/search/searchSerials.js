import { getSearchSerials } from "@/services/search";

export default {
  namespaced: true,
  state: {
    searchSerials: {},
  },
  mutations: {
    SET_SEARCH_SERIALS: (state, searchSerials) => {
      state.searchSerials = searchSerials;
    },
  },
  actions: {
    async GET_SEARCH_SERIALS({ commit }, { query, page }) {
      try {
        const TV_SHOWS = await getSearchSerials(query, page);

        commit("SET_SEARCH_SERIALS", TV_SHOWS);

        return TV_SHOWS;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
