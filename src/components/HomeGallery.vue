<template>
  <section class="home__gallery">
    <h2 class="home__gallery-title">
      <router-link :to="{ name: link }" class="link">{{ title }}</router-link>
      <i class="icon-right"></i>
    </h2>
    <slider :data="dataSlider" :id="id" :category="category" />
  </section>
</template>

<script>
import slider from "@/components/Slider";

export default {
  components: { slider },
  props: {
    title: String,
    link: String,
    id: String,
    dataSlider: Object,
    category: String,
  },
};
</script>

<style>
</style>
