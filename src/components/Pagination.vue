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
      <li
        v-for="page in pages"
        :key="page"
        :class="page === currentPage ? 'active' : ''"
        @click="pageChange(page)"
      >
        {{ page }}
      </li>
      <li>...</li>
      <li @click="pageChange(totalPages)">{{totalPages}}</li>
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
    data: Object,
    totalPages: Number,
    currentPage: Number,
  },
  data() {
    return {
      pageRange: 2,
    };
  },
  methods: {
    prevPage() {
      this.$emit("pageChange", this.currentPage - 1);
    },
    pageChange(page) {
      this.$emit("pageChange", page);
    },
    nextPage() {
      this.$emit("pageChange", this.currentPage + 1);
    },
  },
  computed: {
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
    rangeStart() {
      let start = this.currentPage - this.pageRange;

      return start > 0 ? start : 1;
    },
    rangeEnd() {
      let end = this.currentPage + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
  },
  mounted() {},
};
</script>

<style>
</style>