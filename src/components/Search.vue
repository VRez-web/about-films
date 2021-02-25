<template>
  <section class="search">
    <div class="container">привет</div>
  </section>
</template>

<script>
export default {
  props: { searchShow: Boolean },
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style>
.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>