<template>
  <main>
    <div class="container-second">
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-theatres" class="link"
            >В кинотеатрах сейчас</router-link
          >
          <i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in moviesTeathers" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-upcoming" class="link"
            >Ожидаемые фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in moviesUpcoming" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-popular" class="link"
            >Популярные фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in moviesPopular" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-topRated" class="link"
            >Лучшие фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in moviesTopRated" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/serials-today" class="link">
            Сериалы на сегодня</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in tvShowsToday" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/serials-week" class="link">
            Сериалы на неделю</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in tvShowsWeek" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/serials-popular" class="link">
            Популярные сериалы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in tvShowsPopular" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/serials-topRated" class="link">
            Лучшие сериалы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <swiper
          :slides-per-view="6"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in tvShowsTopRated" :key="item.id"
            ><card :data="[item]" />
          </swiper-slide>
        </swiper>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import card from "../components/Card";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
SwiperCore.use([Navigation]);
export default {
  components: { Swiper, SwiperSlide, card },
  data() {
    return {
      moviesTeathers: [],
      moviesUpcoming: [],
      moviesPopular: [],
      moviesTopRated: [],

      tvShowsToday: [],
      tvShowsWeek: [],
      tvShowsPopular: [],
      tvShowsTopRated: [],
    };
  },
  methods: {
    ...mapActions([
      "GET_MOVIES_THEATRES",
      "GET_MOVIES_UPCOMING",
      "GET_MOVIES_POPULAR",
      "GET_MOVIES_TOP_RATED",
      "GET_MOVIE_DATES",

      "GET_TV_SHOWS_TODAY",
      "GET_TV_SHOWS_WEEK",
      "GET_TV_SHOWS_POPULAR",
      "GET_TV_SHOWS_TOP_RATED",
    ]),
    onSwiper(swiper) {},
    onSlideChange() {},
  },
  computed: {},
  mounted() {
    // Получение фильмов
    this.GET_MOVIES_THEATRES().then((res) => {
      this.moviesTeathers = res.results.slice(0, 12);
      this.moviesTeathers.forEach((item) => {
        this.GET_MOVIE_DATES(item.id).then((resolve) => {
          resolve.results.forEach((date) => {
            if (date.iso_3166_1 == "RU") {
              item.release_date = date.release_dates[0].release_date.slice(
                0,
                4
              );
            }
          });
        });
      });
    });
    this.GET_MOVIES_UPCOMING().then((res) => {
      this.moviesUpcoming = res.results.slice(2, 14);
      this.moviesUpcoming.forEach((item) => {
        this.GET_MOVIE_DATES(item.id).then((resolve) => {
          resolve.results.forEach((date) => {
            if (date.iso_3166_1 == "RU") {
              item.release_date = date.release_dates[0].release_date.slice(
                0,
                4
              );
            }
          });
        });
      });
    });
    this.GET_MOVIES_POPULAR().then((res) => {
      this.moviesPopular = res.results.slice(0, 12);
      this.moviesPopular.forEach((item) => {
        this.GET_MOVIE_DATES(item.id).then((resolve) => {
          resolve.results.forEach((date) => {
            if (date.iso_3166_1 == "RU") {
              item.release_date = date.release_dates[0].release_date.slice(
                0,
                4
              );
            }
          });
        });
      });
    });
    this.GET_MOVIES_TOP_RATED().then((res) => {
      this.moviesTopRated = res.results.slice(0, 12);
    });

    // Получение сериалов
    this.GET_TV_SHOWS_TODAY().then((res) => {
      this.tvShowsToday = res.results.slice(0, 12);
    });
    this.GET_TV_SHOWS_WEEK().then((res) => {
      this.tvShowsWeek = res.results.slice(0, 12);
    });
    this.GET_TV_SHOWS_POPULAR().then((res) => {
      this.tvShowsPopular = res.results.slice(0, 12);
    });
    this.GET_TV_SHOWS_TOP_RATED().then((res) => {
      this.tvShowsTopRated = res.results.slice(0, 12);
    });
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
@import "../assets/scss/_global.scss";

.home__gallery {
  &:hover {
    .home__gallery-title {
      i {
        opacity: 1;
        margin-left: 0.625rem;
      }
    }
  }
  &-title {
    @extend .section__title;
    margin-bottom: 0;
    display: flex;
    align-items: flex-end;
    a {
      color: $color-white;
    }
    i {
      opacity: 0;
      transition: all 0.3s linear;
    }
  }
}
</style>