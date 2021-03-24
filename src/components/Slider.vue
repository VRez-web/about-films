<template>
  <swiper
    :slides-per-view="6"
    :space-between="20"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in data" :key="item.id">
      <card :data="[item]" :category="category" v-if="category != 'people'" />
      <card-of-people v-else :data="item"/>
    </swiper-slide >
  </swiper>
</template>

<script>
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../components/Card";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import CardOfPeople from "./CardOfPeople.vue";
SwiperCore.use([Navigation]);
export default {
  components: { Swiper, SwiperSlide, card, CardOfPeople },
  props: {
    data: Object,
    category: String,
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