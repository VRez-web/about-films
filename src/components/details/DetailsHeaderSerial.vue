<template>
  <div :class="$style.details__header">
    <div class="container">
      <div :class="$style['details__header-wrapper']">
        <h2 :class="$style['details__header-title']">
          {{ model.name }} <span>({{ formattedYear }})</span>
        </h2>
        <p :class="$style['details__header-status']">
          Статус: <span> {{ statusProduction }} </span>
        </p>
      </div>
      <p :class="$style['details__header-subtitle']">
        <span :class="$style['details__header-age']">{{ age }} </span>
        <span :class="$style['details__header-release']"
        >{{ formattedDateRelease }} ({{ country }})</span>
        <span :class="$style['details__header-genres']"
        ><span v-for="genre in genres" :key="genre.id">
          {{ genre.name }}
        </span></span>
        <span :class="$style['details__header-time']" v-show="!!model.runtime"
        >{{ movieTime() }} <i class="icofont-clock-time"></i>
              </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: Object
  },
  data() {
    return {
      ageNone: "?",
      age: null,
      dateRelease: null,
      formattedDateRelease: null
    };
  },
  created() {
    this.getDateRelease()
    this.formattedDate()
  },
  methods: {
    movieTime() {
      let result = 0,
          time = this.model.runtime
      for (let i = 0; 60 <= time; i++) {
        result += 1
        time -= 60
      }

      return `${result} ч ${time} м`
    },

    getDateRelease() {
      const dateRelease = this.model.content_ratings.results.filter(el => el.iso_3166_1 === this.country)
      this.age = dateRelease[0].rating
      this.dateRelease = this.model.first_air_date
    },

    formattedDate() {
      const days = this.dateRelease.slice(8, 10),
          month = this.dateRelease.slice(5, 7),
          year = this.dateRelease.slice(0, 4)

      this.formattedDateRelease = `${days}/${month}/${year}`
    }
  },
  computed: {
    statusProduction() {
      if (this.model.status === "Released") {
        return "вышел"
      }
      if (this.model.status === "Post Production") {
        return "постпроизводство"
      }
      if (this.model.status === "Returning Series") {
        return "Продолжается"
      }
      if (this.model.status === "Ended") {
        return "Закончен"
      }
      if (this.model.status === "Canceled") {
        return "Отменен"
      }
      return "В производстве"
    },

    country() {
      return this.model.origin_country[0]
    },

    formattedYear() {
      return this.model.last_air_date.slice(0, 4)
    },

    genres() {
      return this.model.genres.slice(0, 3)
    }
  },
};
</script>

<style lang="scss" module>
@import "src/assets/scss/vars";

.details {
  &__header {
    &-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      @media (max-width: 850px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &-title {
      font-size: 2rem;
      margin-bottom: 0.625rem;
      font-weight: 700;

      span {
        font-weight: 300;
        font-size: 1.4rem;
      }

      @media (max-width: 400px) {
        font-size: 1.5rem;
      }
    }

    &-status {
      font-size: 1.5rem;

      span {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.3rem;

        @media (max-width: 400px) {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 850px) {
        margin: 0.5rem 0;
      }
    }

    &-subtitle {
      margin-bottom: 1.5rem;

      @media (max-width: 700px) {
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

    &-age {
      border: 1px solid rgba(255, 255, 255, 0.6);
      color: rgba(255, 255, 255, 0.6);
      padding: 0 0.125rem 0.125rem 0.125rem;
      margin-right: 0.625rem;
      min-width: 35px;
      text-align: center;
    }

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

        @media (max-width: 400px) {
          margin: 0 0.5rem 0 0;
        }
      }

      span {
        &:nth-child(2) {
          margin: 0 0.625rem;

          @media (max-width: 400px) {
            margin: 0 0.2rem;
          }
        }

        &::after {
          content: ",";
          display: inline-block;

          @media (max-width: 400px) {
            margin: 0 0 0 0.5rem;
          }
        }

        &:last-child::after {
          content: "";
        }
      }
    }
  }
}
</style>
