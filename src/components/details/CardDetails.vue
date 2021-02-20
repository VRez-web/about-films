<template>
  <section class="card__details">
    <div class="container">
      <h2 class="card__details-title">
        {{ cardDetails.title }} <span>({{ dataRelease }})</span>
      </h2>
      <p class="card__details-subtitle">1</p>
      <div class="card__details-inner">
        <img
          :src="imgUrl + cardDetails.poster_path"
          alt=""
          class="card__details-img"
        />
        <div class="card__details-description">
          <h2 class="card__details-description-title">Сюжет</h2>
          <p class="card__details-about">{{cardDetailsAbout}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cardDetails: [],
      imgUrl: this.$store.getters.IMG_URL,
      cardId: this.$route.params.id,
      fullimgUrlSize: this.$store.state.fullimgUrlSize,
      images: {},
      dataRelease: "",
      cardDetailsAbout:''
    };
  },
  methods: {
    ...mapActions(["GET_CARD_DETAILS", "GET_MOVIE_IMAGES"]),
  },
  computed: {},
  mounted() {
    this.GET_CARD_DETAILS(this.cardId).then((res) => {
      this.cardDetails = res;
      this.dataRelease = res.release_date.slice(0, 4);
      this.cardDetailsAbout=res.overview
      console.log(res);
    });
    this.GET_MOVIE_IMAGES(this.cardId).then((res) => {
      this.images = res.backdrops;
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_vars.scss";
.card__details {
  margin-top: -30px;
  padding: 2rem 0;
  color: $color-white;
  &-inner {
    display: flex;
    justify-content: space-between;
  }
  &-img {
    max-width: 350px;
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.938rem;
  }
  &-title {
    font-size: 2rem;
    margin-bottom: 0.313rem;
    font-weight: 700;
    span{
      font-weight: 300;
      font-size: 1.6rem;
    }
  }
  &-subtitle{
    margin-bottom: 2rem;
  }
  &-description {
    width: 65%;

    &-title {
      font-size: 2rem;
      margin: 1rem  0;
    }
  }
  &-about{
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
}
</style>