<template>
  <section class="search">
    <span
        class="search__close link"
        @click="close">Назад</span>
    <div class="container">
      <div class="search__inner">
        <h2 class="search__title">Поиск</h2>
        <form @submit.prevent>
          <fieldset>
            <input type="text" v-model="query" id="search" @input="search" @change="getData"/>
            <label for="search" :class="labelClasses"
            >Фильмы, сериалы, персоны</label
            >
          </fieldset>
        </form>
        <div class="search__wrapper">
          <button
              v-for="tab in tabs"
              class="search__tab"
              :class="{'active':tab.name === currentStep}"
              @click="currentStep = tab.name"
          >
            {{ tab.title }}
          </button>
        </div>
        <component
            :is="currentStep"
            :movies="result.movies.list"
            :serials="result.serials.list"
            :persons="result.persons.list"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SearchMovieTab from "@/components/search/tab/SearchMovieTab"
import SearchSerialTab from "@/components/search/tab/SearchSerialTab";
import SearchPersonTab from "@/components/search/tab/SearchPersonTab";
import {multiSearch, searchMovies, searchPerson, searchSerials} from "@/services/search";

export default {
  components: {
    SearchMovieTab,
    SearchSerialTab,
    SearchPersonTab
  },
  data() {
    return {
      query: "",
      dropdown: [],
      currentStep: 'searchMovieTab',
      tabs: [
        {name: 'searchMovieTab', title: 'Фильмы'},
        {name: 'SearchSerialTab', title: 'Сериалы'},
        {name: 'SearchPersonTab', title: 'Люди'},
      ],
      result: {
        movies: {
          list: [],
          total: 0
        },
        serials: {
          list: [],
          total: 0
        },
        persons: {
          list: [],
          total: 0
        }
      }
    };
  },
  created() {
    document.body.style = 'overflow:hidden;'
  },
  unmounted() {
    clearTimeout(this.timeout)
    document.body.style = 'overflow:auto;'
  },
  methods: {
    close() {
      this.$emit("close");
    },

    async search() {
      if (this.query.length === 0) return
      const result = await multiSearch(this.query)
      this.dropdown = result
    },

    getData() {
      this.searchMovies()
      this.searchSerials()
      this.searchPersons()
    },

    async searchMovies() {
      const movies = await searchMovies(this.query)
      this.result.movies = {list: movies.results.slice(0, 10), total: movies.total_results}
    },

    async searchSerials() {
      const serials = await searchSerials(this.query)
      this.result.serials = {list: serials.results.slice(0, 10), total: serials.total_results}
    },

    async searchPersons() {
      const persons = await searchPerson(this.query)
      this.result.persons = {list: persons.results.slice(0, 10), total: persons.total_results}
    },
  },
  computed: {
    labelClasses() {
      return !!this.query ? "placeholder-show" : "placeholder";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";

.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-black, 0.9);
  z-index: 99;
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

  &__tab {
    position: relative;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    font-weight: 500;
    color: $color-white;
    cursor: pointer;
    padding: 0;

    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $color-tematic;
      }
    }
  }

  &__list {
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 3rem 2rem;
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

@media (max-width: 1200px) {
  .search {
    &__inner {
      width: 70%;
    }

    &__result {
      &-item {
        width: 30%;
      }
    }
  }
}

@media (max-width: 1000px) {
  .search {
    &__inner {
      width: 90%;
    }
  }
}

@media (max-width: 800px) {
  .search {
    &__result {
      &-item {
        width: 40%;
      }
    }
  }
}

@media (max-width: 500px) {
  .search {
    &__inner {
      width: 100%;
    }

    &__result {
      &-item {
        width: 43%;
      }
    }

    &__close {
      position: absolute;
    }

    .link {
      font-size: 1.3rem;
    }
  }
}
</style>
