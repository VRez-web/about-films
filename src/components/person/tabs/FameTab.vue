<template>
  <div class="person__fame-list">
    <Card v-for="item in model" :model="item" :media-type="checkMediaType(item)" class="person__fame-item"/>
  </div>
</template>

<script>
import Card from "@/components/Card";
import {checkMediaType} from "@/utils/commonFunctions";

export default {
  components: {
    Card
  },
  props: {
    model: Array
  },
  methods: {
    checkMediaType
  }
}
</script>
