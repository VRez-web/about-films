<template>
  <section class="person">
    <div class="container">
      <div class="person__inner">
        <img :src="img" :alt="person.name" class="person__img" />
        <div class="person__description">
          <div class="person__description-wrapper">
            <h3 class="person__title">{{ person.name }}</h3>
            <div class="person__social links-social">
              <a
                :href="`https://www.instagram.com/${socialLinks.instagram_id}`"
                title="Посетить instagram"
                target="_blank"
                v-show="!!socialLinks.instagram_id"
              >
                <i class="icofont-instagram"></i>
              </a>
              <a
                :href="`https://www.facebook.com/${socialLinks.facebook_id}`"
                title="Посетить facebook"
                target="_blank"
                v-show="!!socialLinks.facebook_id"
              >
                <i class="icofont-facebook"></i>
              </a>
              <a
                :href="`https://www.twitter.com/${socialLinks.twitter_id}`"
                title="Посетить twitter"
                v-show="!!socialLinks.twitter_id"
                target="_blank"
              >
                <i class="icofont-twitter"></i>
              </a>
              <a
                :href="homepage"
                title="Посетить Домашнюю страницу"
                target="_blank"
                v-show="!!homepage"
              >
                <i class="icofont-link"></i>
              </a>
            </div>
            <div class="person__about">
              <p class="person__birthday">
                Дата рождения: {{ birthday }}
                <span v-show="!!age">({{ age }})</span>
              </p>
              <p class="person__death" v-show="!!death">
                Дата смерти: {{ death }}
              </p>
              <p class="person__place-birth">
                Место рождения: {{ placeBirth }}
              </p>
              <p class="person__gender">Пол: {{ gender }}</p>
            </div>
            <p class="person__specialization">
              Известность за: {{ specialization }}
            </p>
          </div>
          <div class="person__aliases" v-show="aliases != 0">
            <h3 class="person__aliases-title">Также известность как</h3>
            <ul>
              <li v-for="alias in aliases" :key="alias">{{ alias }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="biography">
    <div class="container">
      <h2 class="person__title">Биография</h2>
      <div class="biography__inner">
        <pre class="biography__description" :class="hiddenClass">{{
          biography
        }}</pre>
        <span @click="showTxt" v-show="hiddenTxt">Читать еще</span>
      </div>
    </div>
  </section>
  <section class="known__for">
    <div class="container">
      <h2 class="person__title">Известность за</h2>
      <div class="known__for-inner">
        <slider :data="sortBestRoles" :category="'movie'" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import slider from "./Slider";
export default {
  components: {
    slider,
  },
  data() {
    return {
      imgSize: this.$store.state.imgProfileSize,
      imgUrl: "",
      person: {},
      socialLinks: {},
      homepage: "",
      aliases: [],
      birthday: "",
      death: "",
      placeBirth: "",
      bigText: true,
      allRoles: [],
    };
  },
  methods: {
    ...mapActions(["GET_ABOUT_PERSON"]),

    async getData() {
      const ABOUT_PERSON = await this.GET_ABOUT_PERSON(this.id);
      this.person = ABOUT_PERSON;
      this.imgUrl = this.person.profile_path;
      this.socialLinks = this.person.external_ids;
      this.homepage = this.person.homepage;
      this.aliases = this.person.also_known_as;
      this.birthday = this.person.birthday;
      this.death = this.person.deathday;
      this.placeBirth = this.person.place_of_birth;
      this.allRoles = this.person.movie_credits.cast.concat(
        this.person.tv_credits.cast
      );
      console.log(ABOUT_PERSON);
    },
    showTxt() {
      this.bigText = !this.bigText;
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    gender() {
      return this.person.gender == 1 ? "Женский" : "Мужской";
    },
    age() {
      return this.birthday
        ? new Date().getFullYear() - this.birthday.slice(0, 4)
        : "";
    },
    specialization() {
      if (this.person.known_for_department == "Acting") {
        return "Актёрское искусство";
      } else if (this.person.known_for_department == "Art") {
        return "Оформление";
      }
    },
    hiddenTxt() {
      return this.biography.length > 500 ? this.bigText : !this.bigText;
    },
    hiddenClass() {
      return this.hiddenTxt ? "hide-txt" : "";
    },
    sortBestRoles() {
      return this.allRoles
        .sort((a, b) => a.vote_count - b.vote_count)
        .reverse()
        .slice(0, 8);
    },
    biography() {
      return this.person.biography
        ? this.person.biography
        : "К сожалению у нас пока нет биографии для данного человека";
    },
    img() {
      return this.imgUrl
        ? this.imgSize + this.imgUrl
        : require("@/assets/img/no-avatar-person.jpg");
    },
  },
  watch: {
    id: {
      immediate: true,
      handler: function () {
        this.getData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.person {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__img {
    width: 200px;
    border-radius: 1rem;
  }
  &__description {
    width: 70%;
    display: flex;
    justify-content: space-between;
    &-wrapper {
      width: 65%;
    }
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__aliases {
    width: 30%;

    &-title {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.625rem;
      font-size: 0.875rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__about {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 1rem;
    p {
      width: 45%;
      margin-top: 1rem;
    }
  }
  &__specialization {
    margin-top: 1rem;
  }
}
.biography {
  margin-top: 1rem;
  &__inner {
    position: relative;

    span {
      background-color: $color-tematic;
      position: absolute;
      right: 10%;
      bottom: -10%;
      cursor: pointer;
      padding: 0.313rem;
      border-radius: 0.313rem;
    }
  }

  &__description {
    white-space: break-spaces;
    line-height: 1.5rem;
  }
}
.hide-txt {
  max-height: 10.25rem;
  overflow: hidden;
}
.known__for {
  margin-top: 2rem;
}
</style>