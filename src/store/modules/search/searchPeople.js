import { getSearchPerson } from "@/services/search";

export default {
  namespaced: true,
  state: {
    searchPerson: {},
  },
  mutations: {
    SET_SEARCH_PERSON: (state, searchPerson) => {
      state.searchPerson = searchPerson;
    },
  },
  actions: {
    async GET_SEARCH_PERSON({ commit }, { query, page }) {
      try {
        const PERSON = await getSearchPerson(query, page);

        commit("SET_SEARCH_PERSON", PERSON);

        return PERSON;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
