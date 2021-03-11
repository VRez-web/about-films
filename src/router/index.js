import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component:()=> import("../pages/Home"),
  },
  {
    path: "/movies-theatres",
    component:()=> import("../pages/movies/MoviesTheatres")
  },
  {
    path: "/movies-popular",
    component:()=> import("../pages/movies/MoviesPopular")
  },
  {
    path: "/movies-topRated",
    component:()=> import("../pages/movies/MoviesTopRated")
  },
  {
    path: "/movies-upcoming",
    component:()=> import("../pages/movies/MoviesUpcoming"),
  },
  {
    path: "/serials-today",
    component:()=> import("../pages/tvShows/TvShowsToday")
  },
  {
    path: "/serials-week",
    component:()=> import("../pages/tvShows/TvShowsWeek"),
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
    component:()=> import("../components/search/SearchTotal"),
    name: "search-total",
    props: true,
  },
  {
    path: "/:title/:id/cast",
    component:()=> import("../components/details/CardDetailsCast"),
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
