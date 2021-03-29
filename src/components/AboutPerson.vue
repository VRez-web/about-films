<template>
  <section class="person">
    <div class="container">
      <div class="person__inner">
        <img src="" alt="">
        <div class="person__description">
          <h3 class="person__title"></h3>
          <p class="person__biography"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import slider from './Slider'
export default {
  components:{
    slider
  },
data(){
  return{

  }
},
methods:{
  ...mapActions(['GET_ABOUT_PERSON']),
},
computed:{
  id(){
    return this.$route.params.id
  }
},
async mounted(){
  const ABOUT_PERSON = await this.GET_ABOUT_PERSON(this.id)
  console.log(ABOUT_PERSON);
}

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";
</style>