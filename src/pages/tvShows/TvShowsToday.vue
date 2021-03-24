<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Сериалы на сегодня:
      </h2>
      <div class="tv__shows__inner section__inner">
           <card :data="tvShowsToday.results" :category="'serial'"/>
      </div>

      <pagination
        :data="tvShowsToday"
        :totalPages="tvShowsToday.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import pagination from "../../components/Pagination";
import card from "../../components/Card";
import { mapActions } from "vuex";
export default {
  components: { card, pagination },
  data() {
    return {
      tvShowsToday: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_TV_SHOWS_TODAY"]),
    pageChange(page) {
      this.currentPage = page;
      this.GET_TV_SHOWS_TODAY((page = this.currentPage)).then((res) => {
        this.tvShowsToday = res;
      });
    },
  },
  computed: {},
  mounted() {
    this.GET_TV_SHOWS_TODAY().then((res) => {
      this.tvShowsToday = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
};
</script>


<style lang="scss" scoped>
</style>