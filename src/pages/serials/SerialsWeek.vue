<template>
  <AppLoader v-if="serials === null" />
  <div v-else class="container">
    <PageWrapper :model="serials" :type="'serial'" @page-change="getSerialsWeek" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getSerialsWeek } from '@/services/serials';

export default {
  components: { pagination, AppLoader, PageWrapper },
  data() {
    return {
      serials: null,
    };
  },
  created() {
  this.getSerialsWeek()
  },
  methods: {
    async getSerialsWeek(page = 1){
      this.serials = null
      const serials = await getSerialsWeek(page)
      this.serials = serials.data
    }
  },
};
</script>
