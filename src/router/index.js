import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import MoviesTheatres from "../pages/movies/MoviesTheatres";
import MoviesPopular from "../pages/movies/MoviesPopular";
import MoviesTopRated from "../pages/movies/MoviesTopRated";
import MoviesUpcoming from "../pages/movies/MoviesUpcoming";
import TvShowsToday from "../pages/tvShows/TvShowsToday";
import TvShowsWeek from "../pages/tvShows/TvShowsWeek";
// import TvShowsPopular from "../pages/tvShows/TvShowsPopular";
// import TvShowsTopRated from "../pages/tvShows/TvShowsTopRated";
// import CardDetails from "../components/details/CardDetails";
// const CardDetails = () => import("../components/details/CardDetails"),
//   TvShowsPopular = () => import("../pages/tvShows/TvShowsPopular"),
//   TvShowsTopRated = () => import("../pages/tvShows/TvShowsTopRated");
import SearchTotal from "../components/search/SearchTotal";
import cardDetailsCast from "../components/details/CardDetailsCast";
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
    path: "/serials-today",
    component: TvShowsToday,
  },
  {
    path: "/serials-week",
    component: TvShowsWeek,
  },
  {
    path: "/serials-popular",
    component:()=> import('../pages/tvShows/TvShowsPopular'),
  },
  {
    path: "/serials-topRated",
    component:()=> import("../pages/tvShows/TvShowsTopRated"),
  },
  {
    path: "/:title/:id",
    name: "card-details",
    component: ()=> import("../components/details/CardDetails"),
    props: true,
  },
  {
    path: "/:title/total",
    component: SearchTotal,
    name: "search-total",
    props: true,
  },
  {
    path: "/:title/:id/cast",
    component: cardDetailsCast,
    name: "card-details-cast",
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
