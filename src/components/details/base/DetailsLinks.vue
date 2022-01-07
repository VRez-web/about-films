<template>
  <div class="details__links">
    <a
        :href="socials.homepage"
        target="_blank"
        rel="noopener"
        class="details__links-homepage link-hover"
    >Официальная страница</a
    >
    <button
        v-if="!!socials.trailer.length"
        class="details__links-btn link-hover"
        @click="$emit('show-trailer')"
    >
      <i class="icon-play"></i> Трейлер
    </button>
    <div class="details__links-socials">
      <a
          v-show="!!socials.facebook_id"
          :href="`https://www.facebook.com/${socials.facebook_id}`"
          target="_blank"
          rel="noopener"
      ><i class="icon-facebook"></i
      ></a>
      <a
          v-show="!!socials.instagram_id"
          :href="`https://www.instagram.com/${socials.instagram_id}`"
          target="_blank"
          rel="noopener"
      ><i class="icon-instagram"></i
      ></a>
      <a
          v-show="!!socials.twitter_id"
          :href="`https://www.twitter.com/${socials.twitter_id}`"
          target="_blank"
          rel="noopener"
      ><i class="icon-twitter"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    socials: Object
  },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_vars.scss";

.details__links {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;

  &-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 1rem;
    text-align: center;

    i {
      opacity: 0;
      margin-left: -0.875rem;
      transition: all 0.3s linear;
    }

    &:hover {
      i {
        opacity: 1;
        margin-left: 0;
      }
    }

    &:disabled {
      opacity: 0.4;
      border: 1px solid #466296;

      &::before,
      &::after {
        display: none;
      }

      &:hover {
        cursor: auto;
        background-color: transparent;

        i {
          opacity: 0;
          margin-left: -0.875rem;
        }
      }
    }
  }

  &-socials {
    a {
      color: inherit;
      font-size: 1.5rem;
      border: 2px solid transparent;
      border-radius: 50%;
      transition: all 0.4s linear;
      margin-right: 0.625rem;

      &:hover {
        color: $color-tematic;
        border-color: $color-tematic;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
