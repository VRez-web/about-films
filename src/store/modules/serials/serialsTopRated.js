import { getSerialsTopRated } from "@/services/serials.js";

export default {
  namespaced: true,
  state: {
    serialsTopRated: {},
  },
  mutations: {
    SET_TV_SHOWS_TOP_RATED: (state, serialsTopRated) => {
      state.serialsTopRated = serialsTopRated;
    },
  },
  actions: {
    async GET_TV_SHOWS_TOP_RATED({ commit }, page) {
      try {
        const TV_SHOWS = await getSerialsTopRated(page);

        commit("SET_TV_SHOWS_TOP_RATED", TV_SHOWS);

        return TV_SHOWS;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
