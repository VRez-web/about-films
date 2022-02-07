<template>
  <router-link
      :to="{ name: 'person-id', params: { id: model.id } }"
      class="card__people"
      :class="{'card__people-small':small}"
  >
    <img :src="checkProfileImg(model.profile_path)" :alt="model.name"/>
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
import {checkProfileImg} from "@/utils/commonFunctions";

export default {
  props: {
    model: Object,
    small: Boolean
  },
  methods: {
    checkProfileImg
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/_vars.scss";

.card__people {
  width: 100%;
  text-align: center;
  display: block;

  img {
    border-radius: 0.625rem;
    margin-bottom: 1rem;
    max-width: 185px;
    height: 278px;
  }

  &-small {
    font-size: .9rem;
    font-weight: 500;

    img {
      max-width: 120px;
      height: auto;
    }
  }

  &-title {
    margin-bottom: 0.5rem;
  }

  &-character {
    padding: 0 1.5rem;
    line-height: 20px;
  }
}
</style>
