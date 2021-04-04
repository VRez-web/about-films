<template>
  <section class="search">
    <span
      class="search__close link"
      @click="
        close(data);
        backOverflow();
      "
      >Назад</span
    >
    <div class="container">
      <div class="search__inner">
        <h2 class="search__title">Поиск</h2>
        <form @submit.prevent>
          <fieldset>
            <input type="text" v-model="query" id="search" />
            <label for="search" :class="labelClasses"
              >Фильмы, сериалы, персоны</label
            >
          </fieldset>
        </form>
        <div class="search__defolt-links" v-if="query == 0 && !query">
          <div class="search__defolt-item" @click="close(), backOverflow()">
            <router-link :to="{ name: 'movies-popular' }" class="link"
              >Популярные фильмы</router-link
            >
          </div>
          <div class="search__defolt-item" @click="close(), backOverflow()">
            <router-link :to="{ name: 'serials-popular' }" class="link"
              >Популярные сериалы</router-link
            >
          </div>

          <div class="search__defolt-item" @click="close(), backOverflow()">
            <router-link :to="{ name: 'movies-topRated' }" class="link"
              >Лучшие фильмы</router-link
            >
          </div>

          <div class="search__defolt-item" @click="close(), backOverflow()">
            <router-link :to="{ name: 'serials-topRated' }" class="link"
              >Лучшие сериалы</router-link
            >
          </div>
        </div>
        <div class="search__result" v-if="!!query">
          <h2 class="search__result-total">
            Найдено
            {{ result.total_results }}
          </h2>
          <div
            class="search__result-movies search__result-wrapper"
            v-if="resultMovie != 0 && !!query"
          >
            <h2 class="search__result-title">Фильмы:</h2>
            <div class="search__result-inner">
              <div
                class="search__result-item"
                v-for="item in resultMovie"
                :key="item.id"
                @click="close(), backOverflow()"
              >
                <card :data="[item]" :category="'movie'" />
              </div>
            </div>
            <div class="link-wrapper" @click="close(), backOverflow()">
              <router-link
                :to="{
                  name: 'search-total',
                  params: { title: 'movie', query: query },
                }"
                class="link"
                v-show="resultMovie.length == 8"
                >Посмотреть все результаты</router-link
              >
            </div>
          </div>

          <div
            class="search__result-tv search__result-wrapper"
            v-if="resultTv != 0 && !!query"
          >
            <h2 class="search__result-title">Сериалы:</h2>
            <div class="search__result-inner">
              <div
                class="search__result-item"
                v-for="item in resultTv"
                :key="item.id"
                @click="close(), backOverflow()"
              >
                <card :data="[item]" :category="'serial'" />
              </div>
            </div>
            <div class="link-wrapper" @click="close(), backOverflow()">
              <router-link
                :to="{
                  name: 'search-total',
                  params: { title: 'serial', query: query },
                }"
                class="link"
                v-show="resultTv.length == 8"
                >Посмотреть все результаты</router-link
              >
            </div>
          </div>

          <div
            class="search__result-person search__result-wrapper"
            v-if="resultPerson != 0 && !!query"
          >
            <h2 class="search__result-title">Люди:</h2>
            <div class="search__result-inner">
              <div
                class="search__result-item"
                v-for="item in resultPerson"
                :key="item.id"
                @click="close(), backOverflow()"
              >
                <card-of-people :data="item" />
              </div>
            </div>
            <div class="link-wrapper" @click="close(), backOverflow()">
              <router-link
                :to="{
                  name: 'search-total',
                  params: { title: 'person', query: query },
                }"
                class="link"
                v-show="resultPerson.length == 8"
                >Посмотреть все результаты</router-link
              >
            </div>
          </div>
        </div>
        <p class="search__undefind" v-if="result.total_results == 0">
          По вашему запросу ничего не найдено
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import card from "../Card";
import { mapActions } from "vuex";
import CardOfPeople from "../CardOfPeople.vue";
export default {
  components: { card, CardOfPeople },
  data() {
    return {
      query: "",
      result: [],
      resultMovie: [],
      resultMovieTotal: "",
      resultTv: [],
      resultTvTotal: "",
      resultPerson: [],
      resultPersonTotal: "",
      currentPage: 1,
      totalPages: 0,
    };
  },
  methods: {
    ...mapActions("multiSearch", ["GET_SEARCH"]),
    ...mapActions("searchMovies", ["GET_SEARCH_MOVIES"]),
    ...mapActions("searchSerials", ["GET_SEARCH_SERIALS"]),
    ...mapActions("searchPerson", ["GET_SEARCH_PERSON"]),
    close(data) {
      this.$emit("close", !data);
    },

    backOverflow() {
      document.body.classList.remove("search-open");
    },
    // Получение данных по запросу
    async getData() {
      // делаем только если строка не пуста
      if (!!this.query) {
        const GET_SEARCH = await this.GET_SEARCH({ query: this.query });
        this.result = GET_SEARCH;
        this.totalPages = this.result.total_pages;
        // преобразуем число в строку, чтобы правильно склонять слово "совпадение" в зависимости
        //  от результата и прибовлять его к нашему результату
        this.result.total_results = this.result.total_results.toString();

        this.resultTv = [];
        this.resultMovie = [];
        this.resultPerson = [];

        // пробегаем по данным, чтобы их распределить по нужным переменным
        this.resultMovie = this.result.results
          .filter((el) => el.media_type == "movie")
          .slice(0, 8);
        this.resultTv = this.result.results
          .filter((el) => el.media_type == "tv")
          .slice(0, 8);
        this.resultPerson = this.result.results
          .filter((el) => el.media_type == "person")
          .slice(0, 8);

        if (this.resultMovie.length !== 8) {
          let GET_SEARCH_MOVIES = await this.GET_SEARCH_MOVIES({
            query: this.query,
            page: this.currentPage,
          });
          this.resultMovie = GET_SEARCH_MOVIES.results.slice(0, 8);
        }

        if (this.resultTv.length !== 8) {
          let GET_SEARCH_TV = await this.GET_SEARCH_SERIALS({
            query: this.query,
            page: this.currentPage,
          });
          this.resultTv = GET_SEARCH_TV.results.slice(0, 8);
        }
        if (this.resultPerson.length !== 8) {
          let GET_SEARCH_PERSON = await this.GET_SEARCH_PERSON({
            query: this.query,
            page: this.currentPage,
          });
          this.resultPerson = GET_SEARCH_PERSON.results.slice(0, 8);
        }
      }
    },
  },
  computed: {
    labelClasses() {
      return !!this.query ? "placeholder-show" : "placeholder";
    },
  },
  watch: {
    query: {
      immediate: true,
      handler: function () {
        this.getData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
body {
  overflow: hidden;
}
.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2;
  padding-top: 3.75rem;
  overflow-y: scroll;
  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__inner {
    width: 65%;
    margin: 0 auto;
    z-index: 2;
    fieldset {
      position: relative;
    }

    input {
      width: 100%;
      border: 2px solid transparent;
      border-radius: 0.313rem;
      padding: 0.625rem 0.625rem 0 0.625rem;
      height: 40px;
      outline: none;
      transition: all 0.5s linear;
      color: $color-tematic;
      font: 500 1rem "Roboto";
      &:not() {
        border: 1px solid red;
      }
      &:hover,
      &:focus {
        border: 2px solid $color-tematic;
      }

      &:focus {
        + .placeholder {
          font-size: 0.875rem;
          top: 20%;
        }
      }
    }
  }
  .placeholder {
    color: $color-tematic;
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translate(0%, -50%);
    transition: all 0.5s linear;

    &-show {
      font-size: 0.875rem;
      left: 2%;
      top: 20%;
      color: $color-tematic;
      position: absolute;
      transform: translate(0%, -50%);
      transition: all 0.5s linear;
    }
  }
  &__close {
    position: fixed;
    right: 30px;
    top: 20px;
    cursor: pointer;
    font-size: 1.3rem;
  }
  &__defolt {
    &-item {
      width: fit-content;

      a {
        font-size: 1rem;
        display: block;
        margin-bottom: 1rem;
      }
    }
    &-links {
      margin-top: 1rem;
    }
  }
  &__undefind {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  &__result {
    padding-top: 2rem;

    &-inner {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      width: 22%;
      margin-right: 1.25rem;
    }

    &-wrapper {
      padding-bottom: 1rem;
    }
    &-title {
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
    }
    &-total {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>