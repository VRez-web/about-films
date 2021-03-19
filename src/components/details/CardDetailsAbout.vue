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
            v-for="item in castSlider"
            :key="item.id"
            class="card__details-cast-item swiper-slide-cast"
          >
            <card-of-people :data="item" />
          </swiper-slide>
          <swiper-slide class="card__details-cast-more"
            ><p>Смотреть еще</p>
            <i class="icofont-arrow-right"></i
          ></swiper-slide>
          <div class="prev"></div>
          <div class="next"></div>
        </swiper>
        <a
          href="#"
          @click.prevent="currectTitleLink(cardId, title)"
          class="all-cast link"
          >Полный актёрский и съёмочный состав</a
        >
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
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../Card";
import CardOfPeople from "../CardOfPeople";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
export default {
  props: { cardId: String, castSlider: Array, title: String},
  components: { Swiper, SwiperSlide, card, CardOfPeople },
  data() {
    return {
      similarMovies: [],
    };
  },
  methods: {
    ...mapActions(["GET_MOVIE_SIMILAR"]),
    getSimilarMovies() {
      this.GET_MOVIE_SIMILAR(this.cardId).then((res) => {
        this.similarMovies = res.results.slice(0, 9);
      });
    },

    currectTitleLink(id, title) {
      this.$router
        .push({
          name: "card-details-cast",
          params: { id: id, title: title.replace(/\s/g, "-")},
        })
        .catch((e) => {});
    },
  },
  computed: {},
    watch:{
    cardId: {
      immediate: true, 
      handler: function () {
        this.getSimilarMovies()
    }
    }
  },
  mounted() {
    this.getSimilarMovies();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
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
  &-title {
    margin: 1rem 0;
  }
}
</style>