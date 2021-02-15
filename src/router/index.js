import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import MoviesTheatres from '../pages/movies/MoviesTheatres'
import TvShowsToday from '../pages/tvShows/TvShowsToday'
import TvShowsWeek from '../pages/tvShows/TvShowsWeek'
import TvShowsPopular from '../pages/tvShows/TvShowsPopular'
import TvShowsTopRated from '../pages/tvShows/TvShowsTopRated'
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/movies-theatres",
    component: MoviesTheatres,
  },
  {
    path: "/tvShows-today",
    component: TvShowsToday,
  },
  {
    path: "/tvShows-week",
    component: TvShowsWeek,
  },
  {
    path: "/tvShows-popular",
    component: TvShowsPopular,
  },
  {
    path: "/tvShows-topRated",
    component: TvShowsTopRated,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
