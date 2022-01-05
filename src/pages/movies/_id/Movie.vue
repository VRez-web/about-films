<template>
  <AppLoader v-if="movie === null"/>
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
            <DetailsLinks :socials="socials"/>
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
    <!--           <card-details-short-cast-->
    <!--               :cardId="id"-->
    <!--               :castSlider="cast"-->
    <!--               :category="'movie'"-->
    <!--           />-->
    <!--       <card-details-similar :cardId="id" :category="'movie'"/>-->
  </main>
  <!--  <div-->
  <!--      class="card__details-trailer"-->
  <!--      v-if="showTrailer"-->
  <!--      @click="showTrailer = !showTrailer"-->
  <!--  >-->
  <!--    <span class="card__details-trailer-close link">Назад</span>-->
  <!--    <div class="card__details-trailer-wrapper">-->
  <!--      <iframe-->
  <!--          :src="`https://www.youtube.com/embed/${trailerKey}`"-->
  <!--          width="750px"-->
  <!--          height="500px"-->
  <!--          frameborder="0"-->
  <!--          allowfullscreen-->
  <!--      ></iframe>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import DetailsHeader from "@/components/details/base/DetailsHeader";
import {checkPoster, checkVote} from "@/utils/commonFunctions";
import {getMoviesDetails} from "@/services/movies";
import AppLoader from "@/components/app/AppLoader";
import DetailsLinks from "@/components/details/base/DetailsLinks";
import DetailsCast from "@/components/details/DetailsCast";

export default {
  components: {
    DetailsLinks,
    AppLoader,
    DetailsHeader,
    DetailsCast
  },
  data() {
    return {
      movie: null,
    };
  },
  created() {
    this.getMovieDetails()
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/_vars.scss";

.card__details {
  margin-top: -30px;
  padding: 2rem 0;

  &-inner {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &-img {
    max-width: 350px;
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.938rem;
    box-shadow: 0px 0px 15px 0px rgba(0, 255, 255, 0.75);

    &-wrapper {
      width: 20%;
    }
  }

  &-description {
    width: 100%;

    &-title {
      font-size: 2rem;
      margin: 1rem 0;
    }

    &-wrapper-second {
      width: 60%;
      margin-left: 10rem;
    }
  }

  &-plot {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }

  &-trailer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-black, 0.5);
    z-index: 9999;

    &-close {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
      font-size: 1.3rem;
    }
  }

  &-phrase {
    margin-top: 1rem;
    color: rgba($color-white, 0.5);
  }

  &-rating-wrapper {
    margin-top: 1rem;
    display: flex;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.625rem;
    }
  }

  &-rating {
    p {
      text-align: center;
      font-size: 1.3rem;
      padding: 0.313rem 0;

      &.high-rating {
        background-color: $bg-highRating;
      }

      &.mid-rating {
        background-color: $bg-midRating;
      }

      &.low-rating {
        background-color: $bg-lowRating;
      }

      &.no-rating {
        background-color: $bg-noRating;
      }
    }
  }

  &-votes {
    margin-left: 1rem;

    p {
      font-size: 1.3rem;
      text-align: center;
      padding: 0.313rem 0;
      color: rgba($color-white, 0.5);
    }
  }

  &-scroll {
    margin-top: 2rem;
  }
}

@media (max-width: 1100px) {
  .card__details {
    &-description {
      &-wrapper-second {
        width: 70%;
        margin-left: 5rem;
      }
    }

    &-links {
      width: 100%;
    }
  }
}

@media (max-width: 950px) {
  .card__details {
    &-inner {
      justify-content: space-between;
    }

    &-img-wrapper {
      img {
        min-width: 250px;
      }
    }

    &-description {
      &-wrapper-second {
        width: auto;
        margin-left: 0rem;
      }
    }

    &-links {
      width: 90%;
      flex-wrap: wrap;

      .links-social {
        margin-top: 1rem;
      }
    }
  }
}

@media (max-width: 850px) {
  .card__details {
    &-img-wrapper {
      width: 35%;

      img {
        min-width: auto;
        max-width: 250px;
      }
    }

    &-description {
      &-wrapper-second {
        width: 60%;
      }
    }

    &-links {
      width: 100%;
    }
  }
}

@media (max-width: 610px) {
  .card__details {
    &-trailer-btn {
      margin-top: 0.5rem;
    }
  }
}

@media (max-width: 500px) {
  .card__details {
    &-img-wrapper {
      width: 40%;
    }

    &-description {
      &-wrapper-second {
        width: 50%;
      }
    }

    &-links {
      flex-direction: column;
      align-items: flex-start;
    }

    &-trailer-btn {
      order: -1;
      margin: 0 0 0.5rem 0;
    }
  }
}

@media (max-width: 400px) {
  .card__details {
    &-img-wrapper {
      width: 100%;

      img {
        margin: 0 auto;
      }
    }

    &-description {
      &-wrapper-second {
        width: 100%;
        margin: 1rem 0;
      }
    }

    &-links {
      flex-direction: row;
      align-items: normal;
    }

    &-plot {
      font-size: 1rem;
      text-align: center;
    }
  }
}
</style>
