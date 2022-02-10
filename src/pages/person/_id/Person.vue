<template>
  <AppLoader v-if="person === null"/>
  <section v-else class="person">
    <div class="container">
      <div class="person__inner">
        <div class="person__img-wrapper">
          <img :src="checkProfileImg(person.profile_path, 300)" :alt="person.name" class="person__img"/>
          <PersonLinks :socials="socials"/>
        </div>
        <div class="person__description">
          <div class="person__description-wrapper">
            <h3 class="person__title">{{ person.name }}</h3>
            <div class="person__about">
              <p class="person__birthday">
                Дата рождения: {{ formattingDate(person.birthday) }}
                <span v-if="!!age">({{ age }} лет)</span>
              </p>
              <p class="person__death" v-if="!!death">
                Дата смерти: {{ death }}
              </p>
              <p class="person__place-birth">
                Место рождения: {{ person.place_of_birth }}
              </p>
              <p class="person__gender">Пол: {{ gender }}</p>
            </div>
            <div class="person__aliases" v-if="person.also_known_as.length !== 0">
              <h3 class="person__aliases-title">Также известность как:</h3>
              <ul class="person__aliases-list">
                <li v-for="alias in person.also_known_as"> - {{ alias }}</li>
              </ul>
            </div>
          </div>
          <div class="person__biography">
            <h3 class="person__biography-title">Биография</h3>
            <pre class="person__biography-descr">{{ biography }}</pre>
          </div>
        </div>
      </div>
      <div class="person__fame">
        <div class="person__fame-header">
          <button
              v-for="tab in tabs"
              :class="{'active':currentStep === tab.name}"
              class="person__fame-tab"
              @click="currentStep = tab.name"
          >
            {{ tab.title }}
          </button>
        </div>
        <component :is="currentStep" :model="allRoles" :crew="allCrewRoles"/>
      </div>
    </div>
  </section>
</template>

<script>
import AppLoader from "@/components/app/AppLoader";
import DetailsLinks from "@/components/details/base/DetailsLinks";
import PersonLinks from "@/components/person/PersonLinks";
import FameTab from "@/components/person/tabs/FameTab";
import CareerTab from "@/components/person/tabs/CareerTab";
import {getDataPerson} from "@/services/person";
import {checkProfileImg} from "@/utils/commonFunctions";
import {formattingDate} from '@/utils/formatting'

export default {
  components: {
    PersonLinks,
    AppLoader,
    DetailsLinks,
    FameTab,
    CareerTab
  },
  data() {
    return {
      person: null,
      currentStep: 'FameTab',
      tabs: [
        {title: 'Известные работы', name: 'FameTab'},
        {title: 'Карьера', name: 'CareerTab'},
      ]
    }
  },
  created() {
    this.getDataPerson()
  },
  computed: {
    gender() {
      return this.person?.gender === 1 ? 'Женский' : 'Мужской'
    },

    age() {
      return ((new Date().getTime() - new Date(this.person.birthday)) / (24 * 3600 * 365.25 * 1000)) | 0;
    },

    biography() {
      return !!this.person.biography.length ? this.person.biography : 'Пока нет информации'
    },

    socials() {
      return {...this.person.external_ids, homepage: this.person.homepage}
    },

    allRoles() {
      const roles = [...this.person.movie_credits.cast, ...this.person.tv_credits.cast]
      return roles.sort((a, b) => b.vote_count - a.vote_count).slice(0, 15)
    },

    allCrewRoles() {
      return [...this.person.movie_credits.crew, ...this.person.tv_credits.crew]
    }
  },
  methods: {
    checkProfileImg,
    formattingDate,

    async getDataPerson() {
      const dataPerson = await getDataPerson(this.$route.params.id)
      this.person = dataPerson
    }
  }
}
</script>
