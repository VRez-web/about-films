<template>
  <h2 class="section__title">{{title}}</h2>
  <div class="section__inner">
    <component
        :is="componentName"
        v-for="item in model.results"
        :model="item"
        :media-type="checkMediaType(model)"/>
  </div>
  <Pagination
      :current-page="model.page"
      :total-pages="model.total_pages"
      @page-change="pageChange"
  />
</template>

<script>
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import CardOfPeople from "@/components/CardOfPeople";
import {checkMediaType} from '@/utils/commonFunctions';

export default {
  components: {
    CardOfPeople,
    Pagination,
    Card
  },
  props: {
    model: Object,
    type: String,
    title: String
  },
  computed: {
    componentName() {
      return this.type === 'movie' || this.type === 'serial' ? 'Card' : 'CardOfPeople'
    }
  },
  methods: {
    checkMediaType,

    pageChange(page) {
      this.$emit('page-change', page)
    }
  }
}
</script>
