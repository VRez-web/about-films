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
        <div class="crew__group" v-show="!!Tricks.length">
          <h4 class="cast__subtitle">Трюки</h4>
          <div class="cast__people-inner">
            <card-of-people
              :data="people"
              v-for="people in Tricks"
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
      return this.credits.crew.filter(
        (el) =>
          el.job == "Director" ||
          el.job == "Co-Director" ||
          el.job == "Assistant Director" ||
          el.job == "Second Assistant Director" ||
          el.job == "First Assistant Director" ||
          el.job == "Second Unit Director" ||
          el.job == "Script Supervisor"
      );
    },
    actors() {
      return this.credits.cast.filter((el) => el);
    },
    production() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Associate Producer" ||
          el.job == "Casting" ||
          el.job == "Character Technical Supervisor" ||
          el.job == "Executive Producer" ||
          el.job == "Producer" ||
          el.job == "Post Production Supervisor" ||
          el.job == "Production Manager" ||
          el.job == "Co-Producer" ||
          el.job == "Line Producer" ||
          el.job == "Executive In Charge Of Production" ||
          el.job == "Unit Production Manager" ||
          el.job == "Assistant Accountant" ||
          el.job == "Assistant Production Coordinator" ||
          el.job == "Production Coordinator" ||
          el.job == "First Assistant Accountant" ||
          el.job == "Production Secretary" ||
          el.job == "Payroll Accountant" ||
          el.job == "Production Accountant"
      );
    },
    scenario() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Head of Story" ||
          el.job == "Screenplay" ||
          el.job == "Screenplay, Story" ||
          el.job == "Story" ||
          el.job == "Writer"
      );
    },
    decor() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Art Direction" ||
          el.job == "Painter" ||
          el.job == "Production Design" ||
          el.job == "Sets & Props Supervisor" ||
          el.job == "Technical Supervisor" ||
          el.job == "Set Decoration" ||
          el.job == "Props" ||
          el.job == "Leadman" ||
          el.job == "Art Department Coordinator" ||
          el.job == "Assistant Property Master" ||
          el.job == "Graphic Designer" ||
          el.job == "Set Decoration Buyer" ||
          el.job == "Set Designer" ||
          el.job == "Storyboard Artist" ||
          el.job == "Set Dresser" ||
          el.job == "Supervising Art Director" ||
          el.job == "Costume Design" ||
          el.job == "Costumer " ||
          el.job == "Ager/Dyer" ||
          el.job == "Costume Assistant" ||
          el.job == "Key Costumer" ||
          el.job == "Key Hair Stylist" ||
          el.job == "Key Makeup Artist" ||
          el.job == "Makeup Department Head" ||
          el.job == "Makeup Effects Designer" ||
          el.job == "Costume Supervisor" ||
          el.job == "Hair Department Head" ||
          el.job == "Hairstylist" ||
          el.job == "Concept Artist" ||
          el.job == "Draughtsman" ||
          el.job == "Makeup Artist" ||
          el.job == "Prosthetic Makeup Artist" ||
          el.job == "Wigmaker" ||
          el.job == "Additional Wardrobe Assistant" ||
          el.job == "Property Master"
      );
    },
    effects() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Animation Supervisor" ||
          el.job == "Character Modelling Supervisor" ||
          el.job == "Effects Supervisor" ||
          el.job == "Head of Animation" ||
          el.job == "Modelling Supervisor" ||
          el.job == "Simulation & Effects Artist" ||
          el.job == "Visual Effects Supervisor" ||
          el.job == "Visual Effects" ||
          el.job == "Visual Effects Producer" ||
          el.job == "Special Effects Supervisor" ||
          el.job == "Special Effects Technician"
      );
    },
    sound() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Original Music Composer" ||
          el.job == "Music Supervisor" ||
          el.job == "Boom Operator" ||
          el.job == "Sound Mixer" ||
          el.job == "Sound" ||
          el.job == "Sound Assistant"
      );
    },
    shine() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Lighting Director" ||
          el.job == "Rigging Supervisor" ||
          el.job == "Lighting Technician" ||
          el.job == "Rigging Gaffer" ||
          el.job == "Rigging Grip" ||
          el.job == "Assistant Chief Lighting Technician" ||
          el.job == "Chief Lighting Technician"
      );
    },
    camera() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Director of Photography" ||
          el.job == "Head of Layout" ||
          el.job == `"B" Camera Operator` ||
          el.job == `"A" Camera Operator` ||
          el.job == "Camera Loader" ||
          el.job == `"C" Camera Operator` ||
          el.job == "Camera Operator" ||
          el.job == "Dolly Grip" ||
          el.job == "Grip" ||
          el.job == "Digital Imaging Technician " ||
          el.job == "Still Photographer" ||
          el.job == `First Assistant "A" Camera` ||
          el.job == `First Assistant "B" Camera` ||
          el.job == `Key Grip` ||
          el.job == `Second Assistant "A" Camera` ||
          el.job == `Additional Photography` ||
          el.job == `Second Assistant "B" Camera`
      );
    },
    installation() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Editor" ||
          el.job == "Digital Intermediate Colorist" ||
          el.job == "Assistant Editor" ||
          el.job == "First Assistant Editor"
      );
    },
    Tricks() {
      return this.credits.crew.filter(
        (el) =>
          el.job == "Stunts" ||
          el.job == "Fight Choreographer" ||
          el.job == "Stunt Coordinator" ||
          el.job == "Thanks"
      );
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