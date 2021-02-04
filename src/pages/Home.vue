<template>
  <main>
    <section class="movies__theatres">
      <div class="container">
        <h2 class="movies__theatres-title">
          Сейчас в кинотеатрах: <i class="icofont-long-arrow-right"></i>
        </h2>
        <div class="movies__theatres-inner">
          <div
            v-for="movie in state.moviesToday.results"
            :key="movie.id"
            class="movie__card"
          >
            <p
              class="movie__card-vote"
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
            <div class="movie__card-wrapper">
              <img
                :src=" movie.poster_path
                    ? state.moviesImgUrl +  movie.poster_path
                    : require('@/assets/img/no-poster.jpg')
                "
                :alt="movie.title"
                @mousemove="
                  movie.backdrop_path
                    ? movie.poster_path= movie.backdrop_path
                    : ''
                "
                @mouseleave="
                  state.moviesImg
                    ? state.moviesImgUrl +  state.moviesImg
                    : ''
                "
              />
              <div class="movie__card-about">
                <p class="movie__card-details">
                  Подробнее <i class="icofont-link"></i>
                </p>
              </div>
            </div>
            <div class="movie__card-name-and-date">
              <p class="movie__card-name">{{ movie.title }}</p>
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

        <div class="movies__theatres-pagination">
          <button><i class="icofont-arrow-left"></i></button>
          <ul>
            <li></li>
          </ul>
          <button><i class="icofont-arrow-right" @click="nextPage"></i></button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "../plugins/axios";
import { onMounted, reactive } from "vue";
import MovieCard from "../components/MovieCard";
export default {
  components: { MovieCard },
  setup() {
    const state = reactive({
      apiKey: "f74144cebf6695340f4726c27579484e",
      apiUrl: "https://api.themoviedb.org/3",
      moviesToday: [],
      moviesTotalPages: "",
      moviesCurrentPage: "",
      moviesImgUrl: "https://image.tmdb.org/t/p/w500",
      moviesImg: "",
    });

    onMounted(() => {
      axios
        .get(
          `${state.apiUrl}/movie/now_playing?api_key=${state.apiKey}&language=ru-RU&region=RU&page=1`
        )
        .then((res) => {
          state.moviesToday = res.data;
          state.moviesCurrentPage = res.data.page;
          state.moviesTotalPages = res.data.total_pages;
        });
    });

    function nextPage() {
      axios
        .get(
          `${state.apiUrl}/movie/now_playing?api_key=${
            state.apiKey
          }&language=ru-RU&region=RU&page=${state.moviesCurrentPage + 1}`
        )
        .then((res) => {
          state.moviesToday = res.data;
          state.moviesCurrentPage = res.data.page;
        });
    }
    return { state, nextPage };
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";

.movies__theatres {
  margin-top: 1.875rem;

  &:hover {
    .movies__theatres-title {
      i {
        opacity: 1;
      }
    }
  }

  &-title {
    color: $color-white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    i {
      opacity: 0;
      transition: all 0.3s linear;
      font-weight: 700;
    }
  }

  &-inner {
    padding: 1rem 0;
    display: flex;
    flex-wrap: wrap;
  }
}

.movie__card {
  width: 18%;
  color: $color-white;
  margin: 0 1.25rem 2.5rem 0;
  transition: all 0.3s linear;
  cursor: pointer;
  font-size: 1rem;

  // &:hover {
  //   transform: scale(1.05);

  //   .movie__card-about {
  //    width: 100%;
  //    height: 100%;
  //    opacity: 1;
  //   }

  //   img {
  //     filter: blur(1px);
  //   }
  // }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
  }
  &-wrapper {
    position: relative;
  }

  &-about {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 0%;
    height: 0%;
    opacity: 0;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      width: 100%;
      text-align: center;
    }
  }
  &-vote {
    margin: 0 0 -3rem 0;
    padding: 0.313rem 0;
    position: relative;
    z-index: 1;
    width: 20%;
    text-align: center;
    font-weight: 700;

    &.high-rating {
      background-color: $bg-highRating;
    }
    &.mid-rating {
      background-color: $bg-midRating;
    }
    &.low-rating {
      background-color: $bg-lowRating;
    }
  }

  &-name-and-date {
    text-align: center;
  }
  &-name {
    margin: 0.625rem 0;
  }
}
</style>