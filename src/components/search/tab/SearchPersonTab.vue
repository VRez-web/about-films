<template>
  <div class="search__list">
    <CardOfPeople v-for="person in persons" :model="person" class="search__list-item" @click="$emit('close')"/>
  </div>
  <div v-if="persons.length === 10" class="search__more link" @click="$emit('close')">
    <router-link :to="{name:'search-total', query:{str:$route.query, type:'person'}}">Посмотреть всё</router-link>
  </div>
</template>

<script>

import CardOfPeople from "@/components/CardOfPeople";

export default {
  components: {
    CardOfPeople
  },
  props: {
    persons: Array
  }
}
</script>

<style lang="scss" scoped>
.search__list-item {
  width: 18%;
}
</style>
