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
    model: Array
  },
  data() {
    return {
      imgUrl: this.$store.state.backdropBig,
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
  methods: {
    onSwiper(swiper) {
    },
    onSlideChange() {
    },
  },
};
</script>

<style lang="scss" scoped>

.swiper {
  padding-left: 1.25rem;

  &-slide {
    border-radius: 0.625rem;
    padding-top: 2.5rem;
    user-select: none;
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

</style>