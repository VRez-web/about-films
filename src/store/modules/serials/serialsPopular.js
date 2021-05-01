import { getSerialsPopular } from "@/services/serials.js";

export default {
  namespaced: true,
  state: {
    serialsPopular: {},
  },
  mutations: {
    SET_TV_SHOWS_POPULAR: (state, serialsPopular) => {
      state.serialsPopular = serialsPopular;
    },
  },
  actions: {
    async GET_TV_SHOWS_POPULAR({ commit }, page) {
      try {
        const TV_SHOWS = await getSerialsPopular(page);

        commit("SET_TV_SHOWS_POPULAR", TV_SHOWS);

        return TV_SHOWS;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
