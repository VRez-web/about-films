<template>
  <section class="movies__theatres section">
    <div class="container">
      <h2 class="movies__theatres-title section__title">
        Сейчас в кинотеатрах: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="movies__theatres-inner section__inner">
        <div v-for="movie in moviesToday.results" :key="movie.id" class="card">
          <p
            class="card__vote"
            :class="
              movie.vote_average >= 7
                ? 'high-rating'
                : movie.vote_average < 7 && movie.vote_average > 3
                ? 'mid-rating'
                : movie.vote_average <= 3
                ? 'low-rating'
                : ''
            "
          >
            {{ movie.vote_average }}
          </p>
          <div class="card__wrapper">
            <img
              :src="
                movie.poster_path
                  ? moviesImgUrl + movie.poster_path
                  : require('@/assets/img/no-poster.jpg')
              "
              :alt="movie.title"
            />
            <div class="card__about">
              <p class="card__details">
                Подробнее <i class="icofont-link"></i>
              </p>
            </div>
          </div>
          <div class="card-name-and-date">
            <p class="card__name">{{ movie.title }}</p>
            <p>
              {{
                (movie.release_date = movie.release_date
                  .split("")
                  .slice(0, 4)
                  .join(""))
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="section__pagination">
        <button
          @click="prevPage"
          :disabled="moviesCurrentPage === 1"
          class="page-management"
        >
          <i class="icofont-arrow-left"></i>
        </button>
        <div class="section__pagination-list">
          <button
            v-for="page in moviesTotalPages"
            :key="page"
            :class="page === moviesCurrentPage ? 'active' : ''"
            @click="currentPageTake(page)"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="moviesCurrentPage === moviesTotalPages"
          class="page-management"
        >
          <i class="icofont-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../plugins/axios";
import Card from "../components/Card";
export default {
  components: { Card },
  data() {
    return {
      moviesToday: [],
      moviesTotalPages: "",
      moviesCurrentPage: "",
      moviesImgUrl: this.$store.getters.IMG_URL,
      moviesImg: "",
      apiKey: this.$store.getters.API_KEY,
    };
  },
  methods: {
    currentPageTake(page) {
      axios
        .get(
          `/movie/now_playing?api_key=${
            this.apiKey
          }&language=ru-RU&region=RU&page=${(this.moviesCurrentPage = page)}`
        )
        .then((res) => {
          this.moviesToday = res.data;
          this.moviesCurrentPage = res.data.page;
        });
    },
  },
  computed: {
    nextPage() {
      axios
        .get(
          `/movie/now_playing?api_key=${
            this.apiKey
          }&language=ru-RU&region=RU&page=${this.moviesCurrentPage + 1}`
        )
        .then((res) => {
          this.moviesToday = res.data;
          this.moviesCurrentPage = res.data.page;
        });
    },
    prevPage() {
      axios
        .get(
          `/movie/now_playing?api_key=${
            this.apiKey
          }&language=ru-RU&region=RU&page=${this.moviesCurrentPage - 1}`
        )
        .then((res) => {
          this.moviesToday = res.data;
          this.moviesCurrentPage = res.data.page;
          this.total_pages = res.data.total_pages;
        });
    },
  },

  mounted() {
    axios
      .get(
        `/movie/now_playing?api_key=${this.apiKey}&language=ru-RU&region=RU&page=1`
      )
      .then((res) => {
        this.moviesToday = res.data;
        this.moviesCurrentPage = res.data.page;
        this.moviesTotalPages = res.data.total_pages;
      });
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
</style>