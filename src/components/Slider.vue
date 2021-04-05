<template>
  <div class="slider">
    <swiper
      :slides-per-view="6"
      :space-between="20"
      :navigation="{
        nextEl: `.next-${id}`,
        prevEl: `.prev-${id}`,
      }"
      :breakpoints="{
        1500: {
          slidesPerView: 6,
        },
        1300: {
          slidesPerView: 5,
        },
        1000: {
          slidesPerView: 4,
        },
        800: {
          slidesPerView: 3,
        },
        300: {
          slidesPerView: 2,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :id="id"
    >
      <swiper-slide v-for="item in data" :key="item.id">
        <card :data="[item]" :category="category" v-if="category != 'people'" />
        <card-of-people v-else :data="item" />
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
    id: String,
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
    top: 45%;
    transform: translate(0%, -50%);
    z-index: 10;
    cursor: pointer;
    &-prev {
      transform: translate(0%, -50%) scaleX(-1);
      left: -50px;
    }
    &-next {
      right: -50px;
    }
    &-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
.slider {
  position: relative;
}
@media (max-width: 550px) {
  .swiper {
    &-button {
      width: 3rem;
      height: 3rem;
      &-prev {
        left: -10px;
      }

      &-next {
        right: -10px;
      }
    }
  }
}
@media (max-width: 400px) {
  .swiper {
    &-button {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>