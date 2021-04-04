import axios from "axios";
export default {
  namespaced: true,
  state: {
    searchPerson: [],
  },
  mutations: {
    SET_SEARCH_PERSON: (state, searchPerson) => {
      state.searchPerson = searchPerson;
    },
  },
  actions: {
    async GET_SEARCH_PERSON({ commit }, { query, page = this.state.page }) {
      try {
        const PERSON = await axios.get(
          `/search/person?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        );
        commit("SET_SEARCH_PERSON", PERSON.data);
        return PERSON.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
