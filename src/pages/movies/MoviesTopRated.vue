<template>
   <section class=" section">
    <div class="container">
      <h2 class="-title section__title">
        Сейчас в кинотеатрах: <i class="icofont-long-arrow-right"></i>
      </h2>
      <div class="section__inner">
        <div
          v-for="movie in moviesTopRated.results"
          :key="movie.id"
          class="card"
        >
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

      <Pagination
        :data="moviesTopRated"
        :totalPages="moviesTopRated.total_pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import Pagination from "../../components/Pagination.vue";
import Card from "../../components/Card";
export default {
 components: { Card,Pagination },
  data() {
    return {
      moviesTopRated: [],
      moviesImgUrl: this.$store.getters.IMG_URL,
     pages: "",
      currentPage: this.$store.page,

    };
  },
  methods: {
     ...mapActions(["GET_MOVIES_TOP_RATED"]),
        pageChange(page) {
      this.currentPage = page;
      this.GET_MOVIES_TOP_RATED((page = this.currentPage)).then((res) => {
        this.moviesTopRated = res;
      });
  },
  },

  mounted() {
  this.GET_MOVIES_TOP_RATED().then((res) => {
      this.moviesTopRated = res;
      this.pages = res.total_pages;
      this.currentPage = res.page;
    });
  },
}
</script>

<style>

</style>