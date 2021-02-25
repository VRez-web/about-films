<template>
  <section class="card__details-about">
    <div class="container">
      <h2 class="card__details-title">В главных ролях</h2>
      <div class="card__details-cast">
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="item in cast"
            :key="item.id"
            class="card__details-cast-item swiper-slide-cast"
          >
            <img :src="imgProfile + item.profile_path" :alt="item.name" />
            <p class="card__details-cast-title">{{ item.name }}</p>
            <p class="card__details-cast-character">{{ item.character }}</p>
          </swiper-slide>
          <swiper-slide class="card__details-cast-more"
            ><p>Смотреть еще</p>
            <i class="icofont-arrow-right"></i
          ></swiper-slide>
          <div class="prev"></div>
          <div class="next"></div>
        </swiper>
        <a href="" class="all-cast link">Полный актёрский и съёмочный состав</a>
      </div>
    </div>
  </section>
  <section class="card__details-similar">
    <div class="container">
      <h2 class="card__details-title">Похожие фильмы</h2>
      <swiper
        :slides-per-view="6"
        :space-between="20"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in similarMovies" :key="item.id">
          <card :data="[item]" />
        </swiper-slide>
        <div class="prev"></div>
        <div class="next"></div>
      </swiper>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
// import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../Card";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
export default {
  props: { cardId: String, cast: Array },
  components: { Swiper, SwiperSlide, card },
  data() {
    return {
      imgUrl: this.$store.getters.IMG_URL,
      imgProfile: this.$store.state.imgProfileSize,
      similarMovies: [],
    };
  },
  methods: {
    ...mapActions(["GET_MOVIE_SIMILAR"]),
  },
  computed: {
    getSimilarMovies() {
      this.GET_MOVIE_SIMILAR(this.cardId).then((res) => {
        this.similarMovies = res.results.slice(0, 9);
      });
    },
  },
  mounted() {
    // Получение всех картинок связанных с фильмом
    // this.GET_MOVIE_IMAGES(this.cardId).then((res) => {
    //   this.images = res.backdrops;
    // });
    this.getSimilarMovies
  },
  updated(){
    this.getSimilarMovies
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  &-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-white;
  }
  &-cast {
    &-item {
      width: 20%;
      text-align: center;
      img {
        border-radius: 0.625rem;
      }
    }

    &-character {
      padding: 0 1.5rem;
      line-height: 20px;
    }
    &-more {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 1.3rem;
    }
  }
  &-similar {
    background-color: #1f1f1f;
    margin-top: 2rem;
    padding-top: 1rem;
  }
}
.all-cast {
  font-size: 1.2rem;
  margin-top: 1rem;
}
.card__details-about {
  color: $color-white;

  &-title {
    margin: 1rem 0;
  }
}
</style>