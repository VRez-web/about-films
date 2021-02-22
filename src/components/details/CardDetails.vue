<template>
  <section class="card__details">
    <div class="container">
      <h2 class="card__details-title">
        {{ cardDetails.title }} <span>({{ dataAnnounce }})</span>
      </h2>
      <p class="card__details-subtitle">
        <span class="card__details-age">{{ cardDetailsAge }} </span>
        <span class="card__details-realese">{{ dataRelease }}(RU)</span>
        <span class="card__details-genres"
          ><span v-for="genre in cardDetailsGenres" :key="genre.id">{{
            genre.name
          }}</span></span
        >
        <span class="card__details-time"
          ><i class="icofont-clock-time"></i
        ></span>
      </p>
      <div class="card__details-inner">
        <img
          :src="imgUrl + cardDetails.poster_path"
          alt=""
          class="card__details-img"
        />
        <div class="card__details-description">
          <h2 class="card__details-description-title">Сюжет</h2>
          <p class="card__details-about">{{ cardDetailsAbout }}</p>
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
          <p
            class="card__details-phrase"
            :class="cardDetails.tagline == '' ? 'hidden' : ''"
          >
            {{ cardDetailsPhrase }}
          </p>
          <div class="card__details-links">
            <a
              :href="cardDetails.homepage"
              target="_blank"
              class="card__details-homepage"
              >Официальная страница</a
            >
            <button class="card__details-trailer">Трейлер</button>

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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cardDetails: [],
      imgUrl: this.$store.getters.IMG_URL,
      cardId: this.$route.params.id,
      fullimgUrlSize: this.$store.state.fullimgUrlSize,
      images: {},
      dataAnnounce: "",
      dataRelease: "",
      cardDetailsAge: "",
      cardDetailsAbout: "",
      cardDetailsGenres: [],
      cardDetailsPhrase: "",
      cardDetailsLinks: [],
      cardDetailsRating: "",
      cardDetailsVotes: "",
    };
  },
  methods: {
    ...mapActions([
      "GET_CARD_DETAILS",
      "GET_MOVIE_IMAGES",
      "GET_MOVIE_DATES",
      "GET_MOVIE_LINKS",
    ]),
  },
  computed: {},
  mounted() {
    this.GET_CARD_DETAILS(this.cardId).then((res) => {
      this.cardDetails = res;
      this.dataAnnounce = res.release_date.slice(0, 4);
      this.cardDetailsAbout = res.overview;
      this.cardDetailsGenres = res.genres.slice(0, 3);
      this.cardDetailsPhrase = res.tagline;

      this.cardDetailsPhrase.slice(0, 1) != "«" &&
      this.cardDetailsPhrase.slice(-1) != "»"
        ? (this.cardDetailsPhrase = `«${this.cardDetailsPhrase}»`)
        : "";

      this.cardDetailsRating = res.vote_average;
      this.cardDetailsVotes = res.vote_count;
      console.log(res);
    });
    this.GET_MOVIE_IMAGES(this.cardId).then((res) => {
      this.images = res.backdrops;
    });
    this.GET_MOVIE_DATES(this.cardId).then((res) => {
      res.results.forEach((item) => {
        if (item.iso_3166_1 == "RU") {
          this.dataRelease = item.release_dates[0].release_date
            .slice(0, 10)
            .replace(/-/g, "/");
          this.dataRelease = `${this.dataRelease.slice(
            8,
            10
          )}/${this.dataRelease.slice(5, 7)}/${this.dataRelease.slice(0, 4)}`;

          this.cardDetailsAge = item.release_dates[0].certification;
          this.cardDetailsAge == ""
            ? (this.cardDetailsAge = "?__?")
            : this.cardDetailsAge;
        }
      });
    });
    this.GET_MOVIE_LINKS(this.cardId).then((res) => {
      this.cardDetailsLinks = res;
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  margin-top: -30px;
  padding: 2rem 0;
  color: $color-white;
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
  }
  &-title {
    font-size: 2rem;
    margin-bottom: 0.625rem;
    font-weight: 700;
    span {
      font-weight: 300;
      font-size: 1.4rem;
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
  &-about {
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
    align-items: flex-end;

    &-social {
      a {
        color: inherit;
        font-size: 1.5rem;
        border: 2px solid transparent;
        border-radius: 50%;
        padding: 0 3px 0 3px;
        transition: all 0.4s linear;
        &:hover {
          color: $color-tematic;
          border-color: $color-tematic;
        }
      }
    }
  }
  &-homepage {
    color: inherit;
    position: relative;
    padding: 0.625rem;
    transition: all 0.3s 0.6s ease;
    border-radius: 0.313rem;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 20%;
      height: 20%;
      border: 3px solid;
      transition: all 0.6s ease;
      border-radius: 0.313rem;
    }

    &::after {
      bottom: 0;
      right: 0;
      border-top-color: transparent;
      border-left-color: transparent;
      border-bottom-color: $bg-links;
      border-right-color: $bg-links;
    }
    &::before {
      top: 0;
      left: 0;
      border-bottom-color: transparent;
      border-right-color: transparent;
      border-top-color: $bg-links;
      border-left-color: $bg-links;
    }
    &:hover {
      background-color: $bg-links;
      &::after,
      &::before {
        width: 100%;
        height: 100%;
      }
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
}
</style>