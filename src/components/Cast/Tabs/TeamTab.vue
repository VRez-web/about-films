<template>
  <BaseCastTab :model="model.crew"/>
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
