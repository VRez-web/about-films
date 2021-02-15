import { createStore } from "vuex";
// import tvShowsTopRated from './modules/tvShowsTopRated'
import axios from "../plugins/axios";
const store = createStore({
  // modules:{
  //   tvShowsTopRated
  // },
  state() {
    return {
      apiKey: "f74144cebf6695340f4726c27579484e",
      imgUrl: "https://image.tmdb.org/t/p/w500",
      tvShowsTopRated: [],
      tvShowsWeek: [],
      tvShowsToday:[],
      tvShowsPopular:[],
      moviesTheatres:[],
      moviesPopular:[],
      moviesTopRated:[],
      page: 1,
    };
  },
  mutations: {
    // Tv Shows
    SET_TV_SHOWS_TOP_RATED: (state, tvShowsTopRated) => {
      state.tvShowsTopRated = tvShowsTopRated;
    },
    SET_TV_SHOWS_WEEK: (state, tvShowsWeek) => {
      state.tvShowsWeek = tvShowsWeek;
    },
    SET_TV_SHOWS_TODAY: (state, tvShowsToday) => {
      state.tvShowsToday = tvShowsToday;
    },
    SET_TV_SHOWS_POPULAR: (state, tvShowsPopular) => {
      state.tvShowsPopular = tvShowsPopular;
    },

    // Movies
    SET_MOVIES_THEATRES: (state, moviesTheatres) => {
      state.moviesTheatres = moviesTheatres;
    },
    SET_MOVIES_POPULAR: (state, moviesPopular) => {
      state.moviesPopular = moviesPopular;
    },
    SET_MOVIES_TOP_RATED: (state, moviesTopRated) => {
      state.moviesTopRated = moviesTopRated;
    },
  },
  actions: {
    // Tv Shows
    GET_TV_SHOWS_TOP_RATED({ commit }, page = this.state.page) {
      return axios
        .get(
          `/tv/top_rated?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_TV_SHOWS_TOP_RATED", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    GET_TV_SHOWS_WEEK({ commit }, page = this.state.page) {
      return axios
        .get(
          `/tv/on_the_air?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_TV_SHOWS_WEEK", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    GET_TV_SHOWS_TODAY({ commit }, page = this.state.page) {
      return axios
        .get(
          `/tv/airing_today?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_TV_SHOWS_TODAY", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    GET_TV_SHOWS_POPULAR({ commit }, page = this.state.page) {
      return axios
        .get(
          `/tv/airing_today?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_TV_SHOWS_POPULAR", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },

    // Movies
    GET_MOVIES_THEATRES({ commit }, page = this.state.page) {
      return axios
        .get(
          `/movie/now_playing?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_MOVIES_THEATRES", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    GET_MOVIES_POPULAR({ commit }, page = this.state.page) {
      return axios
        .get(
          `/movie/popular?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_MOVIES_POPULAR", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    GET_MOVIES_TOP_RATED({ commit }, page = this.state.page) {
      return axios
        .get(
          `/movie/top_rated?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_MOVIES_TOP_RATED", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
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
  },
});

export default store;
