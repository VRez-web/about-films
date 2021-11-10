<template>
  <main v-if="!loading">
    <div class="container">
      <div class="home__slider">
        <h2 class="home__slider-title">Ежедневные тренды</h2>
        <sliderHome id="home" :data="trends"/>
      </div>
    </div>
  </main>
  <loader v-else/>
</template>

<script>
import SliderHome from "@/components/sliders/SliderHome";
import {trendsDay} from "@/services/trends";
import Loader from "@/components/app/Loader";

export default {
  components: {Loader, SliderHome},
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
}
</style>