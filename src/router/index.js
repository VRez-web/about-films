import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("@/pages/Home"),
    },
    {
        name: "movies-theatres",
        path: "/movies/theatres",
        component: () => import("@/pages/movies/MoviesTheatres"),
    },
    {
        name: "movies-popular",
        path: "/movies/popular",
        component: () => import("@/pages/movies/MoviesPopular"),
    },
    {
        name: "movies-topRated",
        path: "/movies/topRated",
        component: () => import("@/pages/movies/MoviesTopRated"),
    },
    {
        name: "movies-upcoming",
        path: "/movies/upcoming",
        component: () => import("@/pages/movies/MoviesUpcoming"),
    },
    {
        name: "serials-today",
        path: "/serials/today",
        component: () => import("@/pages/serials/SerialsToday"),
    },
    {
        name: "serials-week",
        path: "/serials/week",
        component: () => import("@/pages/serials/SerialsWeek"),
    },
    {
        name: "serials-popular",
        path: "/serials/popular",
        component: () => import("@/pages/serials/SerialsPopular"),
    },
    {
        name: "serials-topRated",
        path: "/serials/top-rated",
        component: () => import("@/pages/serials/SerialsTopRated"),
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
        path: "/persons/popular",
        name: "persons-popular",
        component: () => import("@/pages/person/PersonsPopular"),
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
