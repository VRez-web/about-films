<template>
  <app-header />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <app-footer />
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from './components/AppFooter.vue';
export default {
  components: { AppHeader, AppFooter},
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
