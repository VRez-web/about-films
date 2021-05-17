import { getSerialDetails } from "@/services/serials.js";

export default {
  namespaced: true,
  state: {
    serialDetails: {},
  },
  mutations: {
    SET_SERIAL_DETAILS: (state, serialDetails) => {
      state.serialDetails = serialDetails;
    },
  },
  actions: {
    async GET_SERIAL_DETAILS({ commit }, id) {
      try {
        const TV_SHOWS = await getSerialDetails(id);

        commit("SET_SERIAL_DETAILS", TV_SHOWS.data);

        return TV_SHOWS.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
