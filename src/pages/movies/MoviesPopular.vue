<template>
  <section class="movies__popular section">
    <div class="container">
      <h2 class="movies__popular-title section__title">Популярное кино</h2>
      <div class="movies__popular-inner section__inner">
        <card :data="moviesPopular.results" :category="'movie'" />
      </div>

      <pagination
        :data="moviesPopular"
        :totalPages="moviesPopular.total_pages"
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
      moviesPopular: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions('moviesPopular',["GET_MOVIES_POPULAR"]),
    ...mapActions('moviesDates',["GET_MOVIE_DATES"]),
    async pageChange(page) {
      const MOVIES_POPULAR = await this.GET_MOVIES_POPULAR(page);
      this.moviesPopular = MOVIES_POPULAR;
      this.currentPage = page;
    },
  },

  async mounted() {
    const MOVIES_POPULAR = await this.GET_MOVIES_POPULAR();
    this.moviesPopular = MOVIES_POPULAR;

    this.moviesPopular.results.forEach((item) => {
      this.GET_MOVIE_DATES(item.id).then((resolve) => {
        resolve.results.forEach((date) => {
          if (date.iso_3166_1 == "RU") {
            item.release_date = date.release_dates[0].release_date.slice(0, 4);
          }
        });
      });
    });

    this.pages = MOVIES_POPULAR.total_pages;
    this.currentPage = MOVIES_POPULAR.page;
  },
};
</script>

<style>
</style>