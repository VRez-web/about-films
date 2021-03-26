import { createStore } from "vuex";
// import tvShowsTopRated from './modules/tvShowsTopRated'
import axios from "../plugins/axios";
const store = createStore({
  // modules:{
  //   tvShowsTopRated
  // },
  state() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      imgUrl: "https://image.tmdb.org/t/p/w342",
      imgProfileSize: "http://image.tmdb.org/t/p/w185",
      tvShowsTopRated: [],
      tvShowsWeek: [],
      tvShowsToday: [],
      tvShowsPopular: [],
      tvShowsSimilar:[],
      moviesTheatres: [],
      moviesPopular: [],
      moviesTopRated: [],
      moviesUpcoming: [],
      cardDetails: [],
      movieDates: [],
      movieDetailsSimilar: [],
      searchQuery: "",
      searchTotalMovies: [],
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
    SET_TV_SHOWS_SIMILAR: (state, tvShowsSimilar) => {
      state.tvShowsSimilar = tvShowsSimilar;
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
    SET_MOVIES_UPCOMING: (state, moviesUpcoming) => {
      state.moviesUpcoming = moviesUpcoming;
    },
    SET_CARD_DETAILS: (state, cardDetails) => {
      state.cardDetails = cardDetails;
    },
    SET_MOVIE_DATES: (state, movieDates) => {
      state.movieDates = movieDates;
    },
    SET_MOVIE_SIMILAR: (state, movieDetailsSimilar) => {
      state.movieDetailsSimilar = movieDetailsSimilar;
    },

    // Search
    SET_SEARCH: (state, searchQuery) => {
      state.searchQuery = searchQuery;
    },
    SET_SEARCH_TOTAL_MOVIES: (state, searchTotalMovies) => {
      state.searchTotalMovies = searchTotalMovies;
    },
  },
  actions: {
    // Tv Shows
    async GET_TV_SHOWS_TOP_RATED({ commit }, page = this.state.page) {
      return await axios
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
    async GET_TV_SHOWS_WEEK({ commit }, page = this.state.page) {
      return await axios
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
    async GET_TV_SHOWS_TODAY({ commit }, page = this.state.page) {
      return await axios
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
    async GET_TV_SHOWS_POPULAR({ commit }, page = this.state.page) {
      return await axios
        .get(
          `/tv/popular?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
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
    async GET_MOVIES_THEATRES({ commit }, page = this.state.page) {
      return await axios
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
    async GET_MOVIES_POPULAR({ commit }, page = this.state.page) {
      return await axios
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
    async GET_MOVIES_TOP_RATED({ commit }, page = this.state.page) {
      return await axios
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
    async GET_MOVIES_UPCOMING({ commit }, page = this.state.page) {
      return await axios
        .get(
          `/movie/upcoming?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`
        )
        .then((res) => {
          commit("SET_MOVIES_UPCOMING", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    // more info about movies
    async GET_CARD_DETAILS_MOVIE({ commit }, id) {
      return await axios
        .get(
          `/movie/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=credits,release_dates,videos,external_ids`
        )
        .then((res) => {
          commit("SET_CARD_DETAILS", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    async GET_MOVIE_DATES({ commit }, id) {
      return await axios
        .get(
          `/movie/${id}/release_dates?api_key=${this.state.apiKey}&language=ru-RU`
        )
        .then((res) => {
          commit("SET_MOVIE_DATES", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    async GET_MOVIE_SIMILAR({ commit }, id) {
      return await axios
        .get(`/movie/${id}/similar?api_key=${this.state.apiKey}&language=ru-RU`)
        .then((res) => {
          commit("SET_MOVIE_SIMILAR", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    // more info about tv-shows
    async GET_CARD_DETAILS_SERIAL({ commit }, id) {
      return await axios
        .get(
          `/tv/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=content_ratings,credits,videos,external_ids`
        )
        .then((res) => {
          commit("SET_CARD_DETAILS", res.data);

          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    async GET_TV_SHOWS_SIMILAR({ commit }, id) {
      return await axios
        .get(`/tv/${id}/similar?api_key=${this.state.apiKey}&language=ru-RU`)
        .then((res) => {
          commit("SET_TV_SHOWS_SIMILAR", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
    // Multi search
    async GET_SEARCH({ commit }, query, page = this.state.page) {
      return await axios
        .get(
          `/search/multi?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        )
        .then((res) => {
          commit("SET_SEARCH", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },

    async GET_SEARCH_TOTAL_MOVIES({ commit }, query, page = this.state.page) {
      return await axios
        .get(
          `/search/movie?api_key=${this.state.apiKey}&language=ru-RU&query=${query}&page=${page}`
        )
        .then((res) => {
          commit("SET_SEARCH_TOTAL_MOVIES", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
  },
  modules: {},
  getters: {},
});

export default store;
