<template>
  <div class="section__pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="page-management"
    >
      <i class="icon-left"></i>
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
      <li v-show="currentPage + pageRange < totalPages">...</li>
      <li
        @click="pageChange(totalPages)"
        v-show="currentPage + pageRange < totalPages"
      >
        {{ totalPages }}
      </li>
    </ul>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="page-management"
    >
      <i class="icon-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
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

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.section__pagination {
  display: flex;
  justify-content: center;
  padding: 1rem 0;

  button {
    cursor: pointer;
    font-size: 1.25rem;
    outline: none;
    border: none;
    border-radius: 0.313rem;
    background-color: $color-darkBlue;
    color: $color-white;
    padding: 0.5rem;
    width: 5%;

    &:first-child {
      margin-right: 0.625rem;
    }
    &:disabled {
      background-color: rgba(31, 33, 54, 0.3);
      color: rgba($color-white, 0.3);
    }
  }

  &-list {
    width: 35%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      width: 12%;
      cursor: pointer;
      font-size: 1.25rem;
      border-radius: 0.313rem;
      background-color: $color-darkBlue;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        background-color: $color-tematic;
      }
      &:not(:last-child) {
        margin-right: 0.625rem;
      }
    }
  }
}
@media (max-width: 1200px) {
  .section__pagination {
    &-list {
      width: 55%;
    }
    button {
      width: 10%;
    }
  }
}
@media (max-width: 900px) {
  .section__pagination {
    &-list {
      width: 80%;
      li {
        width: 10%;
      }
    }
  }
}
@media (max-width: 700px) {
  .section__pagination {
    &-list {
      li {
        width: 15%;
        height: 40px;
        margin-bottom: 0.5rem;
      }
    }
  }
}
@media (max-width: 500px) {
  .section__pagination {
    flex-wrap: wrap;
    button {
      width: 40%;
    }
    &-list {
      order: -1;
      width: 100%;
      margin-bottom: 1rem;
    }
  }
}
</style>
