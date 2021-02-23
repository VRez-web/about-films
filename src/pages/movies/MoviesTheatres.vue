<template>
  <section class="movies__theatres section">
    <div class="container">
      <h2 class="movies__theatres-title section__title">
        Сейчас в кинотеатрах:
      </h2>
      <div class="movies__theatres-inner section__inner">
        <card :data="moviesTeatres.results" />
      </div>

      <pagination
        :data="moviesTeatres"
        :totalPages="moviesTeatres.total_pages"
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
      moviesTeatres: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_MOVIES_THEATRES", "GET_MOVIE_DATES"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_MOVIES_THEATRES((page = this.currentPage)).then((res) => {
        this.moviesTeatres = res;
      });
    },
  },

  mounted() {
    this.GET_MOVIES_THEATRES().then((res) => {
      this.moviesTeatres = res;
      this.moviesTeatres.results.forEach((item) => {
        this.GET_MOVIE_DATES(item.id).then((resolve) => {
          resolve.results.forEach((date) => {
            if (date.iso_3166_1 == "RU") {
              item.release_date = date.release_dates[0].release_date.slice(
                0,
                4
              );
            }
          });
        });
      });
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>


<style lang="scss" scoped>
</style>