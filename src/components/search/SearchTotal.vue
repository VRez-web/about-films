<template>
  <section class="search__total">
    <div class="container">
      <div class="search__total-inner">
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
    pageChange(page) {
      // this.currentPage = page;
      this.GET_SEARCH_TOTAL_MOVIES(this.query, page).then((res) => {
        this.totalMovies = res;
        this.currentPage=page
        console.log(this.query);
        console.log(page);
        console.log(res);
      });
    },
  },
  computed: {},
  created() {
    if (this.category == "movie") {
      this.GET_SEARCH_TOTAL_MOVIES(this.query, this.currentPage).then((res) => {
        this.totalMovies = res;
        this.currentPage = res.page;
      });
    } else if (this.category == "tv-shows") {
    } else {
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.search__total {
  &-inner {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>