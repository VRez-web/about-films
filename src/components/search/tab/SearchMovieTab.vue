<template>
  <div class="search__list">
    <Card
        v-for="movie in movies"
        :model="movie"
        :media-type="'movie'"
        class="search__list-item"
    />
  </div>
  <div v-if="movies.length === 10" class="search__more link" @click="$emit('close')">
    <router-link :to="{name:'search-total', query:{str:$route.query,type:'movie'}}">Посмотреть всё</router-link>
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
