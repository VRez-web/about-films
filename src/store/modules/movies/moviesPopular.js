import axios from "axios";
export default {
  namespaced: true,
  state: {
    moviesPopular: [],
  },
  mutations: {
    SET_MOVIES_POPULAR: (state, moviesPopular) => {
      state.moviesPopular = moviesPopular;
    },
  },
  actions: {
    async GET_MOVIES_POPULAR({ commit }, page = this.state.page) {
      try {
        const MOVIES = await axios.get(
          `/movie/popular?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_MOVIES_POPULAR", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
