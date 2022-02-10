<template>
  <div class="career">
    <PersonCareerFilter :model="crew" @change-data="setCreations"/>
    <div class="career__list">
      <div v-for="item in creations" class="career__item">
        <p class="career__item-date">{{ item.release_date }}</p>
        <div class="career__item-about">
          <router-link to="" class="career__item-link">{{ correctTitle(item) }}</router-link>
        </div>
        <p class="career__item-job">({{ item.job }})</p>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCareerFilter from "@/components/person/PersonCareerFilter";
import AppLoader from "@/components/app/AppLoader";
import {getYear} from "@/utils/commonFunctions";
import {correctTitle} from "@/utils/commonFunctions";

export default {
  components: {AppLoader, PersonCareerFilter},
  props: {
    crew: Array
  },
  data() {
    return {
      creations: this.crew
    }
  },
  computed: {
  },
  methods: {
    getYear,
    correctTitle,

    setCreations(creations) {
      if (creations === null) return this.creations = this.crew
      this.creations = creations
    },
  }
}
</script>
