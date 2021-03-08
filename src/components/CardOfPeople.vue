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
    <p class="card__title">{{ data.name }}</p>
    <p class="card__character">{{ data.character }}</p>
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

  mounted() {},
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  text-align: center;
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
</style>