<template>
  <main>
    <section class="card__details">
      <div class="container">
        <h2 class="card__details-title">
          <p>
            {{ cardDetails.title }} <span>({{ dataAnnounce }})</span>
          </p>

          <p class="card__details-status">
            Статус: <span> {{ statusProduction }} </span>
          </p>
        </h2>
        <p class="card__details-subtitle">
          <span class="card__details-age">{{ formattedAge }} </span>
          <span class="card__details-realese">{{ dateCheck }} (RU)</span>
          <span class="card__details-genres"
            ><span v-for="genre in cardDetailsGenres" :key="genre.id">{{
              genre.name
            }}</span></span
          >
          <span class="card__details-time"
            >{{ movieTime() }} <i class="icofont-clock-time"></i>
          </span>
        </p>
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
            <p class="card__details-plot">{{ cardDetailsPlot }}</p>
            <div class="card__details-rating-wrapper">
              <div class="card__details-rating">
                <h2>Рейтинг</h2>
                <p
                  :class="
                    cardDetailsRating >= 7
                      ? 'high-rating'
                      : cardDetailsRating < 7 && cardDetailsRating > 3
                      ? 'mid-rating'
                      : cardDetailsRating <= 3
                      ? 'low-rating'
                      : ''
                  "
                >
                  {{ cardDetailsRating }}
                </p>
              </div>
              <div class="card__details-votes">
                <h2>Голосов</h2>
                <p>{{ cardDetailsVotes }}</p>
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
                @click="cardDetailsVideo = true"
                :disabled="!trailerKey"
              >
                <i class="icofont-ui-play"></i> Трейлер
              </button>

              <div class="card__details-links-social">
                <a
                  :href="`https://www.facebook.com/${cardDetailsLinks.facebook_id}`"
                  target="_blank"
                  ><i class="icofont-facebook"></i
                ></a>
                <a
                  :href="`https://www.instagram.com/${cardDetailsLinks.instagram_id}`"
                  target="_blank"
                  ><i class="icofont-instagram"></i
                ></a>
                <a
                  :href="`https://www.twitter.com/${cardDetailsLinks.twitter_id}`"
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
    <card-details-about
      :cardId="cardId"
      :castSlider="cardDetailsCredit"
      :title="cardDetails.title"
    />
  </main>
  <div
    class="card__details-trailer"
    v-if="cardDetailsVideo"
    @click="cardDetailsVideo = !cardDetailsVideo"
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
import cardDetailsAbout from "./CardDetailsAbout";
export default {
  components: { cardDetailsAbout },
  data() {
    return {
      cardDetails: [],
      imgUrl: this.$store.state.imgUrl,
      dataAnnounce: "",
      dataRelease: "",
      cardDetailsAge: "",
      cardDetailsPlot: "",
      cardDetailsGenres: [],
      cardDetailsPhrase: "",
      cardDetailsLinks: [],
      cardDetailsRating: "",
      cardDetailsVotes: "",
      cardDetailsStatus: "",
      cardDetailsVideo: false,
      cardDetailsVideoTotal: [],
      cardDetailsCredit: [],
      cardDetailsMovieTime: 0,
    };
  },
  methods: {
    ...mapActions(["GET_CARD_DETAILS"]),
    async getData() {
      // Получение общей информации о фильме
      const CARD_DETAILS = await this.GET_CARD_DETAILS(this.cardId);
      this.cardDetails = CARD_DETAILS;
      this.dataAnnounce = this.cardDetails.release_date.slice(0, 4);
      this.cardDetailsPlot = this.cardDetails.overview;
      this.cardDetailsGenres = this.cardDetails.genres.slice(0, 3);
      this.cardDetailsPhrase = this.cardDetails.tagline;
      this.cardDetailsCredit = this.cardDetails.credits.cast.slice(0, 9);
      this.cardDetailsLinks = this.cardDetails.external_ids;
      this.cardDetailsRating = this.cardDetails.vote_average;
      this.cardDetailsVotes = this.cardDetails.vote_count;
      this.cardDetailsVideoTotal = this.cardDetails.videos.results;
      this.cardDetailsMovieTime = this.cardDetails.runtime;
      // Работа с датой => нахождение нужной даты в массиве,обработка случая если нет нужной даты и тд
      // если это делать вне получение данных ошибки вылизают
      
      // Проверка есть ли дата, потому что оттуда можно получить данные о возрастных ограничениях фильма
      this.dataRelease = this.cardDetails.release_dates.results.filter(
        (el) => el.iso_3166_1 == "RU"
      )[0];

      if (this.dataRelease) {
        this.cardDetailsAge=this.dataRelease.release_dates[0].certification
        this.dataRelease = `${this.dataRelease.release_dates[0].release_date.slice(
          8,
          10
        )}/${this.dataRelease.release_dates[0].release_date.slice(
          5,
          7
        )}/${this.dataRelease.release_dates[0].release_date.slice(0, 4)}`;
      } else {
        this.dataRelease = this.cardDetails.release_date;
      }

    },
    // Пока что так
    movieTime(time) {
      let result = 0;
      time = this.cardDetailsMovieTime;
      for (let i = 0; 60 <= time; i++) {
        result += 1;
        time -= 60;
      }

      return `${result} ч ${time} м`;
    },
  },
  computed: {
    cardId() {
      return this.$route.params.id;
    },
    trailerKey() {
      return this.cardDetailsVideoTotal.length
        ? this.cardDetails.videos.results[0].key
        : "";
    },
    phrase() {
      return this.cardDetailsPhrase.slice(0, 1) != "«" &&
        this.cardDetailsPhrase.slice(-1) != "»"
        ? (this.cardDetailsPhrase = `«${this.cardDetailsPhrase}»`)
        : "";
    },
    statusProduction() {
      if (this.cardDetails.status == "Released") {
        return (this.cardDetailsStatus = "вышел");
      } else if (this.cardDetails.status == "Post Production") {
        return (this.cardDetailsStatus = "постпроизводство");
      }
      return (this.cardDetailsStatus = "In Production");
    },
    dateCheck() {
      return this.dataRelease
        ? this.dataRelease 
        : this.cardDetails.release_date;
    },

    formattedAge() {
      return this.cardDetailsAge
        ? this.cardDetailsAge
        : (this.cardDetailsAge = "?__?");
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
  mounted() {
    console.log();
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
  &-title {
    font-size: 2rem;
    margin-bottom: 0.625rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    span {
      font-weight: 300;
      font-size: 1.4rem;
    }
  }
  &-status {
    font-size: 1.5rem;

    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.3rem;
    }
  }
  &-subtitle {
    margin-bottom: 1.5rem;
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
  &-age {
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.6);
    padding: 0 0.125rem 0.125rem 0.125rem;
    margin-right: 0.625rem;
    min-width: 35px;
    text-align: center;
  }
  &-genres {
    &::after {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: $color-tematic;
      border-radius: 50%;
      margin: 0 0.625rem;
      vertical-align: middle;
    }
    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: $color-tematic;
      border-radius: 50%;
      margin: 0 0.625rem;
      vertical-align: middle;
    }
    span {
      &:nth-child(2) {
        margin: 0 0.625rem;
      }

      &::after {
        content: ",";
        display: inline-block;
      }
      &:last-child::after {
        content: "";
      }
    }
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