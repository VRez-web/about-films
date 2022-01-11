<template>
  <BaseCastTab :model="model.cast"/>
</template>

<script>
import BaseCastTab from "@/components/Cast/Tabs/base/BaseCastTab";

export default {
  components: {BaseCastTab},
  props: {
    model: Object
  }
}
</script>
