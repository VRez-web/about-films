import { createStore } from "vuex";

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

import multiSearch from "./modules/search/multiSearch";
import searchMovies from "./modules/search/searchMovies";
import searchSerials from "./modules/search/searchSerials";
import searchPerson from "./modules/search/searchPeople";

import aboutPerson from './modules/person/aboutPerson'
const store = createStore({
  state() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      imgUrl: "https://image.tmdb.org/t/p/w342",
      imgProfileSize: "http://image.tmdb.org/t/p/w185",
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

    multiSearch,
    searchMovies,
    searchSerials,
    searchPerson,

    aboutPerson,
  },
  mutations: {},
  getters: {},
});

export default store;
