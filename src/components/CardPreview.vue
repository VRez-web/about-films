<template>
  <div class="career__preview">
    <img :src="checkPoster(model.poster_path, '154')" alt="">
    <div class="career__preview-inner">
      <p class="career__preview-overview">{{ model.overview }}</p>
      <div class="career__preview-stats">
        <div class="career__preview-item">
          <p class="career__preview-title">Рейтинг</p>
          <p class="career__preview-stat" :class="checkVote(model.vote_average)">
            {{ voteCorrect }}
          </p>
        </div>
        <div class="career__preview-item">
          <p class="career__preview-title">Голоса</p>
          <p class="career__preview-stat">
            {{ model.vote_count }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPoster, checkVote } from '@/utils/commonFunctions';

export default {
  props: {
    model: Object,
  },
  computed: {
    voteCorrect() {
      return this.model.vote_average === 0 ? 'NR' : this.model.vote_average.toFixed();
    },
  },
  methods: {
    checkPoster,
    checkVote,
  },
};
</script>
