import { createStore } from "vuex";
import axios from "../plugins/axios";
const store = createStore({
  state() {
    return {
      count: 0,
      apiKey: "f74144cebf6695340f4726c27579484e",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      tvShowsTopRated: [],
    };
  },
  mutations: {
    SET_TV_SHOWS_TOP_RATED_TO_STATE: (state, tvShowsTopRated) => {
      state.tvShowsTopRated = tvShowsTopRated;
    },
  },
  actions: {
    GET_tV_SHOWS_TOP_RATED({ commit }) {
      return axios
        .get(`/tv/top_rated?api_key=${this.state.apiKey}&language=ru-RU`)
        .then((res) => {
          commit("SET_TV_SHOWS_TOP_RATED_TO_STATE", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e
        });
    },
  },
  modules: {},
  getters: {
    API_KEY: (state) => {
      return state.apiKey;
    },
    IMG_URL: (state) => {
      return state.imgUrl;
    },
    TV_SHOWS_TOP_RATED:(state)=>{
      return state.tvShowsTopRated
    }
  },
});

export default store;
