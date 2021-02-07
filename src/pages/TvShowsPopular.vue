<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
       Популярные Тв-шоу: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="tv__shows__inner section__inner">
        <div
          v-for="tvShow in tvShowsPopular.results"
          :key="tvShow.id"
          class="card"
        >
          <p
            class="card__vote"
            :class="
              tvShow.vote_average >= 7
                ? 'high-rating'
                : tvShow.vote_average < 7 && tvShow.vote_average > 3
                ? 'mid-rating'
                : tvShow.vote_average <= 3
                ? 'low-rating'
                : ''
            "
          >
            {{ tvShow.vote_average }}
          </p>
          <div class="card__wrapper">
            <img
              :src="
                tvShow.poster_path
                  ? tvShowsPopularImgUrl + tvShow.poster_path
                  : require('@/assets/img/no-poster.jpg')
              "
              :alt="tvShow.title"
            />
            <div class="card__about">
              <p class="card__details">
                Подробнее <i class="icofont-link"></i>
              </p>
            </div>
          </div>
          <div class="card-name-and-date">
            <p class="card__name">{{ tvShow.name }}</p>
            <p>
              {{
                (tvShow.first_air_date = tvShow.first_air_date
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
          :disabled="tvShowsPopularCurrentPage === 1"
          class="page-management"
        >
          <i class="icofont-arrow-left"></i>
        </button>
        <div class="section__pagination-list">
          <button
            v-for="page in tvShowsPopularTotalPages"
            :key="page"
            :class="page === tvShowsPopularCurrentPage ? 'active' : ''"
            @click="currentPageTake(page)"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="tvShowsPopularCurrentPage === tvShowsPopularTotalPages"
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
      apiKey: this.$store.getters.API_KEY,
      tvShowsPopular: [],
      tvShowsPopularImgUrl: this.$store.getters.IMG_URL,
      tvShowsPopularCurrentPage: "",
      tvShowsPopularTotalPages: "",
    };
  },
  methods: {
    currentPageTake(page) {
      axios
        .get(
          `/tv/popular?api_key=${
            this.apiKey
          }&language=ru-RU&page=${(this.tvShowsPopularCurrentPage = page)}`
        )
        .then((res) => {
          this.tvShowsPopular = res.data;
          this.tvShowsPopularCurrentPage = res.data.page;
        });
    },
  },
  computed: {
    nextPage() {
      axios
        .get(
          `/tv/popular?api_key=${this.apiKey}&language=ru-RU&page=${
            this.tvShowsPopularCurrentPage + 1
          }`
        )
        .then((res) => {
          this.tvShowsPopular = res.data;
          this.tvShowsPopularCurrentPage = res.data.page;
        });
    },
    prevPage() {
      axios
        .get(
          `/tv/popular?api_key=${this.apiKey}&language=ru-RU&page=${
            this.tvShowsPopularCurrentPage - 1
          }`
        )
        .then((res) => {
          this.tvShowsPopular = res.data;
          this.tvShowsPopularCurrentPage = res.data.page;
          this.tvShowsPopularTotalPages = res.data.total_pages;
        });
    },
  },
  mounted() {
    axios
      .get(`/tv/popular?api_key=${this.apiKey}&language=ru-RU`)
      .then((res) => {
        this.tvShowsPopular = res.data;
        this.tvShowsPopularCurrentPage = res.data.page;
        this.tvShowsPopularTotalPages = res.data.total_pages;
      });
  },
};
</script>

<style>
</style>