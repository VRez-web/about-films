<template>
  <div class="career__item">
    <p class="career__item-date">{{ formattedDate(model) }}</p>
    <router-link :to="{name:route(model), params:{id:model.id}}" class="link career__item-link">
      {{ correctTitle(model) }}
    </router-link>
    <p class="career__item-job">({{ translateJob(model.job) }})</p>
    <div class="career__preview">
      <img :src="checkPoster(model.poster_path, '154')" alt="">
      <div class="career__preview-inner">
        <p class="career__preview-overview">{{ model.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  correctTitle,
  getYear,
  correctDate,
  checkPoster,
  checkMediaType,
  correctRouteName,
} from '@/utils/commonFunctions';
import { translateJob } from '@/utils/translater';

export default {
  props: {
    model: Object,
  },
  methods: {
    correctTitle,
    getYear,
    correctDate,
    translateJob,
    checkPoster,
    checkMediaType,

    formattedDate(item) {
      const correctDate = this.correctDate(item);
      return this.getYear(correctDate);
    },

    route(item) {
      const mediaType = checkMediaType(item);
      return correctRouteName(mediaType);
    },
  },
};
</script>
