<template>
  <div class="home__section">
    <div class="home__header">
      <h2 class="home__title">Популярное</h2>
      <div class="home__tabs">
        <button
            v-for="(tab,i) in tabs"
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
        {title: 'Люди', name: 'PeopleTab'},
      ],
      model: {
        movies: [],
        tvShows: [],
        people: []
      }
    }
  },
  async created() {
    const popularMovies = await getMoviesTheatres()
    const popularTvShows = await getSerialsPopular()
    this.model.movies = popularMovies.data.results.slice(0, 16)
    this.model.tvShows = popularTvShows.data.results.slice(0, 16)
  },
  computed: {
    currentModel() {
      if (this.currentStep === 'MoviesTab') {
        return this.model.movies
      } else if (this.currentStep === 'TvShowsTab') {
        return this.model.tvShows
      }
    }
  }
}
</script>