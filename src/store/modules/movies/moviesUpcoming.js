import axios from "axios";
export default {
  namespaced: true,
  state: {
    moviesUpcoming: [],
  },
  mutations: {
    SET_MOVIES_UPCOMING: (state, moviesUpcoming) => {
      state.moviesUpcoming = moviesUpcoming;
    },
  },
  actions: {
    async GET_MOVIES_UPCOMING({ commit }, page = this.state.page) {
      try {
        const MOVIES = await axios.get(
          `/movie/upcoming?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_MOVIES_UPCOMING", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
