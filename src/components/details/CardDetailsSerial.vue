<template>
  <main>
    <section class="card__details">
      <card-details-header
        :dateAnnounce="dateAnnounce"
        :title="cardDetails.name"
        :status="cardDetails.status"
        :age="age"
        :dateRelease="dateRelease"
        :genres="genres"
        :time="serialTime"
      />
      <div class="container">
        <div class="card__details-inner">
          <div class="card__details-img-wrapper">
            <img
              :src="checkPoster(cardDetails.poster_path)"
              :alt="cardDetails.name"
              class="card__details-img"
            />
          </div>
          <div class="card__details-description-wrapper-second">
            <div class="card__details-rating-wrapper">
              <div class="card__details-rating">
                <h2>Рейтинг</h2>
                <p :class="checkVote(rating)">
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
                rel="noopener"
                class="card__details-homepage link-hover"
                >Официальная страница</a
              >
              <button
                class="card__details-trailer-btn link-hover"
                @click="showTrailer = true"
                :disabled="!trailerKey"
              >
                <i class="icon-play"></i> Трейлер
              </button>

              <div class="links-social">
                <a
                  :href="`https://www.facebook.com/${socialLinks.facebook_id}`"
                  target="_blank"
                  rel="noopener"
                  v-show="!!socialLinks.facebook_id"
                  ><i class="icon-facebook"></i
                ></a>
                <a
                  :href="`https://www.instagram.com/${socialLinks.instagram_id}`"
                  target="_blank"
                  rel="noopener"
                  v-show="!!socialLinks.instagram_id"
                  ><i class="icon-instagram"></i
                ></a>
                <a
                  :href="`https://www.twitter.com/${socialLinks.twitter_id}`"
                  target="_blank"
                  rel="noopener"
                  v-show="!!socialLinks.twitter_id"
                  ><i class="icon-twitter"></i
                ></a>
              </div>
            </div>
            <!-- <div class="card__details-current-season">
              <h2 class="card__details-title">Текущий сезон</h2>
              <div class="card__details-current-season-wrapper">
                <div class="card__details-current-season-img">
                  <img
                    :src="imgUrlSmall + currentSeason.poster_path"
                    :alt="currentSeason.name"
                  />
                </div>
                <div class="card__details-current-season-content">
                  <p>{{ currentSeason.name }}</p>
                  <div>
                    <span>{{ currentSeasonDate }}</span
                    >| <span>{{ currentSeason.episode_count }} эпизодов</span>
                  </div>
                  <a href="#" class="link" v-if="cardDetails.seasons.length > 1"
                    >Смотреть все сезоны</a
                  >
                </div>
              </div>
            </div> -->
          </div>
          <div class="card__details-description">
            <div class="card__details-description-wrapper">
              <h2 class="card__details-description-title">Сюжет</h2>
              <p class="card__details-plot">{{ cardDetails.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <card-details-short-cast :cardId="id" :cast="cast" :category="'serial'" />
    <card-details-similar :cardId="id" :category="'serial'" />
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
import { checkPoster, checkVote } from "@/utils/commonFunctions";

export default {
  components: { cardDetailsSimilar, cardDetailsHeader, cardDetailsShortCast },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      cardDetails: {},
      dateAnnounce: "",
      dateRelease: "",
      age: "",
      country: "",
      cast: [],
      genres: [],
      keyPhrase: "",
      socialLinks: [],
      rating: "",
      votes: "",
      showTrailer: false,
      trailersTotal: [],
      serialTime: 0,
      imgUrlSmall: this.$store.state.imgUrlSmall,
      currentSeason: null,
      currentSeasonDate: null,
    };
  },
  methods: {
    ...mapActions("serialsDetails", ["GET_SERIAL_DETAILS"]),
    // Получение общей информации о сериале
    async getSerialData() {
      this.cardDetails = await this.GET_SERIAL_DETAILS(this.id);
      this.dateAnnounce = this.cardDetails.first_air_date.slice(0, 4);
      this.genres = this.cardDetails.genres.slice(0, 3);
      this.keyPhrase = this.cardDetails.tagline;
      this.cast = this.cardDetails.credits.cast;
      this.socialLinks = this.cardDetails.external_ids;
      this.rating = this.cardDetails.vote_average;
      this.votes = this.cardDetails.vote_count;
      this.trailersTotal = this.cardDetails.videos.results;
      this.serialTime = this.cardDetails.episode_run_time[0];
      this.dateRelease = this.cardDetails.last_air_date;
      this.age = this.cardDetails.content_ratings.results.filter(
        (el) => el.iso_3166_1 == "RU" || el.iso_3166_1 == "US"
      );
      if (!!this.age.length) {
        this.age = this.age[0].rating;
      } else {
        this.age = "";
      }

      // this.currentSeason =
      //   this.cardDetails.seasons[this.cardDetails.seasons.length - 1];
      // this.currentSeasonDate = this.currentSeason.air_date.slice(0, 4);
    },
  },
  computed: {
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
    correctRating() {
      return this.rating == 0 ? (this.rating = "NR") : this.rating;
    },
    checkVote() {
      return checkVote;
    },
    checkPoster() {
      return checkPoster;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler: function () {
        !!this.id ? this.getSerialData() : "";
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
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &-current-season {
    margin-top: 2rem;

    &-wrapper {
      display: flex;
    }

    &-img {
      width: 15%;

      img {
        border-radius: 0.313rem;
        width: 100%;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 1rem;
      font-size: 1.2rem;

      .link {
        font-size: 1.2rem;
      }
    }
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
  &-links {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
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
