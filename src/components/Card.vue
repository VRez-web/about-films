<template>
  <router-link
    class="card"
    v-for="item in data"
    :key="item.id"
    :to="{
      name: correctRouteName(category),
      params: { id: `${item.id}` },
    }"
  >
    <p class="card__vote" :class="checkVote(item.vote_average)">
      {{ voteCorrect(item) }}
    </p>
    <div class="card__wrapper">
      <img
        :src="checkPoster(item.poster_path)"
        :alt="item.title"
        loading="lazy"
      />
      <div class="card__about">
        <p class="card__details">Подробнее <i class="icofont-link"></i></p>
      </div>
    </div>
    <div class="card-name-and-date">
      <p class="card__name" v-if="item.title || item.name">
        {{ correctTitle(item) }}
      </p>
      <p
        v-if="
          item.release_date
            ? item.release_date
            : (item.release_date = item.first_air_date)
        "
      >
        {{ formatDate(item) }}
      </p>
    </div>
  </router-link>
</template>

<script>
import {
  correctRouteName,
  checkVote,
  checkPoster,
  correctTitle,
} from "@/utils/commonFunctions";

export default {
  props: {
    data: Array,
    category: String,
  },
  methods: {
    voteCorrect(item) {
      return item.vote_average === 0
        ? (item.vote_average = "NR")
        : item.vote_average;
    },
    formatDate(item) {
      return item.release_date.split("").slice(0, 4).join("");
    },
  },
  computed: {
    correctRouteName() {
      return correctRouteName;
    },
    checkVote() {
      return checkVote;
    },
    checkPoster() {
      return checkPoster;
    },
    correctTitle() {
      return correctTitle;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.card {
  width: 18%;
  margin: 0 1.25rem 2.5rem 0;
  transition: all 0.3s linear;
  cursor: pointer;
  font-size: 1rem;
  min-height: 350px;
  display: block;
  &:hover {
    transform: scale(1.05);

    .card__about {
      opacity: 1;
    }

    img {
      filter: blur(1px);
    }
  }
  a {
    color: inherit;
    display: block;
  }
  img {
    width: 100%;
    height: auto;
    min-height: 300px;
    max-height: 300px;
    display: block;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
  }
  &__wrapper {
    position: relative;
  }

  &__about {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      width: 100%;
      text-align: center;
    }
  }
  &__vote {
    margin: 0 0 -3rem 0;
    padding: 0.313rem 0;
    position: relative;
    z-index: 1;
    width: 20%;
    text-align: center;
    font-weight: 700;

    &.high-rating {
      background-color: $bg-highRating;
    }
    &.mid-rating {
      background-color: $bg-midRating;
    }
    &.low-rating {
      background-color: $bg-lowRating;
    }
    &.no-rating {
      background-color: $bg-noRating;
    }
  }

  &-name-and-date {
    text-align: center;
  }
  &__name {
    margin: 0.625rem 0;
  }
}
.swiper-slide {
  .card {
    width: 100%;
  }
}
.search {
  .card {
    width: 100%;
  }
}
@media (max-width: 1200px) {
  .card {
    width: 22%;
    margin-right: 0;
  }
}
@media (max-width: 1000px) {
  .section__inner .card {
    width: 23%;
    min-height: auto;

    img {
      max-height: none;
      min-height: auto;
    }
  }
}
@media (max-width: 800px) {
  .section__inner .card {
    width: 31%;
  }
}
@media (max-width: 700px) {
  .card {
    min-height: auto;
    img {
      max-height: none;
      min-height: auto;
    }
  }
}
@media (max-width: 550px) {
  .swiper-slide {
    .card {
      width: 100%;
      margin: 0 auto;
    }
  }
  .section__inner .card {
    width: 45%;
  }
}
</style>
