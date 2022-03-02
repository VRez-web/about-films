import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("@/pages/Home"),
    },
    {
        name: "movies-theatres",
        path: "/movies/movies-theatres",
        component: () => import("@/pages/movies/MoviesTheatres"),
    },
    {
        name: "movies-popular",
        path: "/movies/movies-popular",
        component: () => import("@/pages/movies/MoviesPopular"),
    },
    {
        name: "movies-topRated",
        path: "/movies/movies-topRated",
        component: () => import("@/pages/movies/MoviesTopRated"),
    },
    {
        name: "movies-upcoming",
        path: "/movies/movies-upcoming",
        component: () => import("@/pages/movies/MoviesUpcoming"),
    },
    {
        name: "serials-today",
        path: "/serials/serials-today",
        component: () => import("@/pages/tvShows/TvShowsToday"),
    },
    {
        name: "serials-week",
        path: "/serials/serials-week",
        component: () => import("@/pages/tvShows/TvShowsWeek"),
    },
    {
        name: "serials-popular",
        path: "/serials/serials-popular",
        component: () => import("@/pages/tvShows/TvShowsPopular"),
    },
    {
        name: "serials-topRated",
        path: "/serials/serials-topRated",
        component: () => import("@/pages/tvShows/TvShowsTopRated"),
    },
    {
        name: "movie-id",
        path: "/movie/:id",
        component: () => import("@/pages/movies/_id/Movie"),
    },
    {
        name: "serial-id",
        path: "/serial/:id",
        component: () => import("@/pages/serials/_id/Serial"),
    },
    {
        path: "/:name/:id/cast",
        name: "cast-id",
        component: () => import("@/pages/cast/_id/Cast"),
    },
    {
        path: "/person/:id",
        name: "person-id",
        component: () => import("@/pages/person/_id/Person"),
    },
    {
        path: '/search/total',
        name: 'search-total',
        component: () => import('@/pages/search/total/SearchTotal')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        document.getElementById("app").scrollIntoView();
    },
});

export default router;
