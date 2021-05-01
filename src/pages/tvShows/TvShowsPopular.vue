<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">Популярные сериалы</h2>
      <div class="tv__shows__inner section__inner">
        <card :data="serial.results" :category="serial.type" />
      </div>

      <pagination
        :totalPages="pages"
        :currentPage="currentPage"
        @pageChange="pageChange"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import pagination from "@/components/Pagination.vue";
import card from "@/components/Card";

export default {
  components: { card, pagination },
  data() {
    return {
      serial: {},
      pages: null,
      currentPage: this.$store.page,
    };
  },
  methods: {
    ...mapActions("serialsPopular", ["GET_TV_SHOWS_POPULAR"]),
    async pageChange(page) {
      const SERIAL = await this.GET_TV_SHOWS_POPULAR(page);
      this.serial = { ...SERIAL, ...SERIAL.data };
      this.currentPage = page;
    },
  },
  async created() {
    try {
      const SERIAL = await this.GET_TV_SHOWS_POPULAR();
      this.serial = { ...SERIAL, ...SERIAL.data };
      this.currentPage = SERIAL.data.page;
      this.pages = SERIAL.data.total_pages;
    } catch (e) {
      // FIXME: сделать модалку для вывода ошибки пользователю
      console.log(e);
    }
  },
};
</script>

<style>
</style>