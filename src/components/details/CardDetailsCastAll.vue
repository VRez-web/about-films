<template>
  <section class="cast__header">
    <div class="container">
      <div class="cast__header-inner">
        <div class="cast__card">
          <img :src="imgUrl + cardDetails.poster_path" alt="" />
        </div>
        <div class="cast__header-description">
          <h2 class="cast__header-title">
            {{ title }} <span>( ДОДЕЛАТЬ)</span>
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
          Актёрский состав <span>{{ castLength }}</span>
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
          Съёмочный состав <span>{{ crewLength }}</span>
        </h2>
        <div class="crew__group">
          <h4 class="cast__subtitle">Режиссура</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in directors"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group">
          <h4 class="cast__subtitle">Сценарий</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in scenario"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group">
          <h4 class="cast__subtitle">Продакшн</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in production"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group">
          <h4 class="cast__subtitle">Оформление</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in decor"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group" v-show="!!effects.length">
          <h4 class="cast__subtitle">Визуальные эффекты</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in effects"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group">
          <h4 class="cast__subtitle">Звук</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in sound"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group" v-show="!!shine.length">
          <h4 class="cast__subtitle">Свет</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in shine"
              :key="people.id"
            />
          </div>
        </div>

        <div class="crew__group">
          <h4 class="cast__subtitle">Камера</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in camera"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group">
          <h4 class="cast__subtitle">Монтаж</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in installation"
              :key="people.id"
            />
          </div>
        </div>
        <div class="crew__group" v-show="!!categoryMore.length">
          <h4 class="cast__subtitle">Еще</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in categoryMore"
              :key="people.id"
            />
          </div>
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
    credits() {
      return this.cardDetails.credits
        ? this.cardDetails.credits
        : this.cardDetails.aggregate_credits;
    },
    castLength() {
      return this.credits.cast.length;
    },
    crewLength() {
      return this.credits.crew.length;
    },
    title() {
      return this.cardDetails.title
        ? this.cardDetails.title
        : this.cardDetails.name;
    },
    directors() {
      return this.credits.crew.filter((el) => el.department == "Directing");
    },
    actors() {
      return this.credits.cast.filter((el) => el);
    },
    production() {
      return this.credits.crew.filter((el) => el.department == "Production");
    },
    scenario() {
      return this.credits.crew.filter((el) => el.department == "Writing");
    },
    decor() {
      return this.credits.crew.filter((el) => el.department == "Art");
    },
    effects() {
      return this.credits.crew.filter(
        (el) => el.department == "Visual Effects"
      );
    },
    sound() {
      return this.credits.crew.filter((el) => el.department == "Sound");
    },
    shine() {
      return this.credits.crew.filter((el) => el.department == "Lighting");
    },
    camera() {
      return this.credits.crew.filter((el) => el.department == "Camera");
    },
    installation() {
      return this.credits.crew.filter((el) => el.department == "Editing");
    },
    categoryMore() {
      return this.credits.crew.filter((el) => el.department == "Crew");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.cast {
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