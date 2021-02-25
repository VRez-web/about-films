<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <h1>
          <router-link to="/" class="header__logo">
            about<span>Films</span>
          </router-link>
        </h1>
        <div class="header__group" @click="searchShow = !searchShow">
          <div class="header__search">
            <i class="icofont-search-2"></i>
            <span>Поиск</span>
          </div>
          <!-- <div class="header__login">
            <i class="icofont-user"></i>
          </div> -->
        </div>
      </div>
    </div>
  </header>
  <search v-if="searchShow" :searchShow="searchShow"/>
</template>

<script>
import search from "./Search";
export default {
  components: {
    search,
  },
  data() {
    return {
      searchShow: false,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";

.header {
  background-color: $bg-header;
  width: 100%;
  margin-bottom: 1.875rem;
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $color-white;
    height: 4.375rem;
  }

  &__logo {
    font-size: 2rem;
    font-weight: 900;
    color: $color-white;

    span {
      color: $color-tematic;
    }
  }

  &__group {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
  }

  &__search {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.3s linear;

    i {
      transition: all 0.3s linear;
      display: block;
      margin: 0 0.625rem 0 0;
    }

    &:hover {
      color: rgba(255, 255, 255, 1);

      i {
        transform: scale(1.3);
      }
    }
  }
  &__login {
    margin: 0 0 0 0.625rem;
    cursor: pointer;

    i {
      font-size: 1.5rem;
      transition: all 0.3s linear;
      border: 1px solid transparent;
      border-radius: 50%;
      padding: 0.625rem;
      display: block;
    }

    &:hover {
      color: rgba(255, 255, 255, 1);

      i {
        border: 1px solid $color-white;
        transform: rotateY(-180deg);
      }
    }
  }
}
</style>