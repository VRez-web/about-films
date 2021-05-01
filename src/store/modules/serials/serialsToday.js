import { getSerialToday } from "@/services/serials.js";

export default {
  namespaced: true,
  state: {
    serialsToday: [],
  },
  mutations: {
    SET_TV_SHOWS_TODAY: (state, serialsToday) => {
      state.serialsToday = serialsToday;
    },
  },
  actions: {
    async GET_TV_SHOWS_TODAY({ commit }, page) {
      try {
        const TV_SHOWS = await getSerialToday(page);

        commit("SET_TV_SHOWS_TODAY", TV_SHOWS);

        return TV_SHOWS;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
