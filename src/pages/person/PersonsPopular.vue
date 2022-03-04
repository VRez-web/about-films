<template>
  <AppLoader v-if="persons === null" />
  <div v-else class="container">
    <PageWrapper :model="persons" :type="'person'" @page-change="getPersonsPopular" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import AppLoader from '@/components/app/AppLoader.vue';
import PageWrapper from '@/components/PageWrapper';
import { getPersonsPopular } from '@/services/person';

export default {
  components: {
    pagination,
    AppLoader,
    PageWrapper,
  },
  data() {
    return {
      persons: null,
    };
  },
  created() {
    this.getPersonsPopular()
  },
  methods:{
    async getPersonsPopular(page = 1){
      this.persons = null
      const persons = await getPersonsPopular(page)
      this.persons = persons
    }
  }
};
</script>
