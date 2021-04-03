import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialsWeek: [],
  },
  mutations: {
    SET_TV_SHOWS_WEEK: (state, serialsWeek) => {
      state.serialsWeek = serialsWeek;
    },
  },
  actions: {
    async GET_TV_SHOWS_WEEK({ commit }, page = this.state.page) {
      try {
        const TV_SHOWS = await axios.get(
          `/tv/on_the_air?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_TV_SHOWS_WEEK", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
