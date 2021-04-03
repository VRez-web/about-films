import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialsSimilar: [],
  },
  mutations: {
    SET_SERIAL_SIMILAR: (state, serialsSimilar) => {
      state.serialsSimilar = serialsSimilar;
    },
  },
  actions: {
    async GET_SERIAL_SIMILAR({ commit }, id) {
      try {
        const TV_SHOWS = await axios.get(
          `/tv/${id}/similar?api_key=${this.state.apiKey}&language=ru-RU`
        );
        commit("SET_SERIAL_SIMILAR", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
