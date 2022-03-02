<template>
  <section class="search__total">
    <div class="container">
      <PageWrapper :model="result" @page-change="getData"/>
    </div>
  </section>
</template>

<script>
import {searchMovies, searchPerson, searchSerials} from "@/services/search";
import PageWrapper from "@/components/PageWrapper";

export default {
  components: {PageWrapper},
  data() {
    return {
      result: null
    }
  },
  watch: {
    query: {
      handler: function () {
        this.$router.go(0)
      },
    }
  },
  created() {
    this.getData()
  },
  computed: {
    type() {
      return this.$route.query.type
    },

    query() {
      return this.$route.query.str
    }
  },
  methods: {
    getData(page = 1) {
      if (this.type === 'movie') {
        this.searchMovies(page)
      } else if (this.type === 'serial') {
        this.searchSerials(page)
      } else {
        this.searchPersons(page)
      }
    },

    async searchMovies(page = 1) {
      const movies = await searchMovies(this.query, page)
      this.result = movies
    },

    async searchSerials(page = 1) {
      const serials = await searchSerials(this.query, page)
      this.result = serials
    },

    async searchPersons(page = 1) {
      const persons = await searchPerson(this.query, page)
      this.result = persons
    },
  }
}
</script>
