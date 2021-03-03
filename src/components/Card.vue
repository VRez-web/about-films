<template>
  <div class="card" v-for="item in data" :key="item.id">
    <router-link
      :to="{
        name: 'card-details',
        params: {
          id: `${item.id}`,
          title: `${
            item.title
              ? item.title.replace(/\s/g, '-')
              : (item.title = item.name)
          }`,
        },
      }"
    >
      <p
        class="card__vote"
        :class="
          item.vote_average >= 7
            ? 'high-rating'
            : item.vote_average < 7 && item.vote_average > 3
            ? 'mid-rating'
            : item.vote_average <= 3
            ? 'low-rating'
            : ''
        "
      >
        {{ item.vote_average }}
      </p>
      <div class="card__wrapper">
        <img
          :src="
            item.poster_path
              ? imgUrl + item.poster_path
              : require('@/assets/img/no-poster.jpg')
          "
          :alt="item.title"
        />
        <div class="card__about">
          <p class="card__details">Подробнее <i class="icofont-link"></i></p>
        </div>
      </div>
      <div class="card-name-and-date">
        <p
          class="card__name"
          v-if="item.title ? item.title : (item.title = item.name)"
        >
          {{ item.title }}
        </p>
        <p
          v-if="
            item.release_date
              ? item.release_date
              : (item.release_date = item.first_air_date)
          "
        >
          {{
            (item.release_date = item.release_date
              .split("")
              .slice(0, 4)
              .join(""))
          }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      imgUrl: this.$store.getters.IMG_URL,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.card {
  width: 18%;
  color: $color-white;
  margin: 0 1.25rem 2.5rem 0;
  transition: all 0.3s linear;
  cursor: pointer;
  font-size: 1rem;
  min-height: 400px;

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
  }
  img {
    width: 100%;
    height: auto;
    min-height: 350px;
    max-height: 350px;
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
  }

  &-name-and-date {
    text-align: center;
  }
  &__name {
    margin: 0.625rem 0;
  }
}
.swiper-slide{ 
  .card{
    width: 100%;
  }
}
.search{
  .card{
    width: 22%;
  }
}
</style>