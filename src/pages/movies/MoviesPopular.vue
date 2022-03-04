<template>
  <AppLoader v-if="movies === null"/>
  <div v-else class="container">
    <PageWrapper :model="movies" :type="'movie'" @page-change="getPopularMovies" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import PageWrapper from '@/components/PageWrapper';
import AppLoader from '@/components/app/AppLoader';
import { getMoviesPopular } from '@/services/movies';

export default {
  components: { AppLoader, PageWrapper, pagination },
  data() {
    return {
      movies: null,
    };
  },
  created() {
    this.getPopularMovies();
  },
  methods: {
    async getPopularMovies(page = 1) {
      this.movies = null
      const movies = await getMoviesPopular(page);
      this.movies = movies.data;
    },
  },
};
</script>
