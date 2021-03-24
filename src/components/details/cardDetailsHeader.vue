<template>
  <div class="card__details-header">
    <div class="container">
      <h2 class="card__details-title">
        <p>
          {{ dataTitle }} <span>({{ dateAnnounce }})</span>
        </p>

        <p class="card__details-status">
          Статус: <span> {{ statusProduction }} </span>
        </p>
      </h2>
      <p class="card__details-subtitle">
        <span class="card__details-age">{{ formattedAge }} </span>
        <span class="card__details-realese">{{ dateCheck }} (RU)</span>
        <span class="card__details-genres"
          ><span v-for="genre in genres" :key="genre.id">{{
            genre.name
          }}</span></span
        >
        <span class="card__details-time"
          >{{ movieTime() }} <i class="icofont-clock-time"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    dateAnnounce: String,
    age: String,
    dateRelease: String,
    genres: Array,
    time: Number,
  },
  data() {
    return {
      ageNone: "?__?",
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
      if (this.data.status == "Released") {
        return (this.dataStatus = "вышел");
      } else if (this.data.status == "Post Production") {
        return (this.dataStatus = "постпроизводство");
      } else if (this.data.status == "Returning Series") {
        return (this.dataStatus = "Продолжается");
      }else if(this.data.status == "Ended"){
        return this.dataStatus="Закончен"
      }
      return (this.dataStatus = "В производстве");
    },

    dataTitle(){
      return  this.data.title ? this.data.title : this.data.name
    },

    // Обработка возраста
    formattedAge() {
      return this.age ? this.age : this.ageNone;
    },

    // Обработка даты
    dateCheck() {
      return this.dateRelease ? this.dateRelease : this.data.release_date;
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
</style>