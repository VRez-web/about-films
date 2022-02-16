<template>
  <div class="search__list">
    <Card
        v-for="movie in movies"
        :model="movie"
        :media-type="'movie'"
        class="search__list-item"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  props: {
    movies: Array
  }
}
</script>
