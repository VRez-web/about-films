import axios from "axios";
export default {
  namespaced: true,
  state: {
    moviesSimilar: [],
  },
  mutations: {
    SET_MOVIE_SIMILAR: (state, moviesSimilar) => {
      state.moviesSimilar = moviesSimilar;
    },
  },
  actions: {
    async GET_MOVIE_SIMILAR({ commit }, id) {
      try {
        const MOVIES = await axios.get(
          `/movie/${id}/similar?api_key=${this.state.apiKey}&language=ru-RU`
        );
        commit("SET_MOVIE_SIMILAR", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
