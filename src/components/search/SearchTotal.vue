<template>
  <section class="search__total">
    <div class="container">
      <h2 class="search__total-title section__title">
        Найдено: {{ results.total_results }}
      </h2>
      <div class="search__total-inner section__inner">
        <card
          :data="results.results"
          :category="category"
          v-if="category != 'person'"
        />
        <card-of-people
          v-else
          :data="item"
          v-for="item in results.results"
          :key="item.id"
        />
      </div>
      <pagination
        v-if="results.total_pages > 1"
        :totalPages="results.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import pagination from "@/components/Pagination";
import card from "@/components/Card";
import cardOfPeople from "@/components/CardOfPeople";
import { mapActions } from "vuex";

export default {
  components: { card, pagination, cardOfPeople },
  data() {
    return {
      results: {},
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions("searchMovies", ["GET_SEARCH_MOVIES"]),
    ...mapActions("searchSerials", ["GET_SEARCH_SERIALS"]),
    ...mapActions("searchPerson", ["GET_SEARCH_PERSON"]),
    async pageChange(page) {
      if (this.category == "movie") {
        const TOTAL_MOVIES = await this.GET_SEARCH_MOVIES({
          query: this.query,
          page: page,
        });
        this.results = TOTAL_MOVIES;
        this.currentPage = page;
      } else if (this.category == "serial") {
        const TOTAL_SERIALS = await this.GET_SEARCH_SERIALS({
          query: this.query,
          page: page,
        });
        this.results = TOTAL_SERIALS;
        this.currentPage = page;
      } else {
        const TOTAL_PERSON = await this.GET_SEARCH_PERSON({
          query: this.query,
          page: page,
        });
        this.results = TOTAL_PERSON;
        this.currentPage = page;
      }
    },
    async getMovies() {
      const TOTAL_MOVIES = await this.GET_SEARCH_MOVIES({
        query: this.query,
        page: this.currentPage,
      });
      this.results = TOTAL_MOVIES;
      this.currentPage = TOTAL_MOVIES.page;
    },
    async getSerials() {
      const TOTAL_SERIALS = await this.GET_SEARCH_SERIALS({
        query: this.query,
        page: this.currentPage,
      });
      this.results = TOTAL_SERIALS;
      this.currentPage = TOTAL_SERIALS.page;
    },
    async getPersons() {
      const TOTAL_PERSON = await this.GET_SEARCH_PERSON({
        query: this.query,
        page: this.currentPage,
      });
      this.results = TOTAL_PERSON;
      this.currentPage = TOTAL_PERSON.page;
    },

    getData() {
      if (this.category == "movie") {
        this.results = {};
        this.currentPage = 1;
        return this.getMovies();
      }
      if (this.category == "serial") {
        this.results = {};
        this.currentPage = 1;
        return this.getSerials();
      }
      this.results = {};
      this.currentPage = 1;
      return this.getPersons();
    },
  },
  computed: {
    category() {
      return this.$route.params.category;
    },
    query() {
      let query = null;
      if (!!this.$route.params.query) {
        query = this.$route.params.query;
        sessionStorage.setItem("query", query);
      }
      return sessionStorage.getItem("query");
    },
  },
  watch: {
    query: {
      immediate: true,
      handler: function () {
        !!this.category ? this.getData() : "";
      },
    },
  },

  destroyed() {
    sessionStorage.removeItem("query");
  },
};
</script>
