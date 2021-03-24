<template>
  <section class="card__details-similar">
    <div class="container">
      <h2 class="card__details-title">Похожие фильмы</h2>
      <slider :data="similarMovies" :category="'movie'"/>
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
  },
  data() {
    return {
      similarMovies: [],
      similarSerials: [],
    };
  },
  methods: {
    ...mapActions(["GET_MOVIE_SIMILAR"]),
    async getSimilarMovies() {
      const MOVIE_SIMILAR = await this.GET_MOVIE_SIMILAR(this.cardId);
      this.similarMovies = MOVIE_SIMILAR.results.slice(0, 9);
    },

  },
  watch: {
    cardId: {
      immediate: true,
      handler: function () {
        this.getSimilarMovies();
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