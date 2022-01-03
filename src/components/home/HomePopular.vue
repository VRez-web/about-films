<template>
  <div class="home__section">
    <div class="home__header">
      <h2 class="home__title">Популярное</h2>
      <div class="home__tabs">
        <button
            v-for="tab in tabs"
            class="home__tab"
            :class="{'active':currentStep === tab.name}"
            @click="currentStep = tab.name"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>
    <keep-alive>
      <component :is="currentStep" :model="currentModel"/>
    </keep-alive>
  </div>
</template>

<script>
import MoviesTab from '@/components/home/popular/tab/MoviesTab'
import TvShowsTab from "@/components/home/popular/tab/TvShowsTab";
import {getMoviesTheatres} from "@/services/movies";
import {getSerialsPopular} from "@/services/serials";

export default {
  components: {
    MoviesTab,
    TvShowsTab
  },
  data() {
    return {
      currentStep: 'MoviesTab',
      tabs: [
        {title: 'В кинотеатрах', name: 'MoviesTab'},
        {title: 'По ТВ', name: 'TvShowsTab'},
      ],
      model: {
        movies: [],
        tvShows: [],
      }
    }
  },
  created() {
    this.getPopularMovies()
    this.getPopularTvShows()
  },
  computed: {
    currentModel() {
      if (this.currentStep === 'MoviesTab') {
        return this.model.movies
      } else if (this.currentStep === 'TvShowsTab') {
        return this.model.tvShows
      }
    }
  },
  methods: {
    async getPopularMovies() {
      const popularMovies = await getMoviesTheatres()
      this.model.movies = popularMovies.data.results.slice(0, 16)
    },

    async getPopularTvShows() {
      const popularTvShows = await getSerialsPopular()
      this.model.tvShows = popularTvShows.data.results.slice(0, 16)
    }
  }
}
</script>
