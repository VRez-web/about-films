<template>
  <section class="search">
    <span class="search__close link" @click="close">Назад</span>
    <div class="container">
      <div class="search__inner">
        <h2 class="search__title">Поиск</h2>
        <form>
          <input type="text" placeholder="Фильмы, сериалы, жанры, персоны" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: { data: Boolean },
  data() {
    return {};
  },
  methods: {
    close(data) {
      this.$emit("close", !data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
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
  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: $color-white;
    margin-bottom: 1rem;
  }
  &__inner {
    width: 60%;
    margin: 0 auto;

    input {
      width: 100%;
      border: 2px solid transparent;
      border-radius: 0.313rem;
      padding: 0.625rem;
      outline: none;
      transition: all 0.5s linear;
      color: $color-tematic;
      font: 500 1rem "Roboto";

      &::placeholder {
        font: inherit;
        color: inherit;
      }

      &:hover,
      &:focus {
        border: 2px solid $color-tematic;
      }
    }
  }
  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 1.3rem;
  }
}
</style>