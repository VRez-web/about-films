<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link to="/" class="header__logo">
          about<span>Films</span>
        </router-link>
        <div class="header__group">
          <div class="header__search">
            <i class="icofont-search-2"></i>
            <span>Поиск</span>
          </div>
          <div class="header__login">
            <i class="icofont-user"></i>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/_vars.scss";

.header {
  background-color: $bg-header;
  width: 100%;

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
      color: #6495ed;
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