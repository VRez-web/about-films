import { getMultiSearch } from "@/services/search";

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
    async GET_SEARCH({ commit }, { query, page }) {
      try {
        const RESULT = await getMultiSearch(query, page);

        commit("SET_SEARCH", RESULT);

        return RESULT;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
