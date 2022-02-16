<template>
  <div class="search__list">
    <CardOfPeople v-for="person in persons" :model="person" class="search__list-item"/>
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
