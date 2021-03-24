<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">Популярные сериалы</h2>
      <div class="tv__shows__inner section__inner">
        <card :data="tvShowsPopular.results" :category="'serial'"/>
      </div>

      <pagination
        :data="tvShowsPopular"
        :totalPages="tvShowsPopular.total_pages"
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
      tvShowsPopular: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_TV_SHOWS_POPULAR"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_TV_SHOWS_POPULAR((page = this.currentPage)).then((res) => {
        this.tvShowsPopular = res;
      });
    },
  },
  computed: {},
  mounted() {
    this.GET_TV_SHOWS_POPULAR().then((res) => {
      this.tvShowsPopular = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>

<style>
</style>