<template>
  <div class="app">
    <app-header/>
    <router-view v-slot="{ Component }" class="app__content">
      <suspense>
        <transition name="fade">
          <component :is="Component"/>
        </transition>
      </suspense>
    </router-view>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from './components/AppFooter.vue';

export default {
  components: {AppHeader, AppFooter},
};
</script>
<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
