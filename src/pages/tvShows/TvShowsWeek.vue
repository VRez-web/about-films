<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">
        Тв-шоу на неделю: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="tv__shows__inner section__inner">
        <div
          v-for="tvShow in tvShowsWeek.results"
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
      <Pagination
        :data="tvShowsWeek"
        :totalPages="tvShowsWeek.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import Card from "../../components/Card";
import { mapActions } from "vuex";
import Pagination from "../../components/Pagination.vue";
export default {
  components: { Card, Pagination },
  data() {
    return {
      tvShowsWeek: [],
      tvShowsWeekImgUrl: this.$store.getters.IMG_URL,
      pages: "",
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions(["GET_TV_SHOWS_WEEK"]),
        pageChange(page) {
      this.currentPage = page;
      this.GET_TV_SHOWS_WEEK((page = this.currentPage)).then((res) => {
        this.tvShowsWeek = res;
      });
  },
  },
  computed: {},
  mounted() {
    this.GET_TV_SHOWS_WEEK().then((res) => {
      this.tvShowsWeek = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
}
</script>

<style>
</style>