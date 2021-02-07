<template>
  <main>
    <router-link to="/movies-theatres">В кинотеатре сейчас</router-link>
    <router-link to="/tvShows-today"> Новейшие Тв-шоу:</router-link>
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