<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <h1>
          <router-link :to="{ name: 'home' }" class="header__logo">
            About<span>films</span>
          </router-link>
        </h1>
        <div
            class="header__group"
            @click="openSearch"
        >
          <div class="header__search">
            <i class="icon-search"></i>
            <span>Поиск</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <search v-if="searchShow" :data="searchShow" @close="closeSearch"/>
</template>

<script>
import search from "./search/Search";

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
    closeSearch() {
      this.searchShow = false;
    },

    openSearch(){
      this.searchShow = true
    }
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
    height: 4.375rem;
  }

  &__logo {
    font-size: 2rem;
    font-weight: 900;
    transition: all 0.4s linear;

    span {
      color: $color-tematic;
      transition: all 0.4s linear;
    }

    &:hover {
      color: $color-tematic;

      span {
        color: $color-white;
      }
    }
  }

  &__group {
    display: flex;
    align-items: center;
    color: rgba($color-white, 0.5);
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

    span {
      position: relative;

      &::after {
        content: "";
        width: 0%;
        height: 0.125rem;
        background-color: $color-tematic;
        position: absolute;
        left: 0;
        bottom: -2px;
        transition: all 0.4s linear;
      }
    }

    &:hover {
      color: rgba($color-white, 1);

      i {
        transform: scale(1.3);
      }

      span {
        &::after {
          width: 100%;
        }
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
      color: rgba($color-white, 1);

      i {
        border: 1px solid $color-white;
        transform: rotateY(-180deg);
      }
    }
  }
}
</style>
