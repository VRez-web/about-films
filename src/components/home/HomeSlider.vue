<template>
  <div v-if="!!genreListTv.length && !!genreListMovie.length" class="home__slider">
    <div class="slider">
      <swiper
          :navigation="{
        nextEl: `.next-${id}`,
        prevEl: `.prev-${id}`,
      }"
          :breakpoints="sliderBreakpoints"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :id="id"
      >
        <swiper-slide
            v-for="(item, i) in data" :key="i"
            :style="
          `background:url(${imgUrl+ item.backdrop_path})top/cover no-repeat;`">
          <div class="home__slide">
            <div class="home__slide-wrapper">
              <h2 class="home__slide-title">{{ item.title || item.name }}</h2>
              <div class="home__slide-genres">
            <span
                v-if="item.title"
                v-for="(genreMovies, iMovies) in item.genre_ids"
                :key="iMovies"
                class="home__slide-genre"
            >
              {{ getGenreMovies(genreMovies) }}
                      </span>
                <span v-else
                      v-for="(genreTv, i) in item.genre_ids"
                      :key="i"
                      class="home__slide-genre"
                >
                  {{ getGenreTv(genreTv) }}
                </span>
              </div>
              <p class="home__slide-about">{{ item.overview }}</p>
              <p v-if="item.release_date" class="home__slide-date">Дата премьеры: {{
                  formattedDate(item.release_date)
                }}</p>
              <p v-else class="home__slide-date">Дата премьеры: {{ formattedDate(item.first_air_date) }}</p>
            </div>
            <router-link to="details" class="home__slide-link link">Подробнее</router-link>
          </div>
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
import {genresMovie, genresTv} from "@/services/genres";

SwiperCore.use([Navigation]);
export default {
  components: {Swiper, SwiperSlide},
  props: {
    id: String,
    data: Array
  },
  data() {
    return {
      imgUrl: this.$store.state.backdropBig,
      sliderStyles: {
        background: `url(${require("@/assets/img/right-arrow.svg")})center/cover no-repeat`,
      },
      sliderBreakpoints: {
        1500: {
          slidesPerView: 1,
        },
      },
      genreListMovie: [],
      genreListTv: [],
    };
  },
  async created() {
    const genreListMovie = await genresMovie()
    const genreListTv = await genresTv()
    this.genreListMovie = genreListMovie.genres
    this.genreListTv = genreListTv.genres
  },
  methods: {
    onSwiper(swiper) {
    },
    onSlideChange() {
    },

    getGenreMovies(genre) {
      return this.genreListMovie.find(el => el.id === genre).name
    },

    getGenreTv(genre) {
      return this.genreListTv.find(el => el.id === genre).name
    },

    formattedDate(date) {
      const formattedDate = date.split(''),
          result = []

      result.push(formattedDate.slice(-2).join('') + '/')
      result.push(formattedDate.slice(5, 7).join('') + '/')
      result.push(formattedDate.slice(0, 4).join(''))

      return result.join('')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/vars";

.home__slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 350px;
  background: rgba(0, 0, 0, .4);
  padding: 2rem 1rem;

  &-title {
    font-size: 1.5rem;
    margin-bottom: .2rem;
  }

  &-about {
    width: 50%;
    font-size: 0.875rem;
  }

  &-genres {
    margin-bottom: 1rem;
  }

  &-genre {
    font-size: 0.875rem;
    padding-right: 0.25rem;

    &::after {
      content: ",";
      display: inline-block;
    }

    &:last-of-type::after {
      content: "";
    }

  }

  &-date {
    margin-top: 2rem;
  }

  &-link {
    font-size: 1.2rem;
  }
}

.swiper {
  padding-left: 1.25rem;

  &-slide {
    border-radius: 10px;
    overflow: hidden;
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

@media (max-width: 600px) {
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