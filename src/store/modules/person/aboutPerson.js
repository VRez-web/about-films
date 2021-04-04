import axios from "axios";
export default {
  namespaced: true,
  state: {
    aboutPerson: [],
  },
  mutations: {
    SET_ABOUT_PERSON: (state, aboutPerson) => {
      state.aboutPerson = aboutPerson;
    },
  },
  actions: {
    async GET_ABOUT_PERSON({ commit }, id) {
      try {
        const PERSON = await axios.get(
          `/person/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=movie_credits,tv_credits,external_ids`
        );
        commit("SET_ABOUT_PERSON", PERSON.data);
        return PERSON.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
