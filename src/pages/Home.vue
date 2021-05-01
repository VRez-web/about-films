<template>
  <main>
    <div class="container">
      <home-gallery
        v-for="category in categories"
        :key="category.id"
        :title="category.title"
        :link="category.link"
        :dataSlider="category.items"
        :id="category.id"
        :category="category.type"
      />
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import slider from "@/components/Slider";
import homeGallery from "@/components/HomeGallery";

export default {
  components: { slider, homeGallery },
  data() {
    return {
      categories: {
        moviesTeathers: {
          title: "В кинотеатрах сейчас",
          id: "swiper-1",
          link: "movies-theatres",
          type: null,
          items: [],
        },
        moviesUpcoming: {
          title: "Ожидаемые фильмы",
          id: "swiper-2",
          link: "movies-upcoming",
          type: null,
          items: [],
        },
        moviesPopular: {
          title: "Популярные фильмы",
          id: "swiper-3",
          link: "movies-popular",
          type: null,
          items: [],
        },
        moviesTopRated: {
          title: "Лучшие фильмы",
          id: "swiper-4",
          link: "movies-topRated",
          type: null,
          items: [],
        },
        tvShowsToday: {
          title: "Сериалы на сегодня",
          id: "swiper-5",
          link: "serials-today",
          type: null,
          items: [],
        },
        tvShowsWeek: {
          title: "Сериалы на неделю",
          id: "swiper-6",
          link: "serials-week",
          type: null,
          items: [],
        },
        tvShowsPopular: {
          title: " Популярные сериалы",
          id: "swiper-7",
          link: "serials-popular",
          type: null,
          items: [],
        },
        tvShowsTopRated: {
          title: "Лучшие сериалы",
          id: "swiper-8",
          link: "serials-topRated",
          type: null,
          items: [],
        },
      },
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
  },
  computed: {},
  async mounted() {
    let categories = this.categories;

    // Получение фильмов

    try {
      const MOVIES_THEATRES = await this.GET_MOVIES_THEATRES();
      categories.moviesTeathers.items = MOVIES_THEATRES.data.results.slice(
        0,
        12
      );
      categories.moviesTeathers.type = MOVIES_THEATRES.type;

      const MOVIES_UPCOMING = await this.GET_MOVIES_UPCOMING();
      categories.moviesUpcoming.items = MOVIES_UPCOMING.data.results.slice(
        2,
        14
      );
      categories.moviesUpcoming.type = MOVIES_UPCOMING.type;
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      const MOVIES_POPULAR = await this.GET_MOVIES_POPULAR();
      categories.moviesPopular.items = MOVIES_POPULAR.data.results.slice(0, 12);
      categories.moviesPopular.type = MOVIES_POPULAR.type;

      const MOVIES_TOP_RATED = await this.GET_MOVIES_TOP_RATED();
      categories.moviesTopRated.items = MOVIES_TOP_RATED.data.results.slice(
        0,
        12
      );
      categories.moviesTopRated.type = MOVIES_TOP_RATED.type;

      // Получение сериалов

      const TV_SHOWS_TODAY = await this.GET_TV_SHOWS_TODAY();
      categories.tvShowsToday.items = TV_SHOWS_TODAY.data.results.slice(0, 12);
      categories.tvShowsToday.type = TV_SHOWS_TODAY.type;

      const TV_SHOWS_WEEK = await this.GET_TV_SHOWS_WEEK();
      categories.tvShowsWeek.items = TV_SHOWS_WEEK.data.results.slice(0, 12);
      categories.tvShowsWeek.type = TV_SHOWS_WEEK.type;

      const TV_SHOWS_POPULAR = await this.GET_TV_SHOWS_POPULAR();
      categories.tvShowsPopular.items = TV_SHOWS_POPULAR.data.results.slice(
        0,
        12
      );
      categories.tvShowsPopular.type = TV_SHOWS_POPULAR.type;

      const TV_SHOWS_TOP_RATED = await this.GET_TV_SHOWS_TOP_RATED();
      categories.tvShowsTopRated.items = TV_SHOWS_TOP_RATED.data.results.slice(
        0,
        12
      );
      categories.tvShowsTopRated.type = TV_SHOWS_TOP_RATED.type;
    }
  },
};
</script>


<style lang="scss">
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

@media (max-width: 550px) {
  .home__gallery {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}
@media (max-width: 319px) {
  .home__gallery {
    &-title {
      font-size: 1.3rem;
    }
  }
}
</style>