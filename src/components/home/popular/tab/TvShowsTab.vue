<template>
  <BaseHomeTab :model="model" :media-type="'serial'" id="popular-tvShows"/>
</template>

<script>
import BaseHomeTab from "@/components/home/base/BaseHomeTab";

export default {
  props: {
    model: Array
  },
  components: {
    BaseHomeTab
  }
}
</script>
