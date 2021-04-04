<template>
  <section class="card__details-similar" v-show="!!correctData.length">
    <div class="container">
      <h2 class="card__details-title">Похожие {{correctTitle}}</h2>
      <slider :data="correctData" :category="category" />
    </div>
  </section>
</template>

<script>
import slider from "../Slider";
import { mapActions } from "vuex";
export default {
  components: { slider },
  props: {
    cardId: String,
    category: String,
  },
  data() {
    return {
      similarMovies: [],
      similarSerials: [],
    };
  },
  methods: {
    ...mapActions('moviesSimilar',['GET_MOVIE_SIMILAR']),
    ...mapActions('serialsSimilar',['GET_SERIAL_SIMILAR']),
    async getSimilarMovies() {
      const MOVIE_SIMILAR = await this.GET_MOVIE_SIMILAR(this.cardId);
      this.similarMovies = MOVIE_SIMILAR.results.slice(0, 12);
    },
    async getSimilarTvShows() {
      const SERIAL_SIMILAR = await this.GET_SERIAL_SIMILAR(this.cardId);
      this.similarSerials = SERIAL_SIMILAR.results.slice(0, 12);
    },
    getData() {
      return this.category == "movie"
        ? this.getSimilarMovies()
        : this.getSimilarTvShows();
    },
  },
  computed: {
    correctData() {
      return this.category == "movie"
        ? this.similarMovies
        : this.similarSerials;
    },
    correctTitle(){
      return this.category == "movie" ? 'фильмы':'сериалы'
    }
  },
  watch: {
    cardId: {
      immediate: true,
      handler: function () {
        this.getData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.card__details {
  &-similar {
    background-color: #1f1f1f;
    margin-top: 2rem;
    padding-top: 1rem;
  }
  &-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
