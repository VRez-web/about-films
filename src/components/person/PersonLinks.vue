<template>
  <div class="person__socials">
    <a
        v-if="!!socials.instagram_id"
        :href="`https://www.instagram.com/${socials.instagram_id}`"
        title="Посетить instagram"
        target="_blank"
        rel="noopener"
    >
      <i class="icon-instagram"></i>
    </a>
    <a
        v-if="!!socials.facebook_id"
        :href="`https://www.facebook.com/${socials.facebook_id}`"
        title="Посетить facebook"
        target="_blank"
        rel="noopener"
    >
      <i class="icon-facebook"></i>
    </a>
    <a
        v-if="!!socials.twitter_id"
        :href="`https://www.twitter.com/${socials.twitter_id}`"
        title="Посетить twitter"
        target="_blank"
        rel="noopener"
    >
      <i class="icon-twitter"></i>
    </a>
    <a
        v-if="!!socials.homepage"
        :href="socials.homepage"
        title="Посетить Домашнюю страницу"
        target="_blank"
        rel="noopener"
    >
      <i class="icon-link"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socials: Object
  }
}
</script>

<style>
.person__socials {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
}
</style>
