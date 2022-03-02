<template>
  <div class="section__inner">
    <Card v-for="item in model.results" :model="item" :media-type="checkMediaType(model)"/>
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
import {checkMediaType} from '@/utils/commonFunctions';

export default {
  components: {
    Pagination,
    Card
  },
  props: {
    model: Object
  },
  methods: {
    checkMediaType,

    pageChange(page) {
      this.$emit('page-change', page)
    }
  }
}
</script>
