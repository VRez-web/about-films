<template>
  <section class="tv__shows section">
    <div class="container">
      <h2 class="section__title">Лучшие сериалы:</h2>
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
import card from "@/components/Card";
import pagination from "@/components/Pagination";
import { mapActions } from "vuex";

export default {
  components: { card, pagination },
  data() {
    return {
      pages: null,
      currentPage: this.$store.page,
      serial: {},
    };
  },
  methods: {
    ...mapActions("serialsTopRated", ["GET_TV_SHOWS_TOP_RATED"]),
    async pageChange(page) {
      const SERIAL = await this.GET_TV_SHOWS_TOP_RATED(page);
      this.serial = { ...SERIAL, ...SERIAL.data };
      this.currentPage = page;
    },
  },
  async created() {
    try {
      const SERIAL = await this.GET_TV_SHOWS_TOP_RATED();
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