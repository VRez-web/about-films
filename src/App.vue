<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <transition name="scale">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  components: { AppHeader },
};
</script>
<style lang="scss">
.scale-enter-active,
.scale-leave-active {
  transition: all .5s 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
