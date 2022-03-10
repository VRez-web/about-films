<template>
  <div class="menu">
    <div class="menu__inner">
      <div v-for="item in menu" class="menu__item">
        <p class="menu__item-title" @click="item.isShow = !item.isShow">
          {{ item.title }}
        </p>
        <AppHeaderMobileSubmenu
            :menu="item.subMenu"
            :class="{'active':item.isShow}"
            @close="$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderMobileSubmenu from "@/components/app/AppHeaderMobileSubmenu";

export default {
  components: {AppHeaderMobileSubmenu},
  props: {
    menu: Array
  },
}
</script>

<style lang="scss" scoped>
@import "/src/assets/scss/components/headerMenuMobile";
</style>
