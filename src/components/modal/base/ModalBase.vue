<template>
  <div class="modal">
    <button class="modal__close link" @click="$emit('close')">Назад</button>
    <div class="modal__content">
      <slot name="modal-content"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/vars";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color-black, 0.5);
  z-index: 999;

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.3rem;
  }
}
</style>
