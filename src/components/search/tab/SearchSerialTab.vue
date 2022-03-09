<template>
  <div class="search__list">
    <Card
        v-for="serial in serials"
        :model="serial"
        class="search__list-item"
        @click="$emit('close')"
    />
  </div>
  <div v-if="serials.length === 10" class="search__more link" @click="$emit('close')">
    <router-link :to="{name:'search-total', query:{str:$route.query, type:'serial'}}">Посмотреть всё</router-link>
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
  },
}
</script>
