<template>
  <div>
    <div class="slider">
      <swiper
          :navigation="{
        nextEl: `.next-${id}`,
        prevEl: `.prev-${id}`,
      }"
          :breakpoints="sliderBreakpoints"
          :space-between="20"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :id="id"
      >
        <swiper-slide
            v-for="(item, i) in model" :key="i">
          <Card :model="item"/>
        </swiper-slide>
        <swiper-slide>
          <router-link to="to">
            Посмотреть все
          </router-link>
        </swiper-slide>
      </swiper>
      <div
          class="swiper-button swiper-button-prev"
          :class="`prev-${id}`"
          :style="sliderStyles"
      ></div>
      <div
          class="swiper-button swiper-button-next"
          :class="`next-${id}`"
          :style="sliderStyles"
      ></div>
    </div>
  </div>
</template>

<script>
import SwiperCore, {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper.scss";
import Card from '@/components/Card'

SwiperCore.use([Navigation]);
export default {
  components: {Swiper, SwiperSlide, Card},
  props: {
    id: String,
    model: Array,
  },
  data() {
    return {
      imgUrl: this.$store.state.backdropBig,
      sliderStyles: {
        background: `url(${require("@/assets/img/right-arrow.svg")})center/cover no-repeat`,
      },
      sliderBreakpoints: {
        1600: {
          slidesPerView: 8,
        },
        1200: {
          slidesPerView: 6,
        },
        800: {
          slidesPerView: 4,
        },
        500: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 1,
        }
      },
    };
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
@import "/src/assets/scss/components/slider";
</style>
