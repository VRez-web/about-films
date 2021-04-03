<template>
  <div class="career__other">
    <div class="career__other-wrapper" v-show="!!production.length">
      <h3 class="career__title-category">Продакшн</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in production" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!creator.length">
      <h3 class="career__title-category">Создатель</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in creator" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!writer.length">
      <h3 class="career__title-category">Сценарий</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in writer" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!director.length">
      <h3 class="career__title-category">Режиссура</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in director" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!camera.length">
      <h3 class="career__title-category">Камера</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in camera" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!editing.length">
      <h3 class="career__title-category">Монтаж</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in editing" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!sound.length">
      <h3 class="career__title-category">Звук</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in sound" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!visualEffects.length">
      <h3 class="career__title-category">Визуальные эффекты</h3>
      <ul class="career__actor-list">
        <li
          class="career__actor-item"
          v-for="role in visualEffects"
          :key="role"
        >
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!lighting.length">
      <h3 class="career__title-category">Свет</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in lighting" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!art.length">
      <h3 class="career__title-category">Оформление</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in art" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="career__other-wrapper" v-show="!!categoryMore.length">
      <h3 class="career__title-category">Еще</h3>
      <ul class="career__actor-list">
        <li class="career__actor-item" v-for="role in categoryMore" :key="role">
          <span class="career__actor-item-date">-</span>
          <p>
            <router-link
              :to="{
                name: 'card-details',
                params: { id: role.id, category: category(role) },
              }"
              class="link"
              >{{ correctTitle(role) }}</router-link
            >
            <span v-show="role.episode_count"
              >({{ role.episode_count }} эпизод)</span
            >
            <span v-show="role.job" class="career__actor-item-job"
              >"{{ role.job }}"</span
            >
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sound: Array,
    camera: Array,
    production: Array,
    creator: Array,
    writer: Array,
    director: Array,
    editing: Array,
    categoryMore: Array,
    art: Array,
    visualEffects: Array,
    lighting: Array,
  },
  data() {
    return {};
  },

  methods: {
    correctTitle(item) {
      return item.title ? item.title : item.name;
    },

    category(item) {
      return item.episode_count ? "serial" : "movie";
    },
  },
};
</script>

<style lang="scss" scoped>
.career {
  &__other {
    margin-left: 5rem;
  }
  &__title-category {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &__actor {
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      &-date {
        margin-right: 1rem;
      }
      p {
        display: flex;
        align-items: flex-end;
      }
      &-job {
        margin-left: 0.5rem;
      }
    }
  }
  .link {
    font-size: 1rem;
  }
}
</style>
