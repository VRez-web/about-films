<template>
  <section class="movies__popular section">
    <div class="container">
      <h2 class="movies__popular-title section__title">Популярное кино</h2>
      <div class="movies__popular-inner section__inner">
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
    ...mapActions("moviesPopular", ["GET_MOVIES_POPULAR"]),
    async pageChange(page) {
      const MOVIES = await this.GET_MOVIES_POPULAR(page);
      this.movies = { ...MOVIES, ...MOVIES.data };
      this.currentPage = page;
    },
  },

  async created() {
    try {
      const MOVIES = await this.GET_MOVIES_POPULAR();
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

<style>
</style>