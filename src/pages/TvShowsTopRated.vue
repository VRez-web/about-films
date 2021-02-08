<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Лучшие Тв-шоу: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="tv__shows__inner section__inner">
        <div
          v-for="tvShow in tvShowsTopRated.results"
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
                  ? tvShowsTopRatedImgUrl + tvShow.poster_path
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
          :disabled="tvShowsTopRatedCurrentPage === 1"
          class="page-management"
        >
          <i class="icofont-arrow-left"></i>
        </button>
        <div class="section__pagination-list">
          <button
            v-for="page in pages"
            :key="page"
            :class="page === tvShowsTopRatedCurrentPage ? 'active' : ''"
            @click="currentPageTake(page)"
            
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="tvShowsTopRatedCurrentPage === tvShowsTopRatedTotalPages"
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
      tvShowsTopRated: [],
      tvShowsTopRatedImgUrl: this.$store.getters.IMG_URL,
      tvShowsTopRatedCurrentPage: "",
      tvShowsTopRatedTotalPages: [],
      PageRange:2
    };
  },
  methods: {
    currentPageTake(page) {
      axios
        .get(
          `/tv/top_rated?api_key=${
            this.apiKey
          }&language=ru-RU&page=${(this.tvShowsTopRatedCurrentPage = page)}`
        )
        .then((res) => {
          this.tvShowsTopRated = res.data;
          this.tvShowsTopRatedCurrentPage = res.data.page;
        });
    },
  },
  computed: {
    pages: function () {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
    nextPage() {
      axios
        .get(
          `/tv/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${
            this.tvShowsTopRatedCurrentPage + 1
          }`
        )
        .then((res) => {
          this.tvShowsTopRated = res.data;
          this.tvShowsTopRatedCurrentPage = res.data.page;
        });
    },
    prevPage() {
      axios
        .get(
          `/tv/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${
            this.tvShowsTopRatedCurrentPage - 1
          }`
        )
        .then((res) => {
          this.tvShowsTopRated = res.data;
          this.tvShowsTopRatedCurrentPage = res.data.page;
          this.tvShowsTopRatedTotalPages = res.data.total_pages;
        });
    },
    rangeStart:function() {
      let start = this.tvShowsTopRatedCurrentPage - this.PageRange;

      return  (start > 0) ? start : 1;
    },
    rangeEnd:function() {
      let end = this.tvShowsTopRatedCurrentPage + this.PageRange;
      return (end < this.tvShowsTopRatedTotalPages)
        ? end
        : this.tvShowsTopRatedTotalPages;
    },
  },
  mounted() {
    axios
      .get(`/tv/top_rated?api_key=${this.apiKey}&language=ru-RU`)
      .then((res) => {
        this.tvShowsTopRated = res.data;
        this.tvShowsTopRatedCurrentPage = res.data.page;
        this.tvShowsTopRatedTotalPages = res.data.total_pages;
      });
  },
};
</script>

<style>
</style>