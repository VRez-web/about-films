import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialsTopRated: [],
  },
  mutations: {
    SET_TV_SHOWS_TOP_RATED: (state, serialsTopRated) => {
      state.serialsTopRated = serialsTopRated;
    },
  },
  actions: {
    async GET_TV_SHOWS_TOP_RATED({ commit }, page = this.state.page) {
      try {
        const TV_SHOWS = await axios.get(
          `/tv/top_rated?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_TV_SHOWS_TOP_RATED", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e)
        return e
      }
    },
  },
};
