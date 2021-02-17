<template>
  <main>
    <div class="container-second">
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-theatres">В кинотеатрах сейчас</router-link>
          <i class="icofont-arrow-right"></i>
        </h2>
        <slider></slider>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-upcoming">Ожидаемые фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-popular">Популярные фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/movies-topRated">Лучшие фильмы</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/tvShows-today"> Тв-шоу на   сегодня</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/tvShows-week"> Тв-шоу на неделю</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/tvShows-popular"> Популярные Тв-шоу</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
      <section class="home__gallery">
        <h2 class="home__gallery-title">
          <router-link to="/tvShows-topRated"> Лучшие Тв-шоу</router-link
          ><i class="icofont-arrow-right"></i>
        </h2>
      </section>
    </div>
  </main>
</template>

<script>
import slider from '../components/Slider'
export default {
  components: {slider},
  data() {
    return {};
  },
  methods: {},
  computed: {},
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