<template>
  <section class="movies__popular section">
    <div class="container">
      <h2 class="movies__popular-title section__title">
        Ожидаемое в кинотеатрах
      </h2>
      <div class="movies__popular-inner section__inner">
        <card :data="moviesUpcoming.results" />
      </div>

      <pagination
        :data="moviesUpcoming"
        :totalPages="moviesUpcoming.total_pages"
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
      moviesUpcoming: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_MOVIES_UPCOMING"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_MOVIES_UPCOMING((page = this.currentPage)).then((res) => {
        this.moviesUpcoming = res;
      });
    },
  },

  mounted() {
    this.GET_MOVIES_UPCOMING().then((res) => {
      this.moviesUpcoming = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>

<style>
</style>