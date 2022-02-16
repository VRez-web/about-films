<template>
  <div class="search__list">
    <Card
        v-for="serial in serials"
        :model="serial"
        :media-type="'serial'"
        class="search__list-item"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  props: {
    serials: Array
  }
}
</script>
