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
  props: {
    data:Object,
    totalPages: Number,
    currentPage: Number,
  },
  data() {
    return {
      pageRange: 2,
    };
  },
  computed: {
    currentPageTake(page) {
      console.log(page);
    },
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
    nextPage() {
      console.log(this.data);
    },
    prevPage() {},
    rangeStart() {
      let start = this.currentPage - this.pageRange;

      return start > 0 ? start : 1;
    },
    rangeEnd() {
      let end = this.currentPage + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
  },
  mounted(){
    
  }
};
</script>

<style>
</style>