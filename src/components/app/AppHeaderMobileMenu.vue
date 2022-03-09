<template>
  <div class="header__hamburger">
    <button v-if="!isOpen" @click="isOpen = true">
      <svg
          fill="#fff" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve"
          width="25"
          height="25"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M26,16c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,14,26,14.896,26,16z" id="XMLID_314_"/>
        <path d="M26,8c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,6,26,6.896,26,8z"
              id="XMLID_315_"/>
        <path d="M26,24c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,22,26,22.896,26,24z"
              id="XMLID_316_"/></svg>
    </button>
    <button v-else class="header__hamburger-cross">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
        <g id="Layer_2" data-name="Layer 2">
          <g id="close">
            <g id="close-2" data-name="close">
              <rect class="cls-1" width="24" height="24" fill="transparent" transform="translate(24 24) rotate(180)"/>
              <path fill="#fff" class="cls-2"
                    d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
            </g>
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
