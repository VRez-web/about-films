<template>
  <section class="cast__header">
    <div class="container">
      <div class="cast__header-inner">
        <div class="cast__card">
          <img :src="imgUrl + cardDetails.poster_path" alt="" />
        </div>
        <div class="cast__header-description">
          <h2 class="cast__header-title">{{ cardDetails.title }} <span>({{ correctDate }})</span></h2>
          <a href="#" class="link" @click.prevent="back">Назад на главную</a>
        </div>
      </div>
    </div>
  </section>
  <section class="cast">
    <div class="container"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cardDetails: this.$store.state.cardDetails,
      imgUrl: this.$store.state.imgUrl,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    findDate() {
      return this.cardDetails.release_dates.results.filter(
        (el) => el.iso_3166_1 == "RU"
      )[0];
    },
    correctDate() {
      return this.findDate.release_dates[0].release_date.slice(0, 4);
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.cast {
  &__header {
    color: $color-white;
      border-bottom: 2px solid rgba(255,255,255,.6);
    &-inner {
      display: flex;
      padding-bottom: 0.313rem;
    }
    &-description{
      margin-left: 2rem;
    }

    &-title{
      font-size: 2rem;
    }
  }

  &__card{

    img{
      max-width: 110px;
      border-radius:0.313rem ;
    }
  }
}
</style>