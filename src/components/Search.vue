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
            <label for="search" class="placeholder"
              >Фильмы, сериалы, персоны</label
            >
          </fieldset>
        </form>
        <div class="search__defolt-links" v-if="query == 0 && query == ''">
          <router-link to="/movies-popular" class="link" @click="close"
            >Популярные фильмы</router-link
          >
          <router-link to="/tvShows-popular" class="link" @click="close"
            >Популярные сериалы</router-link
          >
          <router-link to="/movies-topRated" class="link" @click="close"
            >Лучшие фильмы</router-link
          >
          <router-link to="/tvShows-topRated" class="link" @click="close"
            >Лучшие сериалы</router-link
          >
        </div>
        <div class="search__result">
          <card :data="result.results"/>
        </div>
        <p class="search__undefind" v-if="result.total_results == 0">
          По вашему запросу ничего не найдено
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import card from './Card'
import { mapActions } from "vuex";
export default {
  components:{card},
  data() {
    return {
      query: "",
      result: [],
    };
  },
  methods: {
    ...mapActions(["GET_SEARCH"]),
    close(data) {
      this.$emit("close", !data);
    },

    backOverflow() {
      document.body.classList.remove("search-open");
    },
  },
  computed:{
    getData() {
      this.GET_SEARCH(this.query).then((res) => {
        this.result = res;
        console.log(res);
      });
    },
  },
  updated() {
   this.getData
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
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
  color: $color-white;
  padding-top: 3.75rem;
  overflow-y: scroll;
  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: $color-white;
    margin-bottom: 1rem;
  }
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__inner {
    width: 60%;
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
  }
  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 1.3rem;
  }
  &__defolt-links {
    margin-top: 1rem;

    a {
      font-size: 1rem;
      display: block;
      margin-bottom: 1rem;
    }
  }
  &__undefind {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
}
</style>