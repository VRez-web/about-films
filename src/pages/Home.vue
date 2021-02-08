<template>
  <main>
    <router-link to="/movies-theatres">В кинотеатре сейчас</router-link>
    <router-link to="/tvShows-today"> Тв-шоу сегодня:</router-link>
    <router-link to="/tvShows-week"> Тв-шоу на неделю:</router-link>
    <router-link to="/tvShows-popular"> Популярные Тв-шоу:</router-link>
    <router-link to="/tvShows-topRated"> Лучшие Тв-шоу:</router-link>
  </main>
</template>

<script>
import MoviesTheatres from "./MoviesTheatres";
export default {
  components: { MoviesTheatres },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
</style>