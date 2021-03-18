<template>
  <div class="card">
    <img
      :src="
        data.profile_path
          ? imgProfile + data.profile_path
          : require('@/assets/img/no-avatar-person.jpg')
      "
      :alt="data.name"
    />
    <div class="card__description">
      <p class="card__title">{{ data.name }}</p>
      <p class="card__character" v-if="!!data.character">
        {{ data.character }}
      </p>
      <p class="card__job" v-if="!!data.job">{{ data.job }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      imgProfile: this.$store.state.imgProfileSize,
    };
  },
  mounted() {
    console.log(this.data);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.card {
  width: 100%;
  text-align: center;
  color: $color-white;
  img {
    border-radius: 0.625rem;
    margin-bottom: 1rem;
    max-width: 185px;
    height: 278px;
  }
  &__character {
    padding: 0 1.5rem;
    line-height: 20px;
  }
}

.search .card {
  margin-bottom: 1rem;
}
.cast .card {
  width: 13%;
  text-align: center;
  margin-bottom: 1rem;
  img {
    height: 185px;
  }

}
</style>