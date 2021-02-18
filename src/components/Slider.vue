<template>
  <div class="slider">
    <button @click="prevSlide" class="slider__btn"></button>
    <div class="slider__wrapper"><card :data="slider_data" /></div>
    <button @click="nextSlide" class="slider__btn"></button>
  </div>
</template>

<script>
import card from "./Card";
export default {
  components: { card },
  props: {
    slider_data: Array,
  },
  data() {
    return {
      currentSlideIndex: 0,
    };
  },
  methods: {
    prevSlide() {
      this.currentSlideIndex > 0 ? this.currentSlideIndex-- : "";
    },
    nextSlide() {
      this.currentSlideIndex++;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  &__wrapper {
    display: flex;
    width: 150vw;
  }

  &__btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    width: 50px;
    height: 50px;
    background-image: url(../assets/img/right-arrow.svg);
    outline: none;
    position: absolute;
    top: 30%;
    left: 95%;
    transform: translate(-50%, -50%) ;
    z-index: 2;
    filter: drop-shadow(16px 16px 20px blue);
    &:first-child {
      transform: scaleX(-1) translate(-50%, -50%);
      left: -1%;
    }
  }
}
</style>