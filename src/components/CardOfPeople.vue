<template>
  <router-link
      :to="{ name: 'about-person', params: { id: model.id } }"
      class="card__people"
  >
    <img
        :src="
        model.profile_path
          ? imgProfile + model.profile_path
          : require('@/assets/img/no-avatar-person.jpg')
      "
        :alt="model.name"
    />
    <div class="card__people-description">
      <p class="card__people-title">{{ model.name }}</p>
      <p class="card__people-character" v-if="!!model.character">
        {{ model.character }}
      </p>
      <p class="card__people-job" v-if="!!model.job">
        {{ model.job }}
      </p>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    model: Object,
  },
  data() {
    return {
      imgProfile: this.$store.state.imgProfileSize,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/_vars.scss";

.card__people {
  width: 100%;
  text-align: center;
  display: block;

  &-title {
    margin-bottom: 0.5rem;
  }

  img {
    border-radius: 0.625rem;
    margin-bottom: 1rem;
    max-width: 185px;
    height: 278px;
  }

  &-character {
    padding: 0 1.5rem;
    line-height: 20px;
  }
}
</style>
