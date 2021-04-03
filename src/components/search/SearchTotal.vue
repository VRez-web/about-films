<template>
  <section class="search__total">
    <div class="container">
      <div class="search__total-inner section__inner">
        <card :data="totalMovies.results" />
      </div>
      <pagination
        :data="totalMovies"
        :totalPages="totalMovies.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import pagination from "../Pagination";
import card from "../Card";
import { mapActions } from "vuex";
export default {
  components: { card, pagination },
  data() {
    return {
      totalMovies: [],
      totalTvShows: [],
      totalPerson: [],
      query: this.$attrs.query,
      category: this.$attrs.title,
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_SEARCH_TOTAL_MOVIES"]),
    async pageChange(page) {
      const TOTAL_MOVIES = await this.GET_SEARCH_TOTAL_MOVIES({
        query: this.query,
        page: page,
      });
      this.totalMovies = TOTAL_MOVIES;
      this.currentPage = page;
    },
  },
  computed: {},
  async created() {
    if (this.category == "movie") {
      const TOTAL_MOVIES = await this.GET_SEARCH_TOTAL_MOVIES({
        query: this.query,
        page: this.currentPage,
      });
      this.totalMovies = TOTAL_MOVIES;
      this.currentPage = TOTAL_MOVIES.page;
    } else if (this.category == "serial") {
      
    } else {
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
</style>