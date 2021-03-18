<template>
  <section class="cast__header">
    <div class="container">
      <div class="cast__header-inner">
        <div class="cast__card">
          <img :src="imgUrl + cardDetails.poster_path" alt="" />
        </div>
        <div class="cast__header-description">
          <h2 class="cast__header-title">
            {{ cardDetails.title }} <span>({{ correctDate }})</span>
          </h2>
          <a href="#" class="link" @click.prevent="back">Назад на главную</a>
        </div>
      </div>
    </div>
  </section>
  <section class="cast">
    <div class="container">
      <div class="cast__inner">
        <h2 class="cast__title">
          Актёрский состав <span>{{ cardDetails.credits.cast.length }}</span>
        </h2>
        <div class="cast__people">
          <div class="cast__people-inner">
            <card-of-people
              :data="actor"
              v-for="actor in actors"
              :key="actor.id"
            />
          </div>
        </div>

        <h2 class="cast__title">
          Съёмочный состав <span>{{ cardDetails.credits.crew.length }}</span>
        </h2>
        <h4 class="cast__subtitle">Режиссура</h4>
        <div class="cast__people-inner">
          <card-of-people
            :data="people"
            v-for="people in directors"
            :key="people.id"
          />
        </div>
        <h4 class="cast__subtitle">Сценарий</h4>
        <div class="cast__people-inner">
          <card-of-people
            :data="people"
            v-for="people in scenario"
            :key="people.id"
          />
        </div>
        <h4 class="cast__subtitle">Продакшн</h4>
        <div class="cast__people-inner">
          <card-of-people
            :data="people"
            v-for="people in production"
            :key="people.id"
          />
        </div>
         <h4 class="cast__subtitle">Оформление</h4>
        <div class="cast__people-inner">
          <card-of-people
            :data="people"
            v-for="people in decor"
            :key="people.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardOfPeople from "../CardOfPeople";
export default {
  components: {
    CardOfPeople,
  },
  data() {
    return {
      cardDetails: this.$store.state.cardDetails,
      imgUrl: this.$store.state.imgUrl,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    findDate() {
      return this.cardDetails.release_dates.results.filter(
        (el) => el.iso_3166_1 == "RU"
      )[0];
    },
    correctDate() {
      return this.findDate.release_dates[0].release_date.slice(0, 4);
    },
    directors() {
      return this.cardDetails.credits.crew.filter(
        (el) => el.job == "Director" || el.job == "Co-Director"
      );
    },
    actors() {
      return this.cardDetails.credits.cast.filter((el) => el);
    },
    // Пока так
    production() {
      return this.cardDetails.credits.crew.filter(
        (el) =>
          el.job == "Associate Producer" ||
          el.job == "Casting" ||
          el.job == "Character Technical Supervisor" ||
          el.job == "Executive Producer" ||
          el.job == "Producer" ||
          el.job == "Production Manager"
      );
    },
    scenario() {
      return this.cardDetails.credits.crew.filter(
        (el) =>
          el.job == "Head of Story" ||
          el.job == "Screenplay, Story" ||
          el.job == "Story"
      );
    },
    decor(){
      return this.cardDetails.credits.crew.filter(
        (el) =>
          el.job == "Art Direction" ||
          el.job == "Painter" ||
          el.job == "Production Design"||
          el.job == "Sets & Props Supervisor"||
          el.job == "Technical Supervisor"
      )
    }
  },

  mounted() {
    console.log();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.cast {
  color: $color-white;
  &__title {
    font-size: 2rem;
    margin: 1rem 0;
    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.5rem;
    }
  }
  &__subtitle {
    font-size: 1.5rem;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }
  &__header {
    color: $color-white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    &-inner {
      display: flex;
      padding-bottom: 0.313rem;
    }
    &-description {
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &-title {
      font-size: 2rem;
    }
  }

  &__card {
    img {
      max-width: 110px;
      border-radius: 0.313rem;
    }
  }
  &__people {
    &-inner {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>