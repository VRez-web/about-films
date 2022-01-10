<template>
  <AppLoader v-if="movie === null && similarMovies === null"/>
  <main v-else>
    <section class="card__details">
      <DetailsHeader :model="movie"/>
      <div class="container">
        <div class="card__details-inner">
          <div class="card__details-img-wrapper">
            <img
                :src="checkPoster(movie.poster_path)"
                alt=""
                class="card__details-img"
            />
          </div>
          <div class="card__details-description-wrapper-second">
            <div class="card__details-rating-wrapper">
              <div class="card__details-rating">
                <h2>Рейтинг</h2>
                <p :class="checkVote(movie.vote_average)">
                  {{ rating }}
                </p>
              </div>
              <div class="card__details-votes">
                <h2>Голосов</h2>
                <p>{{ movie.vote_count }}</p>
              </div>
            </div>
            <p class="card__details-phrase" v-if="!!movie.tagline">
              «{{ movie.tagline }}»
            </p>
            <DetailsLinks :socials="socials" @show-trailer="isShowTrailers = true"/>
          </div>
          <div class="card__details-description">
            <div class="card__details-description-wrapper">
              <h2 class="card__details-description-title">Сюжет</h2>
              <p class="card__details-plot">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <DetailsCast :id="movie.id" :cast="movie.credits.cast"/>
    <DetailsSimilar :model="similarMovies" :category="'movie'"/>
  </main>
  <ModalTrailers
      v-if="isShowTrailers"
      :model="movie.videos.results"
      @close="isShowTrailers = false"/>
</template>

<script>
import DetailsHeader from "@/components/details/DetailsHeaderMovie";
import {checkPoster, checkVote} from "@/utils/commonFunctions";
import {getMoviesDetails, getMoviesSimilar} from "@/services/movies";
import AppLoader from "@/components/app/AppLoader";
import DetailsLinks from "@/components/details/base/DetailsLinks";
import DetailsCast from "@/components/details/DetailsCast";
import DetailsSimilar from "@/components/details/DetailsSimilar";
import ModalTrailers from "@/components/modal/ModalTrailers";

export default {
  components: {
    ModalTrailers,
    DetailsLinks,
    AppLoader,
    DetailsHeader,
    DetailsCast,
    DetailsSimilar
  },
  data() {
    return {
      movie: null,
      similarMovies: null,
      isShowTrailers: false
    };
  },
  created() {
    this.getMovieDetails()
    this.getMovieSimilar()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: function () {
        if (this.$route.params.id) {
          this.getMovieDetails()
          this.getMovieSimilar()
        }
      },
    }
  },
  computed: {
    rating() {
      return this.movie.vote_average === 0 ? 'NR' : this.movie.vote_average
    },

    socials() {
      return {homepage: this.movie.homepage, trailer: this.movie.videos.results, ...this.movie.external_ids}
    }
  },
  methods: {
    checkPoster,
    checkVote,

    async getMovieDetails() {
      const movieDetails = await getMoviesDetails(this.$route.params.id)
      this.movie = movieDetails.data
    },

    async getMovieSimilar() {
      const similarMovies = await getMoviesSimilar(this.$route.params.id)
      this.similarMovies = similarMovies.data.results
    }
  }
};
</script>
