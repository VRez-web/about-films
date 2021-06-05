<template>
  <section class="card__details-about">
    <div class="container">
      <h2 class="card__details-title">В главных ролях</h2>
      <div class="card__details-cast">
        <slider :data="shortCast" :category="'people'" />
        <router-link
          :to="{
            name: 'card-details-cast',
            params: { id: cardId, category: category },
          }"
          class="all-cast link"
          >Полный актёрский и съёмочный состав</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import cardOfPeople from "../CardOfPeople";
import slider from "../Slider";
export default {
  props: { cardId: String, cast: Array, category: String },
  components: { cardOfPeople, slider },
  data() {
    return {};
  },
  computed: {
    shortCast() {
      return this.cast.slice(0, 9);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  &-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  &-cast {
    &-more {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 1.3rem;
    }
  }
}
.all-cast {
  font-size: 1.2rem;
  margin-top: 1rem;
}
.card__details-about {
  &-title {
    margin: 1rem 0;
  }
}

@media (max-width: 400px) {
  .all-cast {
    font-size: 0.9rem;
  }
}
</style>
