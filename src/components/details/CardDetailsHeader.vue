<template>
  <div class="card__details-header">
    <div class="container">
      <h2 class="card__details-title">
        <p>
          {{ title }} <span>({{ dateAnnounce }})</span>
        </p>

        <p class="card__details-status">
          Статус: <span> {{ statusProduction }} </span>
        </p>
      </h2>
      <p class="card__details-subtitle">
        <span class="card__details-age">{{ ageCheck }} </span>
        <span class="card__details-realese"
          >{{ dateRelease }} ({{ countryCheck }})</span
        >
        <span class="card__details-genres"
          ><span v-for="genre in genres" :key="genre.id">{{
            genre.name
          }}</span></span
        >
        <span class="card__details-time" v-show="!!time"
          >{{ movieTime() }} <i class="icofont-clock-time"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dateAnnounce: String,
    age: String,
    dateRelease: String,
    genres: Array,
    time: Number,
    country: String,
    status: String,
    title: String,
  },
  data() {
    return {
      ageNone: "?",
    };
  },

  methods: {
    // Вычисление времени фильма/сериала
    movieTime(time) {
      let result = 0;
      time = this.time;
      for (let i = 0; 60 <= time; i++) {
        result += 1;
        time -= 60;
      }

      return `${result} ч ${time} м`;
    },
  },
  computed: {
    //   На какой стадии находиться фильм/сериал
    statusProduction() {
      if (this.status == "Released") {
        return "вышел";
      }
      if (this.status == "Post Production") {
        return "постпроизводство";
      }
      if (this.status == "Returning Series") {
        return "Продолжается";
      }
      if (this.status == "Ended") {
        return "Закончен";
      }
      if (this.status == "Canceled") {
        return "Отменен";
      }
      return "В производстве";
    },
    ageCheck() {
      return !!this.age ? this.age : this.ageNone;
    },
    countryCheck() {
      return !!this.country ? this.country : "RU";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  &-title {
    font-size: 2rem;
    margin-bottom: 0.625rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    span {
      font-weight: 300;
      font-size: 1.4rem;
    }
  }

  &-status {
    font-size: 1.5rem;

    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.3rem;
    }
  }

  &-subtitle {
    margin-bottom: 1.5rem;
  }

  //    Стили для возраста
  &-age {
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.6);
    padding: 0 0.125rem 0.125rem 0.125rem;
    margin-right: 0.625rem;
    min-width: 35px;
    text-align: center;
  }

  //   Стили для жанров
  &-genres {
    &::after {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: $color-tematic;
      border-radius: 50%;
      margin: 0 0.625rem;
      vertical-align: middle;
    }
    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: $color-tematic;
      border-radius: 50%;
      margin: 0 0.625rem;
      vertical-align: middle;
    }
    span {
      &:nth-child(2) {
        margin: 0 0.625rem;
      }

      &::after {
        content: ",";
        display: inline-block;
      }
      &:last-child::after {
        content: "";
      }
    }
  }
}
@media (max-width: 850px) {
  .card__details {
    &-title {
      flex-direction: column;
      align-items: flex-start;
    }

    &-status {
      margin: 0.5rem 0;
    }
  }
}
@media (max-width: 700px) {
  .card__details {
    &-subtitle {
      display: flex;
      flex-wrap: wrap;
      span {
        &:nth-child(3) {
          order: 4;
          margin-top: 0.5rem;
        }
        &:nth-child(4) {
          margin-left: 1rem;
        }
      }
    }
  }
}
@media (max-width: 400px) {
  .card__details {
    &-title {
      font-size: 1.5rem;

      p {
        &:first-child {
          span {
            font-size: 1.4rem;
          }
        }
      }
    }
    &-genres {
      span {
        &:nth-child(2) {
          margin: 0 0.2rem;
        }
      }
      &::before {
        margin: 0 0.5rem 0 0;
      }
      &::after {
        margin: 0 0 0 0.5rem;
      }
    }
  }
}
</style>
