<template>
  <AppLoader v-if="movies === null" />
  <div v-else class="container">
    <PageWrapper :model="movies" :type="'movie'" @page-change="getMoviesUpcoming" />
  </div>
</template>

<script>
import pagination from "@/components/Pagination.vue";
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getMoviesUpcoming } from '@/services/movies';

export default {
  components: {  pagination,AppLoader, PageWrapper},
  data() {
    return {
      movies: null,
    };
  },
  created() {
    this.getMoviesUpcoming()
  },
  methods: {
    async getMoviesUpcoming(page = 1){
      this.movies = null
      const movies = await getMoviesUpcoming(page)
      this.movies = movies.data
    }
  },
};
</script>
