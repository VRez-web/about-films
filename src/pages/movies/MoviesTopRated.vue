<template>
  <AppLoader v-if="movies === null" />
  <div v-else class="container">
    <PageWrapper :model="movies" :type="'movie'" @page-change="getMoviesTopRated" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getMoviesTopRated } from '@/services/movies';

export default {
  components: { pagination, AppLoader, PageWrapper },
  data() {
    return {
      movies: null,
    };
  },
  created() {
    this.getMoviesTopRated();
  },
  methods: {
    async getMoviesTopRated(page = 1) {
      this.movies = null;
      const movies = await getMoviesTopRated(page);
      this.movies = movies.data;
    },
  },
};
</script>
