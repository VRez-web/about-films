<template>
  <modal-base @close="$emit('close')">
    <template #modal-content>
      <div class="trailer">
        <div class="trailer__main">
          <iframe
              :src="`https://www.youtube.com/embed/${firstTrailer.key}`"
              frameborder="0"
              allowfullscreen
          />
        </div>
        <div v-for="trailer in trailers" class="trailer__list">
          <div class="trailer__item" @click="changeMain(trailer)">
            <iframe
                :src="`https://www.youtube.com/embed/${trailer.key}`"
                frameborder="0"
                allowfullscreen
            />
            <p class="trailer__item-title">{{ formattedText(trailer.name) }}</p>
          </div>
        </div>
      </div>
    </template>
  </modal-base>
</template>

<script>
import ModalBase from '@/components/modal/base/ModalBase'

export default {
  components: {
    ModalBase
  },
  props: {
    model: Array
  },
  data() {
    return {
      firstTrailer: this.model[0]
    }
  },
  computed: {
    trailers() {
      return this.model.filter(el => el.id !== this.firstTrailer.id)
    }
  },
  methods: {
    formattedText(text) {
      return text.replace('- официальный трейлер', '')
    },

    changeMain(trailer) {
      this.firstTrailer = trailer
    }
  },
  mounted() {
    document.body.style = 'overflow:hidden'
  },
  beforeUnmount() {
    document.body.style = 'overflow:auto'
  }
}
</script>

<style lang="scss" scoped>
.trailer {
  display: flex;
  gap: 10px;
  background: #1f1f1f;
  padding: 20px;
  border-radius: 5px;

  &__main {
    width: 1024px;
    height: 620px;
  }

  &__list {
    display: flex;
    gap: 10px;
  }

  &__item {
    height: 94px;
    width: 168px;
    cursor: pointer;

    &-title {
      font-size: 14px;
      margin-top: 8px;
    }

    iframe {
      pointer-events: none;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
