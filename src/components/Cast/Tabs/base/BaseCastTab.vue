<template>
  <div class="cast__people-list">
    <div v-for="item in model" class="cast__people-item">
      <CardOfPeople :model="item" :small="true"/>
    </div>
  </div>
</template>

<script>
import CardOfPeople from "@/components/CardOfPeople";

export default {
  components: {
    CardOfPeople
  },
  props: {
    model: Array
  }
}
</script>

<style lang="scss" scoped>
.cast__people {
  &-list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 15px;
  }

  &-item {
    width: 13%;
  }
}
</style>
