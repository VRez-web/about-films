<template>
  <main>
    <div class="container">
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'movies-theatres' }" class="link"
            >В кинотеатрах сейчас</router-link
          >
          <i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="moviesTeathers" :category="'movie'" id="swiper-1"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'movies-upcoming' }" class="link"
            >Ожидаемые фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="moviesUpcoming" :category="'movie'" id="swiper-2" />
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'movies-popular' }" class="link"
            >Популярные фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="moviesPopular" :category="'movie'" id="swiper-3"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'movies-topRated' }" class="link"
            >Лучшие фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="moviesTopRated" :category="'movie'" id="swiper-4"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'serials-today' }" class="link">
            Сериалы на сегодня</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="tvShowsToday" :category="'serial'" id="swiper-5"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'serials-week' }" class="link">
            Сериалы на неделю</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="tvShowsWeek" :category="'serial'" id="swiper-6"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'serials-popular' }" class="link">
            Популярные сериалы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="tvShowsPopular" :category="'serial'" id="swiper-7"/>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link :to="{ name: 'serials-topRated' }" class="link">
            Лучшие сериалы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
        <slider :data="tvShowsTopRated" :category="'serial'" id="swiper-8" />
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import slider from "../components/Slider";
export default {
  components: { slider },
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
    // получение сериалов
    ...mapActions("serialsTopRated", ["GET_TV_SHOWS_TOP_RATED"]),
    ...mapActions("serialsPopular", ["GET_TV_SHOWS_POPULAR"]),
    ...mapActions("serialsWeek", ["GET_TV_SHOWS_WEEK"]),
    ...mapActions("serialsToday", ["GET_TV_SHOWS_TODAY"]),

    // получение фильмов
      ...mapActions("moviesUpcoming", ["GET_MOVIES_UPCOMING"]),
      ...mapActions("moviesTheatres", ["GET_MOVIES_THEATRES"]),
      ...mapActions("moviesPopular", ["GET_MOVIES_POPULAR"]),
      ...mapActions("moviesTopRated", ["GET_MOVIES_TOP_RATED"]),
      ...mapActions("moviesDates", ["GET_MOVIE_DATES"]),
  },
  computed: {},
  async mounted() {
    // Получение фильмов
    // Пока что так
    try {
      const MOVIES_THEATRES = await this.GET_MOVIES_THEATRES();
      this.moviesTeathers = MOVIES_THEATRES.results.slice(0, 12);
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

      const MOVIES_UPCOMING = await this.GET_MOVIES_UPCOMING();
      this.moviesUpcoming = MOVIES_UPCOMING.results.slice(2, 14);

      const MOVIES_POPULAR = await this.GET_MOVIES_POPULAR();
      this.moviesPopular = MOVIES_POPULAR.results.slice(0, 12);
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

      const MOVIES_TOP_RATED = await this.GET_MOVIES_TOP_RATED();
      this.moviesTopRated = MOVIES_TOP_RATED.results.slice(0, 12);

      // Получение сериалов
      const TV_SHOWS_TODAY = await this.GET_TV_SHOWS_TODAY();
      this.tvShowsToday = TV_SHOWS_TODAY.results.slice(0, 12);

      const TV_SHOWS_WEEK = await this.GET_TV_SHOWS_WEEK();
      this.tvShowsWeek = TV_SHOWS_WEEK.results.slice(0, 12);

      const TV_SHOWS_POPULAR = await this.GET_TV_SHOWS_POPULAR();
      this.tvShowsPopular = TV_SHOWS_POPULAR.results.slice(0, 12);

      const TV_SHOWS_TOP_RATED = await this.GET_TV_SHOWS_TOP_RATED();
      this.tvShowsTopRated = TV_SHOWS_TOP_RATED.results.slice(0, 12);
    } catch (e) {
      console.error(e);
      return e;
    }
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

@media (max-width:550px) {
  .home__gallery {
    margin-bottom: 2rem;
  }
}
</style>