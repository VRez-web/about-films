<template>
  <main v-if="!loading">
    <div class="container">
      <HomeSlider id="home" :data="trends"/>
      <HomePopular/>
    </div>
  </main>
  <loader v-else/>
</template>

<script>
import HomeSlider from "@/components/home/HomeSlider";
import {trendsDay} from "@/services/trends";
import Loader from "@/components/app/Loader";
import HomePopular from "@/components/home/HomePopular";

export default {
  components: {HomePopular, Loader, HomeSlider},
  data() {
    return {
      trends: [],
      loading: true,
    };
  },
  methods: {},
  computed: {},
  async created() {
    const trends = await trendsDay()
    this.trends = !!trends.results.length ? trends.results.slice(0, 10) : null
    this.loading = false
  }
};
</script>


<style lang="scss">
@import "../assets/scss/_vars.scss";
@import "../assets/scss/_global.scss";

.home {
  &__slider {
    max-width: 1000px;
    margin: 0 auto;

    &-title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  &__section {
    margin-bottom: 4rem;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 2rem;
  }

  &__tabs {
    width: 20%;
    display: flex;
    align-items: center;
    gap: 0 20px;
    margin-left: 3rem;
    border-bottom: 1px solid #f9f9f9;
    padding-bottom: 3px;
  }

  &__tab {
    position: relative;
    border: none;
    background: transparent;
    font-size: 1.2rem;
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

  &__section {
    margin-top: 4rem;
  }
}
</style>