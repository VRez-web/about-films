import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            apiKey: process.env.VUE_APP_API_KEY,
            imgUrl: "https://image.tmdb.org/t/p/w342",
            imgUrlSmall: "https://image.tmdb.org/t/p/w92",
            imgUrlMedium: "https://image.tmdb.org/t/p/w154",
            imgUrlMediumPlus: "https://image.tmdb.org/t/p/w154",
            imgProfileSize: "https://image.tmdb.org/t/p/w185",
            backdropBig: "https://image.tmdb.org/t/p/w1280",
        };
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    },
});

export default store;
