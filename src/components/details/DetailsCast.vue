<template>
  <section :class="$style.details__about">
    <div class="container">
      <h2 :class="$style['details__about-title']">В главных ролях</h2>
      <div :class="$style['details__about-cast']">
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
            <swiper-slide v-for="person in shortCast" class="swiper-slide__cast">
              <CardOfPeople :model="person"/>
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
        <router-link
            :to="{
            name: 'cast-id',
            params: { id, name:nameProduct },
            query:{type}
          }"
            :class="$style['details__about-link']"
            class="link"
        >Полный актёрский и съёмочный состав
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import SwiperCore, {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper.scss";
import CardOfPeople from "@/components/CardOfPeople";

SwiperCore.use([Navigation]);
export default {
  props: {
    id: [String, Number],
    cast: Array,
    nameProduct: String,
    type: String
  },
  components: {
    CardOfPeople,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      sliderStyles: {
        background: `url(${require("@/assets/img/right-arrow.svg")})center/cover no-repeat`,
      },
      sliderBreakpoints: {
        1500: {
          slidesPerView: 7,
        },
      },
    };
  },
  computed: {
    shortCast() {
      return this.cast.slice(0, 14);
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

<style lang="scss">
@import "src/assets/scss/components/slider";
</style>

<style lang="scss" module>
@import "src/assets/scss/_vars.scss";

.details__about {
  &-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &-cast {
    &-more {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 1.3rem;
    }
  }

  &-link {
    font-size: 1.2rem;
    margin-top: 1rem;

    @media (max-width: 400px) {
      font-size: 0.9rem;
    }
  }
}
</style>
