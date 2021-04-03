import { createStore } from "vuex";
import axios from "../plugins/axios";
import serialsTopRated from "./modules/serials/serialsTopRated";
import serialsPopular from "./modules/serials/serialsPopular";
import serialsWeek from "./modules/serials/serialsWeek";
import serialsToday from "./modules/serials/serialsToday";
import serialsSimilar from "./modules/serials/serialsSimilar";
import serialsDetails from "./modules/serials/serialsDetails";
import moviesUpcoming from "./modules/movies/moviesUpcoming";
import moviesTheatres from "./modules/movies/moviesTheatres";
import moviesPopular from "./modules/movies/moviesPopular";
import moviesTopRated from "./modules/movies/moviesTopRated";
import moviesSimilar from "./modules/movies/moviesSimilar";
import moviesDates from "./modules/movies/moviesDates";
import moviesDetails from "./modules/movies/moviesDetails";
const store = createStore({
  state() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      imgUrl: "https://image.tmdb.org/t/p/w342",
      imgProfileSize: "http://image.tmdb.org/t/p/w185",

      searchQuery: "",
      searchTotalMovies: [],
      aboutPerson: [],
      page: 1,
    };
  },
  modules: {
    serialsTopRated,
    serialsPopular,
    serialsWeek,
    serialsToday,
    serialsSimilar,
    serialsDetails,



    moviesUpcoming,
    moviesTheatres,
    moviesPopular,
    moviesTopRated,
    moviesSimilar,
    moviesDates,
    moviesDetails,
  },
  mutations: {
    // Search
    SET_SEARCH: (state, searchQuery) => {
      state.searchQuery = searchQuery;
    },
    SET_SEARCH_TOTAL_MOVIES: (state, searchTotalMovies) => {
      state.searchTotalMovies = searchTotalMovies;
    },
    // About person
    SET_ABOUT_PERSON: (state, aboutPerson) => {
      state.aboutPerson = aboutPerson;
    },
  },
  actions: {
    // Multi search
    async GET_SEARCH({ commit }, { query, page = this.state.page }) {
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

    async GET_SEARCH_TOTAL_MOVIES(
      { commit },
      { query, page = this.state.page }
    ) {
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
    // details person
    async GET_ABOUT_PERSON({ commit }, id) {
      return await axios
        .get(
          `/person/${id}?api_key=${this.state.apiKey}&language=ru-RU&append_to_response=movie_credits,tv_credits,external_ids`
        )
        .then((res) => {
          commit("SET_ABOUT_PERSON", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    },
  },
  getters: {},
});

export default store;
