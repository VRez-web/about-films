<template>
  <AppLoader v-if="movies === null" />
  <div v-else class="container">
    <PageWrapper :model="movies" :type="'movie'" @page-change="getMoviesTheatres" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getMoviesTheatres } from '@/services/movies';

export default {
  components: { pagination, AppLoader, PageWrapper },
  data() {
    return {
      movies: null,
    };
  },
  created() {
    this.getMoviesTheatres()
  },
  methods: {
    async getMoviesTheatres(page = 1) {
      this.movies = null
      const movies = await getMoviesTheatres(page);
      this.movies = movies.data
    },
  },
};
</script>
