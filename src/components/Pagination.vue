<template>
  <div class="section__pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="page-management"
    >
      <i class="icofont-arrow-left"></i>
    </button>
    <ul class="section__pagination-list">
      <button
        v-for="page in pages"
        :key="page"
        :class="page === currentPage ? 'active' : ''"
        @click="currentPageTake(page)"
      >
        {{ page }}
      </button>
    </ul>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="page-management"
    >
      <i class="icofont-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
    props:{
        pages:Array,
        currentPage:String,
        totalPages:String,
    }

};
</script>

<style>
</style>