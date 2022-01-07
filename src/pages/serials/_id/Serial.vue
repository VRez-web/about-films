<template>
  <AppLoader v-if="serial === null && similarSerials === null"/>
  <main v-else>
    <section class="card__details">
      <DetailsHeader :model="serial"/>
      <div class="container">
        <div class="card__details-inner">
          <div class="card__details-img-wrapper">
            <img
                :src="checkPoster(serial.poster_path)"
                alt=""
                class="card__details-img"
            />
          </div>
          <div class="card__details-description-wrapper-second">
            <div class="card__details-rating-wrapper">
              <div class="card__details-rating">
                <h2>Рейтинг</h2>
                <p :class="checkVote(serial.vote_average)">
                  {{ rating }}
                </p>
              </div>
              <div class="card__details-votes">
                <h2>Голосов</h2>
                <p>{{ serial.vote_count }}</p>
              </div>
            </div>
            <p class="card__details-phrase" v-if="!!serial.tagline">
              «{{ serial.tagline }}»
            </p>
            <DetailsLinks :socials="socials" @show-trailer="isShowTrailers = true"/>
          </div>
          <div class="card__details-description">
            <div class="card__details-description-wrapper">
              <h2 class="card__details-description-title">Сюжет</h2>
              <p class="card__details-plot">{{ serial.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <DetailsCast v-if="!!serial.credits.cast.length" :id="serial.id" :cast="serial.credits.cast"/>
    <DetailsSimilar :model="similarSerials"/>
  </main>
  <ModalTrailers
      v-if="isShowTrailers"
      :model="serial.videos.results"
      @close="isShowTrailers = false"/>
</template>

<script>
import DetailsHeader from "@/components/details/DetailsHeaderSerial";
import {checkPoster, checkVote} from "@/utils/commonFunctions";
import AppLoader from "@/components/app/AppLoader";
import DetailsLinks from "@/components/details/base/DetailsLinks";
import DetailsCast from "@/components/details/DetailsCast";
import DetailsSimilar from "@/components/details/DetailsSimilar";
import ModalTrailers from "@/components/modal/ModalTrailers";
import {getSerialDetails, getSerialSimilar} from "@/services/serials";

export default {
  components: {
    ModalTrailers,
    DetailsLinks,
    AppLoader,
    DetailsHeader,
    DetailsCast,
    DetailsSimilar
  },
  data() {
    return {
      serial: null,
      similarSerials: null,
      isShowTrailers: false
    };
  },
  created() {
    this.getSerialDetails()
    this.getSerialSimilar()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: function () {
        if (this.$route.params.id) {
          this.getSerialDetails()
          this.getSerialSimilar()
        }
      },
    }
  },
  computed: {
    rating() {
      return this.serial.vote_average === 0 ? 'NR' : this.serial.vote_average
    },

    socials() {
      return {homepage: this.serial.homepage, trailer: this.serial.videos.results, ...this.serial.external_ids}
    }
  },
  methods: {
    checkPoster,
    checkVote,

    async getSerialDetails() {
      const serialDetails = await getSerialDetails(this.$route.params.id)
      this.serial = serialDetails.data
    },

    async getSerialSimilar() {
      const similarSerials = await getSerialSimilar(this.$route.params.id)
      this.similarSerials = similarSerials.data.results
    }
  }
};
</script>
