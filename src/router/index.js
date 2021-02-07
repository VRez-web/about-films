import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import MoviesTheatres from '../pages/MoviesTheatres'
import TvShowsToday from '../pages/TvShowsToday'
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
