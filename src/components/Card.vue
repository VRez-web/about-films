<template>
  <div class="card">

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/scss/_vars.scss";

.card {
  width: 18%;
  color: $color-white;
  margin: 0 1.25rem 2.5rem 0;
  transition: all 0.3s linear;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transform: scale(1.05);

    .card__about {
      opacity: 1;
    }

    img {
      filter: blur(1px);
    }
  }

  img {
    width: 100%;
    height: auto;
    min-height: 350px;
    max-height: 350px;
    display: block;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
    
  }
  &__wrapper {
    position: relative;
  }

  &__about {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    border-radius: 0.938rem;
    transition: all 0.3s linear;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      width: 100%;
      text-align: center;
    }
  }
  &__vote {
    margin: 0 0 -3rem 0;
    padding: 0.313rem 0;
    position: relative;
    z-index: 1;
    width: 20%;
    text-align: center;
    font-weight: 700;

    &.high-rating {
      background-color: $bg-highRating;
    }
    &.mid-rating {
      background-color: $bg-midRating;
    }
    &.low-rating {
      background-color: $bg-lowRating;
    }
  }

  &-name-and-date {
    text-align: center;
  }
  &__name {
    margin: 0.625rem 0;
  }
}
</style>