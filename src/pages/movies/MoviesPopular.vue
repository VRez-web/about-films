<template>
  <section class="movies__popular section">
    <div class="container">
      <h2 class="movies__popular-title section__title">
       Популярное кино
      </h2>
      <div class="movies__popular-inner section__inner">
          <card :data="moviesPopular.results"/>
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
    ...mapActions(["GET_MOVIES_POPULAR"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_MOVIES_POPULAR((page = this.currentPage)).then((res) => {
        this.moviesPopular = res;
      });
    },
  },

  mounted() {
    this.GET_MOVIES_POPULAR().then((res) => {
      this.moviesPopular = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>

<style>
</style>