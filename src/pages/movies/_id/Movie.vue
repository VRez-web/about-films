<template>
  <AppLoader v-if="movie === null"/>
  <main v-else>
    <section class="card__details">
      <DetailsHeader :model="movie"/>
<!--           <div class="container">&ndash;&gt;-->
<!--             <div class="card__details-inner">&ndash;&gt;-->
<!--               <div class="card__details-img-wrapper">&ndash;&gt;-->
<!--                 <img&ndash;&gt;-->
<!--                     :src="checkPoster(cardDetails.poster_path)"&ndash;&gt;-->
<!--                     alt=""&ndash;&gt;-->
<!--                     class="card__details-img"&ndash;&gt;-->
<!--                 />&ndash;&gt;-->
<!--               </div>&ndash;&gt;-->
<!--               <div class="card__details-description-wrapper-second">&ndash;&gt;-->
<!--                 <div class="card__details-rating-wrapper">&ndash;&gt;-->
<!--                   <div class="card__details-rating">&ndash;&gt;-->
<!--                     <h2>Рейтинг</h2>&ndash;&gt;-->
<!--                     <p :class="checkVote(rating)">&ndash;&gt;-->
<!--                       {{ correctRating }}&ndash;&gt;-->
<!--                     </p>&ndash;&gt;-->
<!--                   </div>&ndash;&gt;-->
<!--                   <div class="card__details-votes">&ndash;&gt;-->
<!--                     <h2>Голосов</h2>&ndash;&gt;-->
<!--                     <p>{{ votes }}</p>&ndash;&gt;-->
<!--                   </div>&ndash;&gt;-->
<!--                 </div>&ndash;&gt;-->
<!--                 <p class="card__details-phrase" v-if="!!cardDetails.tagline">&ndash;&gt;-->
<!--                   {{ phrase }}&ndash;&gt;-->
<!--                 </p>&ndash;&gt;-->
<!--                 <div class="card__details-links">&ndash;&gt;-->
<!--                   <a&ndash;&gt;-->
<!--                       :href="cardDetails.homepage"&ndash;&gt;-->
<!--                       target="_blank"&ndash;&gt;-->
<!--                       rel="noopener"&ndash;&gt;-->
<!--                       class="card__details-homepage link-hover"&ndash;&gt;-->
<!--                   >Официальная страница</a&ndash;&gt;-->
<!--                   >&ndash;&gt;-->
<!--                   <button&ndash;&gt;-->
<!--                       class="card__details-trailer-btn link-hover"&ndash;&gt;-->
<!--                       @click="showTrailer = true"&ndash;&gt;-->
<!--                       :disabled="!trailerKey"&ndash;&gt;-->
<!--                   >&ndash;&gt;-->
<!--                     <i class="icon-play"></i> Трейлер&ndash;&gt;-->
<!--                   </button>&ndash;&gt;-->

<!--                   <div class="links-social">&ndash;&gt;-->
<!--                     <a&ndash;&gt;-->
<!--                         :href="`https://www.facebook.com/${socialLinks.facebook_id}`"&ndash;&gt;-->
<!--                         target="_blank"&ndash;&gt;-->
<!--                         rel="noopener"&ndash;&gt;-->
<!--                         v-show="!!socialLinks.facebook_id"&ndash;&gt;-->
<!--                     ><i class="icon-facebook"></i&ndash;&gt;-->
<!--                     ></a>&ndash;&gt;-->
<!--                     <a&ndash;&gt;-->
<!--                         :href="`https://www.instagram.com/${socialLinks.instagram_id}`"&ndash;&gt;-->
<!--                         target="_blank"&ndash;&gt;-->
<!--                         rel="noopener"&ndash;&gt;-->
<!--                         v-show="!!socialLinks.instagram_id"&ndash;&gt;-->
<!--                     ><i class="icon-instagram"></i&ndash;&gt;-->
<!--                     ></a>&ndash;&gt;-->
<!--                     <a&ndash;&gt;-->
<!--                         :href="`https://www.twitter.com/${socialLinks.twitter_id}`"&ndash;&gt;-->
<!--                         target="_blank"&ndash;&gt;-->
<!--                         rel="noopener"&ndash;&gt;-->
<!--                         v-show="!!socialLinks.twitter_id"&ndash;&gt;-->
<!--                     ><i class="icon-twitter"></i&ndash;&gt;-->
<!--                     ></a>&ndash;&gt;-->
<!--                   </div>&ndash;&gt;-->
<!--                 </div>&ndash;&gt;-->
<!--               </div>&ndash;&gt;-->
<!--               <div class="card__details-description">&ndash;&gt;-->
<!--                 <div class="card__details-description-wrapper">&ndash;&gt;-->
<!--                   <h2 class="card__details-description-title">Сюжет</h2>&ndash;&gt;-->
<!--                   <p class="card__details-plot">{{ plot }}</p>&ndash;&gt;-->
<!--                 </div>&ndash;&gt;-->
<!--               </div>&ndash;&gt;-->
<!--             </div>&ndash;&gt;-->
<!--           </div>&ndash;&gt;-->
    </section>
<!--       <card-details-short-cast&ndash;&gt;-->
<!--           :cardId="id"&ndash;&gt;-->
<!--           :castSlider="cast"&ndash;&gt;-->
<!--           :category="'movie'"&ndash;&gt;-->
<!--       />&ndash;&gt;-->
<!--       <card-details-similar :cardId="id" :category="'movie'"/>&ndash;&gt;-->
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
import DetailsHeader from "@/components/details/DetailsHeader";
import {checkPoster, checkVote} from "@/utils/commonFunctions";
import {getMoviesDetails} from "@/services/movies";
import AppLoader from "@/components/app/AppLoader";

export default {
  components: {
    AppLoader,
    DetailsHeader
  },
  data() {
    return {
      movie: null,
      dateAnnounce: "",
      dateRelease: "",
      age: "",
      country: "",
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
  created() {
    this.getMovieDetails()
  },
  methods: {
    async getMovieDetails() {
      const movieDetails = await getMoviesDetails(this.$route.params.id)
      this.movie = movieDetails.data
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_vars.scss";

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
