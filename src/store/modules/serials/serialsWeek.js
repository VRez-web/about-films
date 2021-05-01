import { getSerialsWeek } from "@/services/serials.js";

export default {
  namespaced: true,
  state: {
    serialsWeek: {},
  },
  mutations: {
    SET_TV_SHOWS_WEEK: (state, serialsWeek) => {
      state.serialsWeek = serialsWeek;
    },
  },
  actions: {
    async GET_TV_SHOWS_WEEK({ commit }, page) {
      try {
        const TV_SHOWS = await getSerialsWeek(page);

        commit("SET_TV_SHOWS_WEEK", TV_SHOWS);

        return TV_SHOWS;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
