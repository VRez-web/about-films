<template>
  <div class="home__section">
    <div class="home__header">
      <h2 class="home__title">Тренды</h2>
      <div class="home__tabs">
        <button
            v-for="tab in tabs"
            class="home__tab"
            :class="{'active':currentStep === tab.name}"
            @click="currentStep = tab.name"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>
    <keep-alive>
      <component :is="currentStep" :model="currentModel"/>
    </keep-alive>
  </div>
</template>

<script>
import {getTrends} from "@/services/trends";
import DayTab from "@/components/home/trend/tab/DayTab";
import WeekTab from "@/components/home/trend/tab/WeekTab";

export default {
  name: 'HomeTrends',
  components: {
    DayTab,
    WeekTab
  },
  data() {
    return {
      currentStep: 'DayTab',
      tabs: [
        {title: 'Сегодня', name: 'DayTab'},
        {title: 'На этой недели', name: 'WeekTab'},
      ],
      model: {
        day: [],
        week: [],
      },
    }
  },
  created() {
    this.getTrendsDay()
    this.getTrendsWeek()
  },
  computed: {
    currentModel() {
      if (this.currentStep === 'DayTab') {
        return this.model.day
      } else if (this.currentStep === 'WeekTab') {
        return this.model.week
      }
    }
  },
  methods: {
    async getTrendsDay() {
      const trends = await getTrends()
      this.model.day = trends.results.slice(0, 16)
    },

    async getTrendsWeek() {
      const trends = await getTrends('week')
      this.model.week = trends.results.slice(0, 16)
    }
  }
}
</script>
