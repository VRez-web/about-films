<template>
  <section class="section">
    <div class="container">
      <h2 class="-title section__title">Лучшее кино:</h2>
      <div class="section__inner">
        <card :data="moviesTopRated.results" />
      </div>
      <pagination
        :data="moviesTopRated"
        :totalPages="moviesTopRated.total_pages"
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
      moviesTopRated: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_MOVIES_TOP_RATED"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_MOVIES_TOP_RATED((page = this.currentPage)).then((res) => {
        this.moviesTopRated = res;
      });
    },
  },

  mounted() {
    this.GET_MOVIES_TOP_RATED().then((res) => {
      this.moviesTopRated = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>

<style>
</style>