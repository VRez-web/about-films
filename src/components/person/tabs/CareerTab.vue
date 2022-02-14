<template>
  <div class="career">
    <PersonCareerFilter :model="roles" @change-data="setCreations" />
    <div class="career__list">
      <PersonCareerItem v-for="item in creations" :model="item" />
    </div>
  </div>
</template>

<script>
import PersonCareerFilter from '@/components/person/PersonCareerFilter';
import AppLoader from '@/components/app/AppLoader';
import PersonCareerItem from '../PersonCareerItem';
import { getYear, correctDate } from '@/utils/commonFunctions';

export default {
  components: {
    PersonCareerItem,
    AppLoader,
    PersonCareerFilter,
  },
  props: {
    roles: Array,
  },
  data() {
    return {
      creations: this.roles,
    };
  },
  created() {
    this.creations = this.roles
      .map(el => !el.department ? Object.assign(el, { department: 'Actor' }) : el)
      .map(item => item.department === 'Actor' ? Object.assign(item, { job: 'Actor' }) : item)
      .sort((a, b) => this.formattedDate(b) - this.formattedDate(a));
  },
  methods: {
    getYear,
    correctDate,

    setCreations(creations) {
      if (creations === null) return this.creations = this.roles;
      this.creations = creations;
    },
    //TODO: вынести такие функции по всему проекту
    formattedDate(item) {
      const correctDate = this.correctDate(item);
      return this.getYear(correctDate);
    },
  },
};
</script>
