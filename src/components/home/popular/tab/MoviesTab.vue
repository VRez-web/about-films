<template>
  <BaseHomeTab :model="model" id="popular-movies"/>
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
