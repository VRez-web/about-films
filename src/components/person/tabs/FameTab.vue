<template>
  <div class="person__fame-list">
    <Card v-for="item in works" :model="item" class="person__fame-item"/>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  props: {
    works: Array
  },
}
</script>
