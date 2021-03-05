<template>
  <section class="search__total">
    <div class="container">
      <div class="search__total-inner">
        <card :data="totalMovies.results" />
      </div>
    </div>
  </section>
</template>

<script>
import card from "../Card";
import { mapActions } from "vuex";
export default {
  components: { card },
  data() {
    return {
      totalMovies: [],
      totalTvShows: [],
      totalPerson: [],
      query:this.$attrs.query,
      category:this.$attrs.title
    };
  },
  methods: {
    ...mapActions(["GET_SEARCH_TOTAL_MOVIES"]),
  },
  computed: {
  },
  mounted() {
    if (this.category == "movie") {
      this.GET_SEARCH_TOTAL_MOVIES(this.query).then((res) => {
        this.totalMovies = res;
      });
    } else if (this.category == "tv-shows") {
    } else {
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.search__total{

  &-inner{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>