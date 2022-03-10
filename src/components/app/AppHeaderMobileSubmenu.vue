<template>
  <div class="menu__item-submenu">
    <div v-for="item in menu" @click="pushToPage(item.link)">
      <p class="menu__item-link">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: Array
  },
  methods: {
    pushToPage(link) {
      this.$emit('close')
      this.$router.push({name: link})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "/src/assets/scss/components/headerMenuMobile";
</style>
