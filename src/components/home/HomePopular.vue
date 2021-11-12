<template>
  <div class="home__section">
    <div class="home__header">
      <h2 class="home__title">Популярное</h2>
      <div class="home__tabs">
        <button
            v-for="(tab,i) in tabs"
            class="home__tab"
            :class="{'active':currentStep === tab.name}"
            @click="currentStep = tab.name"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>
    <keep-alive>
      <component :is="currentStep"/>
    </keep-alive>
  </div>
</template>

<script>
import MoviesTab from '@/components/home/popular/tab/MovieTab'

export default {
  props: {
    data: Array
  },
  components: {
    MoviesTab
  },
  data() {
    return {
      currentStep: 'MoviesTab',
      tabs: [
        {title: 'Кино', name: 'MoviesTab'},
        {title: 'Сериалы', name: 'SerialsTab'},
        {title: 'Тв-шоу', name: 'TvTab'},
      ]
    }
  }
}
</script>