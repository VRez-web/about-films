<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Лучшие Тв-шоу:
      </h2>
      <div class="tv__shows__inner section__inner">
           <card :data="tvShowsTopRated.results" />
      </div>
      <pagination
        :data="tvShowsTopRated"
        :totalPages="tvShowsTopRated.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import card from "../../components/Card";
import pagination from "../../components/Pagination";
import { mapActions } from "vuex";
export default {
  components: { card, pagination },
  data() {
    return {
      pages: "",
      currentPage: this.$store.page,
      tvShowsTopRated: [],
    };
  },
  methods: {
    ...mapActions(["GET_TV_SHOWS_TOP_RATED"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_TV_SHOWS_TOP_RATED((page = this.currentPage)).then((res) => {
        this.tvShowsTopRated = res;
      });
    },
  },
  mounted() {
    this.GET_TV_SHOWS_TOP_RATED().then((res) => {
      this.tvShowsTopRated = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>

<style>
</style>