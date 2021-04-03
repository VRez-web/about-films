import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name:"home",
    path: "/",
    component: () => import("../pages/Home"),
  },
  {
    name: "movies-theatres",
    path: "/movies/movies-theatres",
    component: () => import("../pages/movies/MoviesTheatres"),
  },
  {
    name: "movies-popular",
    path: "/movies/movies-popular",
    component: () => import("../pages/movies/MoviesPopular"),
  },
  {
    name: "movies-topRated",
    path: "/movies/movies-topRated",
    component: () => import("../pages/movies/MoviesTopRated"),
  },
  {
    name: "movies-upcoming",
    path: "/movies/movies-upcoming",
    component: () => import("../pages/movies/MoviesUpcoming"),
  },
  {
    name: "serials-today",
    path: "/serials/serials-today",
    component: () => import("../pages/tvShows/TvShowsToday"),
  },
  {
    name: "serials-week",
    path: "/serials/serials-week",
    component: () => import("../pages/tvShows/TvShowsWeek"),
  },
  {
    name: "serials-popular",
    path: "/serials/serials-popular",
    component: () => import("../pages/tvShows/TvShowsPopular"),
  },
  {
    name: "serials-topRated",
    path: "/serials/serials-topRated",
    component: () => import("../pages/tvShows/TvShowsTopRated"),
  },
  {
    path: "/:category/:id",
    name: "card-details",
    component: () => import("../components/details/CardDetails"),
    props: true,
  },
  {
    path: "/:title/total",
    component: () => import("../components/search/SearchTotal"),
    name: "search-total",
    props: true,
  },
  {
    path: "/:id/cast",
    component: () => import("../components/details/CardDetailsCastAll"),
    name: "card-details-cast",
    props: true,
  },
  {
    path:"/person/:id",
    component:()=> import("@/components/person/AboutPerson"),
    name: "about-person",
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
  
});

router.beforeEach((to, from, next) => {
  document.title='About films'
  next()
})
export default router;
