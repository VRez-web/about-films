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
            <input type="text" v-model="query" id="search" @input="debounceSearch"/>
            <label for="search" :class="labelClasses"
            >Фильмы, сериалы, персоны</label
            >
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "../Card";
import CardOfPeople from "../CardOfPeople.vue";
import {multiSearch} from "@/services/search";

export default {
  components: {
    Card,
    CardOfPeople
  },
  data() {
    return {
      query: "",
      result: [],
      timeout: null,
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

    debounceSearch() {
      this.timeout = setTimeout(() => this.search(), 1000)
    },

    async search() {
      const result = await multiSearch(this.query)
      this.result = result
    }
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
        // this.getData();
      },
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
