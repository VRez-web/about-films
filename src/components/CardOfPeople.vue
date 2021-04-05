<template>
  <router-link
    :to="{ name: 'about-person', params: { id: data.id } }"
    class="card"
  >
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
  </router-link>
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
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.card {
  width: 100%;
  text-align: center;
  display: block;

  &__title {
    margin-bottom: 0.5rem;
  }
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
  margin: 0 1rem 1rem 0;

  img {
    height: 185px;
  }
}
.swiper-slide .card {
  margin-top: -2rem;
}
.search__total-inner {
  .card {
    width: 20%;
    margin-bottom: 1rem;
  }
}

@media (max-width: 400px) {
  .swiper-slide .card {
    img {
      width: 100%;
      height: auto;
    }
    &__character{
      padding:0 .5rem
    }
  }
}
</style>