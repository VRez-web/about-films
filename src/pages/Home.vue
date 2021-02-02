<template>
  <main>
    <section class="movies__theatres">
      <div class="container">
        <h2 class="movies__theatres-title">
          Сейчас в кинотеатрах: <i class="icofont-long-arrow-right"></i>
        </h2>
        <div class="movies__theatres-inner">
          <div
            v-for="movie in state.moviesTodayResult"
            :key="movie.id"
            class="movie__card"
          >
            <p class="movie__card-vote">{{ movie.vote_average }}</p>
            <div class="movie__card-wrapper">
              <img
                :src="
                  (test = `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                "
                :alt="movie.title"
                @mousemove="
                  test = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
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
      moviesTodayResult: [],
    });

    onMounted(() => {
      axios
        .get(
          `${state.apiUrl}/movie/now_playing?api_key=${state.apiKey}&language=ru-RU&region=RU`
        )
        .then((res) => {
          state.moviesToday = res.data;
          state.moviesTodayResult = state.moviesToday.results.slice(0, 10);
        });
    });
    return { state };
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/_vars.scss";

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
  margin: 0 1.25rem 1.875rem 0;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);

    .movie__card-about {
      opacity: 1;
    }

    img {
      filter: blur(1px);
    }
  }

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
    width: 100%;
    height: 100%;
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
    margin: 0 0 -1.25rem 0.625rem;
    padding-top: 0.313rem;
    position: relative;
    z-index: 1;
    width: 20%;
  }

  &-name-and-date{
    text-align: center;
  }
  &-name{
    margin: 0.625rem 0;
  }
}
</style>