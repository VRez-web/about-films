<template>
  <AppLoader v-if="model === null" />
  <section v-else class="cast">
    <div class="cast__header">
      <div class="container">
        <div class="cast__header-inner">
          <div class="cast__product-img">
            <img :src="checkPoster(model.poster_path)" alt="">
          </div>
          <div class="cast__header-about">
            <router-link
              :to="{ name: correctRouteName(type), params: { id: model.id }}"
              class="cast__product-title link"
            >{{ title }}
            </router-link>
            <p class="cast__product-date">{{ date }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cast__people">
      <div class="container">
        <div class="cast__people-tabs">
          <button
            v-for="tab in tabs"
            class="cast__people-tab"
            :class="{'active':tab.name === currentStep}"
            @click="currentStep = tab.name"
          >
            {{ tab.title }}
          </button>
        </div>
        <component :is="currentStep" :model="model.credits" />
      </div>
    </div>
  </section>
</template>

<script>
import { getMoviesDetails } from '@/services/movies';
import { getSerialDetails } from '@/services/serials';
import { formattingDate } from '@/utils/formatting';
import { checkPoster, correctRouteName } from '@/utils/commonFunctions';
import AppLoader from '@/components/app/AppLoader';
import CastTab from '@/components/Cast/Tabs/CastTab';
import TeamTab from '@/components/Cast/Tabs/TeamTab';

export default {
  components: {
    AppLoader,
    CastTab,
    TeamTab,
  },
  data() {
    return {
      model: null,
      type: this.$route.query.type,
      tabs: [
        { title: 'В ролях', name: 'CastTab' },
        { title: 'Команда', name: 'TeamTab' },
      ],
      currentStep: 'CastTab',
    };
  },
  created() {
    this.getCast();
  },
  computed: {
    date() {
      const date = this.model.release_date || this.model.first_air_date;
      return formattingDate(date);
    },

    title() {
      return this.model?.title || this.model?.name;
    },
  },
  methods: {
    checkPoster,
    correctRouteName,

    async getCast() {
      if (this.type === 'movie') {
        const movieCast = await getMoviesDetails(this.$route.params.id);
        this.model = movieCast.data;
      }
      else {
        const serialCast = await getSerialDetails(this.$route.params.id);
        this.model = serialCast.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/vars';

.cast {
  &__header {
    &-inner {
      display:     flex;
      align-items: flex-start;
    }
  }

  &__product {
    &-title {
      font-size:     1.5rem;
      margin-bottom: .5rem;
    }

    &-img {
      margin-right: 1.2rem;

      img {
        width:         120px;
        height:        180px;
        object-fit:    cover;
        border-radius: 5px;
      }
    }
  }

  &__people {
    margin:      1rem 0;
    padding-top: 1rem;
    border-top:  1px solid #363535;

    &-title {
      font-size:     1.8rem;
      font-weight:   500;
      margin-bottom: 2rem;
    }

    &-tabs {
      width:         fit-content;
      display:       flex;
      align-items:   center;
      gap:           20px;
      padding:       3px 15px 3px 0;
      border-bottom: 1px solid #f9f9f9;
      margin-bottom: 20px;
    }

    &-tab {
      position:    relative;
      border:      none;
      background:  transparent;
      color:       $color-white;
      font-size:   1.3rem;
      font-weight: 500;
      padding:     0;
      cursor:      pointer;

      &.active {
        &::after {
          content:    '';
          position:   absolute;
          bottom:     -4px;
          left:       0;
          width:      100%;
          height:     2px;
          background: $color-tematic;
        }
      }
    }
  }
}
</style>
