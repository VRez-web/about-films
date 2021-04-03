import axios from "axios";
export default {
  namespaced: true,
  state: {
    serialDetails: [],
  },
  mutations: {
    SET_SERIAL_DETAILS: (state, serialDetails) => {
      state.serialDetails = serialDetails;
    },
  },
  actions: {
    async GET_SERIAL_DETAILS({ commit }, id) {
      try {
        const TV_SHOWS = await axios.get(
            `/tv/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=content_ratings,credits,videos,external_ids`
        );
        commit("SET_SERIAL_DETAILS", TV_SHOWS.data);
        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
