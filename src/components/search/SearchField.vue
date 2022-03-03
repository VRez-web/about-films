<template>
  <form @submit.prevent class="search__form">
    <fieldset>
      <input
          type="text"
          v-model="query"
          id="search"
          @input="search"
          @change="getData"
          @focus="focus = true"
          @blur="focus = false"
          autocomplete="off"
      />
      <label for="search" :class="labelClasses">Фильмы, сериалы, люди</label>
    </fieldset>
    <div class="search__field-list" :class="{'active':focus && query}">
      <div v-for="item in searchResult" class="search__field-item" @click="pushToDetails(item)">
        <span>{{ correctTitle(item) }}</span>
        <span v-show="correctDate(item)">({{ correctDate(item) }})</span>
        <span class="search__field-media">{{ checkType(item.media_type) }}</span>
      </div>
      <p v-if="searchResult.length === 0" class="search__field-empty">Ничего не найдено</p>
    </div>
  </form>
</template>

<script>
import {correctRouteName, correctTitle, correctDate} from '@/utils/commonFunctions';

export default {
  props: {
    searchResult: Array
  },
  data() {
    return {
      query: '',
      focus: false,
    }
  },
  computed: {
    labelClasses() {
      return !!this.query ? "placeholder-show" : "placeholder";
    },
  },
  methods: {
    correctTitle,
    correctDate,
    correctRouteName,

    search() {
      if (this.query.length === 0) return
      this.$emit('search', this.query)
    },

    getData() {
      if (this.query.length === 0) return
      this.$emit('get-data', this.query)
    },

    checkType(mediaType) {
      if (mediaType === 'movie') return 'Фильмы'
      else if (mediaType === 'tv') return 'Сериалы'
      return 'Люди'
    },

    pushToDetails(item) {
      this.$emit('close')
      this.$router.push({name: correctRouteName(item.media_type), params: {id: item.id}})
    }
  }
}
</script>
