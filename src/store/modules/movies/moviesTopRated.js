import axios from "axios";
export default {
  namespaced: true,
  state: {
    moviesTopRated: [],
  },
  mutations: {
    SET_MOVIES_TOP_RATED: (state, moviesTopRated) => {
      state.moviesTopRated = moviesTopRated;
    },
  },
  actions: {
    async GET_MOVIES_TOP_RATED({ commit }, page = this.state.page) {
      try {
        const MOVIES = await axios.get(
          `/movie/top_rated?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_MOVIES_TOP_RATED", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
