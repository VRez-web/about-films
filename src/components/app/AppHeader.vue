<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__wrapper">
          <h1>
            <router-link :to="{ name: 'home' }" class="header__logo">
              About<span>films</span>
            </router-link>
          </h1>
          <AppHeaderMobileHamburger :is-show="isShowMobileMenu" @toggle-menu="toggleMobileMenu"/>
          <nav class="header__nav">
            <div
                v-for="item in menu"
                @mouseenter="item.isShow = true"
                @mouseleave="item.isShow = false"
                class="header__nav-item"
            >
              <p class="header__nav-title">{{ item.title }}</p>
              <AppHeaderSubMenu
                  :class="{'active':item.isShow, 'people': item.title === 'Люди'}"
                  :list="item.subMenu"
                  @close="item.isShow = false"/>
            </div>
          </nav>
        </div>

        <div class="header__group" @click="openSearch">
          <div class="header__search">
            <i class="icon-search"></i>
            <span>Поиск</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <search v-if="searchShow" :data="searchShow" @close="closeSearch"/>
  <AppHeaderMobileMenu :class="{'active':isShowMobileMenu}" :menu="menu" @close="isShowMobileMenu = false"/>
</template>

<script>
import search from "../search/Search";
import AppHeaderSubMenu from "@/components/app/AppHeaderSubMenu";
import AppHeaderMobileHamburger from "@/components/app/AppHeaderMobileHamburger";
import AppHeaderMobileMenu from "@/components/app/AppHeaderMobileMenu";

export default {
  components: {
    AppHeaderMobileMenu,
    AppHeaderSubMenu,
    search,
    AppHeaderMobileHamburger,
  },
  data() {
    return {
      searchShow: false,
      menu: [
        {
          title: 'Фильмы',
          isShow: false,
          subMenu: [
            {title: 'Популярные', link: 'movies-popular'},
            {title: 'Лучшие', link: 'movies-topRated'},
            {title: 'Ожидаемые', link: 'movies-upcoming'},
            {title: 'Смотрят сейчас', link: 'movies-theatres'},
          ]
        },
        {
          title: 'Сериалы',
          isShow: false,
          subMenu: [
            {title: 'Популярные', link: 'serials-popular'},
            {title: 'Лучшие', link: 'serials-topRated'},
            {title: 'На неделю', link: 'serials-week'},
            {title: 'На сегодня', link: 'serials-today'},
          ]
        },
        {
          title: 'Люди',
          isShow: false,
          subMenu: [
            {title: 'Популярные', link: 'persons-popular'}
          ]
        }
      ],
      isShowMobileMenu: false,
    };
  },
  methods: {
    closeSearch() {
      this.searchShow = false;
    },

    openSearch() {
      this.searchShow = true
    },

    toggleMobileMenu(isOpen) {
      this.isShowMobileMenu = isOpen
    }
  },
};
</script>
