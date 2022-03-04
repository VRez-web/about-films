<template>
  <div class="header__submenu">
    <div v-for="item in list" class="header__submenu-item" @click="pushToPage(item.link)">
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    pushToPage(link) {
      this.$emit('close')
      this.$router.push({name: link})
    }
  }
}
</script>
