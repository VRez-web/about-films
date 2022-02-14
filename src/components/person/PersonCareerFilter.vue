<template>
  <div class="career__filter">
    <div class="career__filter-wrapper">
      <button class="career__filter-btn" @click="toggleFilter">
        {{ currentFilterText }} <i class="icon-right" :class="{'active':isShowList}"></i>
      </button>
      <ul class="career__filter-list" :class="{'active':isShowList}">
        <li class="career__filter-item" @click="changeCurrentFilter('Все')">Все</li>
        <li
            v-for="department in departments" class="career__filter-item"
            @click="changeCurrentFilter(department)"
        >
          {{ translateDepartment(department) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {translateDepartment} from "@/utils/translater";

export default {
  props: {
    model: Array,
  },
  data() {
    return {
      currentFilterText: 'Все',
      currentFilter: 'All',
      isShowList: false,
    }
  },
  computed: {
    departments() {
      return new Set(this.model.map(el => el.department))
    },

    filteredModel() {
      if (this.currentFilterText === 'Все') {
        return null
      } else {
        return this.model.filter(el => el.department === this.currentFilter)
      }
    }
  },
  methods: {
    translateDepartment,

    toggleFilter() {
      this.isShowList = !this.isShowList
    },

    changeCurrentFilter(currentFilter) {
      this.currentFilter = currentFilter
      this.currentFilterText = translateDepartment(currentFilter)
      this.closeFilter()
      this.changeData()
    },

    closeFilter() {
      this.isShowList = false
    },

    changeData() {
      this.$emit('change-data', this.filteredModel)
    }
  }
}
</script>
