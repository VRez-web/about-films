import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialsToday: [],
  },
  mutations: {
    SET_TV_SHOWS_TODAY: (state, serialsToday) => {
        state.serialsToday = serialsToday;
      },
  },
  actions: {
    async GET_TV_SHOWS_TODAY({ commit }, page = this.state.page) {
      try {
        const TV_SHOWS = await axios.get(
          `/tv/airing_today?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_TV_SHOWS_TODAY", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
