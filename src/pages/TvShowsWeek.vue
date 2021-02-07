<template>
   <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Тв-шоу на неделю: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="tv__shows__inner section__inner">
        <div v-for="tvShow in tvShowsWeek.results" :key="tvShow.id" class="card">
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
                  ? tvShowsWeekImgUrl + tvShow.poster_path
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
          :disabled="tvShowsWeekCurrentPage === 1"
          class="page-management"
        >
          <i class="icofont-arrow-left"></i>
        </button>
        <div class="section__pagination-list">
          <button
            v-for="page in tvShowsWeekTotalPages"
            :key="page"
            :class="page === tvShowsWeekCurrentPage ? 'active' : ''"
            @click="currentPageTake(page)"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="tvShowsWeekCurrentPage === tvShowsWeekTotalPages"
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
      tvShowsWeek: [],
      tvShowsWeekImgUrl:this.$store.getters.IMG_URL,
      tvShowsWeekCurrentPage:'',
      tvShowsWeekTotalPages:''
    };
  },
    methods: {
    currentPageTake(page) {
      axios
        .get(
          `/tv/on_the_air?api_key=${
            this.apiKey
          }&language=ru-RU&page=${(this.tvShowsWeekCurrentPage = page)}`
        )
        .then((res) => {
          this.tvShowsWeek = res.data;
          this.tvShowsWeekCurrentPage = res.data.page;
        });
    },
  },
  computed: {
    nextPage() {
      axios
        .get(
          `/tv/on_the_air?api_key=${
            this.apiKey
          }&language=ru-RU&page=${this.tvShowsWeekCurrentPage + 1}`
        )
        .then((res) => {
          this.tvShowsWeek = res.data;
          this.tvShowsWeekCurrentPage = res.data.page;
        });
    },
    prevPage() {
      axios
        .get(
          `/tv/on_the_air?api_key=${
            this.apiKey
          }&language=ru-RU&page=${this.tvShowsWeekCurrentPage - 1}`
        )
        .then((res) => {
          this.tvShowsWeek = res.data;
          this.tvShowsWeekCurrentPage = res.data.page;
          this.tvShowsWeekTotalPages = res.data.total_pages;
        });
    },
  },
  mounted() {
    axios
      .get(`/tv/on_the_air?api_key=${this.apiKey}&language=ru-RU`)
      .then((res) => {
        this.tvShowsWeek = res.data;
        this.tvShowsWeekCurrentPage=res.data.page
        this.tvShowsWeekTotalPages=res.data.total_pages
      });
  },
};
</script>

<style>

</style>