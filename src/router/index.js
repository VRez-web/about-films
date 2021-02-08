import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import MoviesTheatres from '../pages/MoviesTheatres'
import TvShowsToday from '../pages/TvShowsToday'
import TvShowsWeek from '../pages/TvShowsWeek'
import TvShowsPopular from '../pages/TvShowsPopular'
import TvShowsTopRated from '../pages/TvShowsTopRated'
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
