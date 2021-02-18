import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import MoviesTheatres from '../pages/movies/MoviesTheatres'
import MoviesPopular from '../pages/movies/MoviesPopular'
import MoviesTopRated from '../pages/movies/MoviesTopRated'
import MoviesUpcoming from '../pages/movies/MoviesUpcoming'
import TvShowsToday from '../pages/tvShows/TvShowsToday'
import TvShowsWeek from '../pages/tvShows/TvShowsWeek'
import TvShowsPopular from '../pages/tvShows/TvShowsPopular'
import TvShowsTopRated from '../pages/tvShows/TvShowsTopRated'
import CardDetails from '../components/details/CardDetails'
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
    path: "/movies-popular",
    component: MoviesPopular,
  },
  {
    path: "/movies-topRated",
    component: MoviesTopRated,
  },
  {
    path: "/movies-upcoming",
    component: MoviesUpcoming,
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
  {
    path: "/title",
    component: CardDetails,
    props:true,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
