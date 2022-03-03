<template>
  <section class="details__similar">
    <div class="container">
      <h2 class="details__similar-title">Похожие {{ correctTitle }}</h2>
      <div class="slider">
        <swiper
            :navigation="{
        nextEl: `.next-similar`,
        prevEl: `.prev-similar`,
      }"
            :breakpoints="sliderBreakpoints"
            :space-between="20"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            id="similar"
        >
          <swiper-slide v-for="item in model">
            <Card :model="item" :media-type="category"/>
          </swiper-slide>
        </swiper>
        <div
            class="swiper-button swiper-button-prev"
            :class="`prev-similar`"
            :style="sliderStyles"
        ></div>
        <div
            class="swiper-button swiper-button-next"
            :class="`next-similar`"
            :style="sliderStyles"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import SwiperCore, {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper.scss";
import Card from "@/components/Card";

SwiperCore.use([Navigation]);
export default {
  components: {
    Card,
    Swiper,
    SwiperSlide
  },
  props: {
    category: String,
    model: Array
  },
  data() {
    return {
      sliderStyles: {
        background: `url(${require("@/assets/img/right-arrow.svg")})center/cover no-repeat`,
      },
      sliderBreakpoints: {
        1500: {
          slidesPerView: 8,
        },
      },
    };
  },
  computed: {
    correctTitle() {
      return this.category === "movie" ? "фильмы" : "сериалы";
    },
  },
  methods: {
    onSwiper(swiper) {
    },
    onSlideChange() {
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/slider";

.details__similar {
  margin: 2rem 0;

  &-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
