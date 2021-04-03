import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialsPopular: [],
  },
  mutations: {
    SET_TV_SHOWS_POPULAR: (state, serialsPopular) => {
        state.serialsPopular = serialsPopular;
      },
  },
  actions: {
    async GET_TV_SHOWS_POPULAR({ commit }, page = this.state.page) {
      try {
        const TV_SHOWS = await axios.get(
          `/tv/popular?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_TV_SHOWS_POPULAR", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e)
        return e
      }
    },
  },
};
