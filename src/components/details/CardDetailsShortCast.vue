<template>
  <section class="card__details-about">
    <div class="container">
      <h2 class="card__details-title">В главных ролях</h2>
      <div class="card__details-cast">
        <slider :data="castSlider" :category="'people'" />
        <a
          href="#"
          @click.prevent="currectTitleLink(cardId)"
          class="all-cast link"
          >Полный актёрский и съёмочный состав</a
        >
      </div>
    </div>
  </section>
</template>

<script>
import cardOfPeople from "../CardOfPeople";
import slider from "../Slider";
export default {
  props: { cardId: String, castSlider: Array },
  components: { cardOfPeople, slider },
  data() {
    return {};
  },
  methods: {
    currectTitleLink(id) {
      this.$router
        .push({
          name: "card-details-cast",
          params: { id: id },
        })
        .catch((e) => {});
    },
  },
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
</style>