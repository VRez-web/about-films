<template>
  <AppLoader v-if="serials === null" />
  <div v-else class="container">
    <PageWrapper :model="serials" :type="'serial'" @page-change="getSerialsToday" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getSerialToday } from '@/services/serials';

export default {
  components: { pagination, AppLoader, PageWrapper },
  data() {
    return {
      serials: null,
    };
  },
  created() {
    this.getSerialsToday()
  },
  methods: {
    async getSerialsToday(page = 1) {
      this.serials = null
      const serial = await getSerialToday(page)
      this.serials = serial.data
    },
  },
};
</script>
