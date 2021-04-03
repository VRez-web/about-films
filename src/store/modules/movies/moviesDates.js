import axios from "axios";
export default {
  namespaced: true,
  state: {
    movieDates: [],
  },
  mutations: {
    SET_MOVIE_DATES: (state, movieDates) => {
      state.movieDates = movieDates;
    },
  },
  actions: {
    async GET_MOVIE_DATES({ commit }, id) {
      try {
        const MOVIES = await axios.get(
          `/movie/${id}/release_dates?api_key=${this.state.apiKey}&language=ru-RU`
        );
        commit("SET_MOVIE_DATES", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
