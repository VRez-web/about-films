<template>
  <swiper
    :slides-per-view="6"
    :space-between="20"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in data" :key="item.id"
      ><card :data="[item]" :category="category"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../components/Card";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
SwiperCore.use([Navigation]);
export default {
  components: { Swiper, SwiperSlide, card },
  props:{
      data:Object,
      category:String
  },
  data() {
    return {};
  },
  methods: {
    onSwiper(swiper) {},
    onSlideChange() {},
  },
};
</script>

<style>
</style>