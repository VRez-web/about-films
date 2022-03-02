<template>
  <section class="search">
    <span class="search__close link" @click="close">Назад</span>
    <div class="container">
      <div class="search__inner">
        <h2 class="search__title">Поиск</h2>
        <SearchField
            :search-result="dropdown"
            @search="search"
            @get-data="getData"
            @close="close"
        />
        <div v-if="isHideResult" class="search__wrapper">
          <div class="search__wrapper-header">
            <div v-for="tab in result.menu" class="search__wrapper-item">
              <button
                  v-if="tab.total !== 0"
                  class="search__tab"
                  :class="{'active':tab.name === currentStep}"
                  @click="currentStep = tab.name"
              >
                {{ tab.title }} <span>({{ tab.total }})</span>
              </button>
            </div>
          </div>
          <component
              :is="currentStep"
              :movies="result.movies"
              :serials="result.serials"
              :persons="result.persons"
              @close="close"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SearchMovieTab from "@/components/search/tab/SearchMovieTab"
import SearchSerialTab from "@/components/search/tab/SearchSerialTab";
import SearchPersonTab from "@/components/search/tab/SearchPersonTab";
import {multiSearch, searchMovies, searchPerson, searchSerials} from "@/services/search";
import SearchField from "@/pages/search/SearchField";

export default {
  components: {
    SearchField,
    SearchMovieTab,
    SearchSerialTab,
    SearchPersonTab
  },
  data() {
    return {
      dropdown: [],
      currentStep: 'searchMovieTab',
      result: {
        menu: [
          {name: 'searchMovieTab', title: 'Фильмы', total: 0},
          {name: 'SearchSerialTab', title: 'Сериалы', total: 0},
          {name: 'SearchPersonTab', title: 'Люди', total: 0},
        ],
        movies: [],
        serials: [],
        persons: []
      }
    };
  },
  created() {
    document.body.style = 'overflow:hidden;'
  },
  unmounted() {
    document.body.style = 'overflow:auto;'
  },
  methods: {
    close() {
      this.$emit("close");
    },

    async search(query) {
      console.log(query)
      const result = await multiSearch(query)
      this.dropdown = result.results.slice(0, 5)
    },

    getData(query) {
      this.searchMovies(query)
      this.searchSerials(query)
      this.searchPersons(query)
      this.$route.query = query
    },

    async searchMovies(query) {
      const movies = await searchMovies(query)
      this.result.menu[0].total = movies.total_results
      this.result.movies = movies.results.slice(0, 10)
    },

    async searchSerials(query) {
      const serials = await searchSerials(query)
      this.result.menu[1].total = serials.total_results
      this.result.serials = serials.results.slice(0, 10)
    },

    async searchPersons(query) {
      const persons = await searchPerson(query)
      this.result.menu[2].total = persons.total_results
      this.result.persons = persons.results.slice(0, 10)
    },
  },
  computed: {
    isHideResult() {
      const movies = this.result.menu[0].total !== 0,
          serials = this.result.menu[0].total !== 0,
          persons = this.result.menu[0].total !== 0
      return movies || serials || persons
    },

    isNotFoundResult() {
      const movies = this.result.menu[0].total === 0,
          serials = this.result.menu[0].total === 0,
          persons = this.result.menu[0].total === 0
      return movies && serials && persons
    }
  },
};
</script>
