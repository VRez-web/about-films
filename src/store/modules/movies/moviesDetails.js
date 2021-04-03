import axios from "axios";
export default {
  namespaced: true,
  state: {
    moviesDetails: [],
  },
  mutations: {
    SET_MOVIES_DETAILS: (state, moviesDetails) => {
      state.moviesDetails = moviesDetails;
    },
  },
  actions: {
    async GET_MOVIES_DETAILS({ commit }, id) {
      try {
        const MOVIES = await axios.get(
          `/movie/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=credits,release_dates,videos,external_ids`
        );
        commit("SET_MOVIES_DETAILS", MOVIES.data);
        return MOVIES.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
