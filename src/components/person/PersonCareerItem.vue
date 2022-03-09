<template>
  <div class="career__item">
    <p class="career__item-date">{{ formattedDate(model) }}</p>
    <router-link :to="{name:route(model), params:{id:model.id}}" class="link career__item-link">
      {{ correctTitle(model) }}
    </router-link>
    <p class="career__item-job">({{ translateJob(model.job) }})</p>
    <CardPreview :model="model" />
  </div>
</template>

<script>
import {
  correctTitle,
  getYear,
  correctDate,
  checkPoster,
  checkMediaType,
  route,
} from '@/utils/commonFunctions';
import { translateJob } from '@/utils/translater';
import CardPreview from '../CardPreview';

export default {
  components: { CardPreview },
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
    route,

    formattedDate(item) {
      const correctDate = this.correctDate(item);
      return this.getYear(correctDate);
    },
  },
};
</script>
