<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <p class="footer__copyright">
          <i class="icofont-copyright"></i> copyright all rights reserved.
        </p>
        <p class="footer__author">
          Telegram: <a href="https://t.me/victor_web" class="link" target="_blank" rel="noopener">vr-web</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
.footer {
  background-color: $bg-header;
  width: 100%;
  padding: 1rem 0;
  border-top: 0.063rem solid rgba($color-white, 0.2);
  margin-top: 3rem;
  &__inner {
    text-align: center;
  }
  &__copyright {
    margin-bottom: 0.5rem;
  }
  .link {
    font-size: 1rem;
    display: inline-block;
  }
}
</style>