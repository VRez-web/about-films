<template>
  <main>
    <section class="card__details">
      <card-details-header
        :data="cardDetails"
        :dateAnnounce="dateAnnounce"
        :age="age"
        :dateRelease="dateRelease"
        :genres="genres"
        :time="movieTime"
      />
      <div class="container">
        <div class="card__details-inner">
          <img
            :src="
              cardDetails.poster_path
                ? imgUrl + cardDetails.poster_path
                : require('@/assets/img/no-poster.jpg')
            "
            alt=""
            class="card__details-img"
          />
          <div class="card__details-description">
            <h2 class="card__details-description-title">Сюжет</h2>
            <p class="card__details-plot">{{ plot }}</p>
            <div class="card__details-rating-wrapper">
              <div class="card__details-rating">
                <h2>Рейтинг</h2>
                <p :class="checkRating">
                  {{ correctRating }}
                </p>
              </div>
              <div class="card__details-votes">
                <h2>Голосов</h2>
                <p>{{ votes }}</p>
              </div>
            </div>
            <p class="card__details-phrase" v-if="!!cardDetails.tagline">
              {{ phrase }}
            </p>
            <div class="card__details-links">
              <a
                :href="cardDetails.homepage"
                target="_blank"
                class="card__details-homepage link-hover"
                >Официальная страница</a
              >
              <button
                class="card__details-trailer-btn link-hover"
                @click="showTrailer = true"
                :disabled="!trailerKey"
              >
                <i class="icofont-ui-play"></i> Трейлер
              </button>

              <div class="card__details-links-social">
                <a
                  :href="`https://www.facebook.com/${socialLinks.facebook_id}`"
                  target="_blank"
                  ><i class="icofont-facebook"></i
                ></a>
                <a
                  :href="`https://www.instagram.com/${socialLinks.instagram_id}`"
                  target="_blank"
                  ><i class="icofont-instagram"></i
                ></a>
                <a
                  :href="`https://www.twitter.com/${socialLinks.twitter_id}`"
                  target="_blank"
                  ><i class="icofont-twitter"></i
                ></a>
              </div>
            </div>
            <a href="#" class="card__details-scroll link">Подробнее</a>
          </div>
        </div>
      </div>
    </section>
    <card-details-short-cast :cardId="cardId" :castSlider="cast" />
    <card-details-similar :cardId="cardId" :category="category"/>
  </main>
  <div
    class="card__details-trailer"
    v-if="showTrailer"
    @click="showTrailer = !showTrailer"
  >
    <span class="card__details-trailer-close link">Назад</span>
    <div class="card__details-trailer-wrapper">
      <iframe
        :src="`https://www.youtube.com/embed/${trailerKey}`"
        width="750px"
        height="500px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import cardDetailsShortCast from "./CardDetailsShortCast";
import cardDetailsHeader from "./CardDetailsHeader";
import cardDetailsSimilar from "./CardDetailsSimilar";
export default {
  components: { cardDetailsSimilar, cardDetailsHeader, cardDetailsShortCast },
  data() {
    return {
      cardDetails: [],
      imgUrl: this.$store.state.imgUrl,
      dateAnnounce: "",
      dateRelease: "",
      age: "",
      plot: "",
      genres: [],
      keyPhrase: "",
      socialLinks: [],
      rating: "",
      votes: "",
      showTrailer: false,
      trailersTotal: [],
      cast: [],
      movieTime: 0,
    };
  },
  methods: {
    ...mapActions(["GET_CARD_DETAILS_MOVIE", "GET_CARD_DETAILS_SERIAL"]),

    // Получение общей информации о фильме
    async getMovieData() {
      const CARD_DETAILS_MOVIE = await this.GET_CARD_DETAILS_MOVIE(this.cardId);
      this.cardDetails = CARD_DETAILS_MOVIE;
      this.dateAnnounce = this.cardDetails.release_date.slice(0, 4);
      this.plot = this.cardDetails.overview;
      this.genres = this.cardDetails.genres.slice(0, 3);
      this.keyPhrase = this.cardDetails.tagline;
      this.cast = this.cardDetails.credits.cast.slice(0, 9);
      this.socialLinks = this.cardDetails.external_ids;
      this.rating = this.cardDetails.vote_average;
      this.votes = this.cardDetails.vote_count;
      this.trailersTotal = this.cardDetails.videos.results;
      this.movieTime = this.cardDetails.runtime;
      // Работа с датой => нахождение нужной даты в массиве,обработка случая если нет нужной даты и тд
      // если это делать вне получение данных ошибки вылезают

      // Проверка есть ли дата, потому что оттуда можно получить данные о возрастных ограничениях фильма
      this.dateRelease = this.cardDetails.release_dates.results.filter(
        (el) => el.iso_3166_1 == "RU"
      )[0];

      if (this.dateRelease) {
        this.age = this.dateRelease.release_dates[0].certification;
        this.dateRelease = `${this.dateRelease.release_dates[0].release_date.slice(
          8,
          10
        )}/${this.dateRelease.release_dates[0].release_date.slice(
          5,
          7
        )}/${this.dateRelease.release_dates[0].release_date.slice(0, 4)}`;
      } else {
        this.dateRelease = this.cardDetails.release_date;
      }
    },

    // Получение общей информации о сериале
    async getSerialData() {
      const CARD_DETAILS_SERIAL = await this.GET_CARD_DETAILS_SERIAL(
        this.cardId
      );
      this.cardDetails = CARD_DETAILS_SERIAL;
      this.dateAnnounce = this.cardDetails.first_air_date.slice(0, 4);
      this.plot = this.cardDetails.overview;
      this.genres = this.cardDetails.genres.slice(0, 3);
      this.keyPhrase = this.cardDetails.tagline;
      this.cast = this.cardDetails.credits.cast.slice(0, 9);
      this.socialLinks = this.cardDetails.external_ids;
      this.rating = this.cardDetails.vote_average;
      this.votes = this.cardDetails.vote_count;
      this.trailersTotal = this.cardDetails.videos.results;
      this.movieTime = this.cardDetails.episode_run_time[0];
      this.dateRelease = this.cardDetails.last_air_date;
    },

    getData() {
      return this.category == "movie"
        ? this.getMovieData()
        : this.getSerialData();
    },
  },
  computed: {
    cardId() {
      return this.$route.params.id;
    },
    trailerKey() {
      return this.trailersTotal.length
        ? this.cardDetails.videos.results[0].key
        : "";
    },
    phrase() {
      return this.keyPhrase.slice(0, 1) != "«" &&
        this.keyPhrase.slice(-1) != "»"
        ? (this.keyPhrase = `«${this.keyPhrase}»`)
        : "";
    },
    category() {
      return this.$route.params.category;
    },
    checkRating() {
      return {
        "high-rating": this.rating >= 7,
        "mid-rating": this.rating < 7 && this.rating > 4,
        "low-rating": this.rating > 1 && this.rating < 4,
        "no-rating": this.rating == "NR",
      };
    },
    correctRating() {
      return this.rating == 0 ? (this.rating = "NR") : this.rating;
    },
  },
  watch: {
    cardId: {
      immediate: true,
      handler: function () {
        !!this.cardId ? this.getData() : "";
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  margin-top: -30px;
  padding: 2rem 0;
  &-inner {
    display: flex;
    justify-content: space-between;
  }
  &-img {
    max-width: 350px;
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.938rem;
    box-shadow: 0px 0px 15px 0px rgba(0, 255, 255, 0.75);
  }
  &-description {
    width: 65%;

    &-title {
      font-size: 2rem;
      margin: 1rem 0;
    }
  }
  &-plot {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
  &-links {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    &-social {
      a {
        color: inherit;
        font-size: 1.5rem;
        border: 2px solid transparent;
        border-radius: 50%;
        padding: 0 3px 0 3px;
        transition: all 0.4s linear;

        &:nth-child(2) {
          margin: 0 0.625rem;
        }
        &:hover {
          color: $color-tematic;
          border-color: $color-tematic;
        }
      }
    }
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    &-btn {
      background-color: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      font-size: 1rem;
      text-align: center;
      i {
        opacity: 0;
        margin-left: -0.875rem;
        transition: all 0.3s linear;
      }

      &:hover {
        i {
          opacity: 1;
          margin-left: 0;
        }
      }

      &:disabled {
        opacity: 0.4;
        border: 1px solid #466296;
        &::before,
        &::after {
          display: none;
        }

        &:hover {
          cursor: auto;
          background-color: transparent;
          i {
            opacity: 0;
            margin-left: -0.875rem;
          }
        }
      }
    }

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
</style>