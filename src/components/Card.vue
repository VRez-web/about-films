<template>
  <router-link
      class="card"
      :to="{
        name: correctRouteName(mediaType),
        params: { id: model.id },
      }"
  >
    <p class="card__vote" :class="checkVote(model.vote_average)">
      {{ voteCorrect }}
    </p>
    <div class="card__wrapper">
      <img
          :src="checkPoster(model.poster_path)"
          :alt="model.title"
          loading="lazy"
      />
      <div class="card__about">
        <p class="card__details">Подробнее <i class="icofont-link"></i></p>
      </div>
    </div>
    <div class="card-name-and-date">
      <p class="card__name"> {{ title }} </p>
      <p> {{ formatDate }} </p>
    </div>
  </router-link>
</template>

<script>
import {checkPoster, checkVote, correctRouteName,} from "@/utils/commonFunctions";

export default {
  props: {
    model: Object,
    mediaType: String
  },
  data() {
    return {
      date: this.model.release_date || this.model.first_air_date,
      title: this.model.title || this.model.name
    }
  },
  methods: {
    correctRouteName,
  },
  computed: {
    checkVote() {
      return checkVote;
    },

    checkPoster() {
      return checkPoster;
    },

    formatDate() {
      return this.date.split("").slice(0, 4).join("");
    },

    voteCorrect() {
      return this.model.vote_average === 0 ? "NR" : Math.floor(this.model.vote_average);
    },
  },
};
</script>

