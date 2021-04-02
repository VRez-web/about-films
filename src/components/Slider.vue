<template>
  <swiper
    :slides-per-view="6"
    :space-between="20"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in data" :key="item.id">
      <card :data="[item]" :category="category" v-if="category != 'people'" />
      <card-of-people v-else :data="item" />
    </swiper-slide>
    <div class="swiper-button swiper-button-prev" :style="sliderStyles"></div>
    <div class="swiper-button swiper-button-next" :style="sliderStyles"></div>
  </swiper>
</template>

<script>
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../components/Card";
import "swiper/swiper.scss";
import CardOfPeople from "./CardOfPeople.vue";
SwiperCore.use([Navigation]);
export default {
  components: { Swiper, SwiperSlide, card, CardOfPeople },
  props: {
    data: Object,
    category: String,
  },
  data() {
    return {
      sliderStyles: {
        background: `url(${require("@/assets/img/right-arrow.svg")})center/cover no-repeat`,
      },
    };
  },
  methods: {
    onSwiper(swiper) {},
    onSlideChange() {},
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  padding-left: 1.25rem;
  &-slide {
    padding-top: 3rem;
    &-cast {
      padding-top: 1rem;
    }
  }
  &-button {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    z-index: 10;
    cursor: pointer;
    &-prev {
      transform: translate(0%, -50%) scaleX(-1);
    }
    &-next{
      right: 0;
    }

    &::after {
      content: "";
    }

    &-disabled{
      opacity: .4;
      pointer-events: none;
    }
  }
}
</style>