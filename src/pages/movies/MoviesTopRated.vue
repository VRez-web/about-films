<template>
  <section class="section">
    <div class="container">
      <h2 class="-title section__title">Лучшее кино:</h2>
      <div class="section__inner">
        <card :data="movies.results" :category="movies.type" />
      </div>
      <pagination
        :totalPages="pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import pagination from "../../components/Pagination.vue";
import card from "../../components/Card";

export default {
  components: { card, pagination },
  data() {
    return {
      movies: {},
      pages: null,
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions("moviesTopRated", ["GET_MOVIES_TOP_RATED"]),
    async pageChange(page) {
      const MOVIES = await this.GET_MOVIES_TOP_RATED(page);
      this.movies = { ...MOVIES, ...MOVIES.data };
      this.currentPage = page;
    },
  },
  async created() {
    try {
      const MOVIES = await this.GET_MOVIES_TOP_RATED();
      this.movies = { ...MOVIES, ...MOVIES.data };
      this.currentPage = MOVIES.data.page;
      this.pages = MOVIES.data.total_pages;
    } catch (e) {
      // FIXME: сделать модалку для вывода ошибки пользователю
      console.log(e);
    }
  },
};
</script>