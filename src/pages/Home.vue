<template>
  <main>
    <router-link to="/movies-theatres">В кинотеатре сейчас</router-link>
    <router-link to="/movies-popular">Популярные фильмы</router-link>
    <router-link to="/movies-topRated">Лучшие фильмы</router-link>
    <router-link to="/tvShows-today"> Тв-шоу сегодня:</router-link>
    <router-link to="/tvShows-week"> Тв-шоу на неделю:</router-link>
    <router-link to="/tvShows-popular"> Популярные Тв-шоу:</router-link>
    <router-link to="/tvShows-topRated"> Лучшие Тв-шоу:</router-link>
  </main>
</template>

<script>
export default {
  components: {},
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