import axios from "../../../plugins/axios";
export default {
  namespaced: true,
  state: {
    moviesTheatres: [],
  },
  mutations: {
    SET_MOVIES_THEATRES: (state, moviesTheatres) => {
      state.moviesTheatres = moviesTheatres;
    },
  },
  actions: {
    async GET_MOVIES_THEATRES({ commit }, page = this.state.page) {
      try {
        const MOVIES = await axios.get(
          `/movie/now_playing?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        );
        commit("SET_MOVIES_THEATRES", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
