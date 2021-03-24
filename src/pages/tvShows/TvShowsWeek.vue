<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Сериалы на неделю:
      </h2>
      <div class="tv__shows__inner section__inner">
       <card :data="tvShowsWeek.results" :category="'serial'"/>
      </div>
      <pagination
        :data="tvShowsWeek"
        :totalPages="tvShowsWeek.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import card from "../../components/Card";
import { mapActions } from "vuex";
import pagination from "../../components/Pagination.vue";
export default {
  components: { card, pagination },
  data() {
    return {
      tvShowsWeek: [],
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_TV_SHOWS_WEEK"]),
        pageChange(page) {
      this.currentPage = page;
      this.GET_TV_SHOWS_WEEK((page = this.currentPage)).then((res) => {
        this.tvShowsWeek = res;
      });
  },
  },
  computed: {},
  mounted() {
    this.GET_TV_SHOWS_WEEK().then((res) => {
      this.tvShowsWeek = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
}
</script>

<style>
</style>