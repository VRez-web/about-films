import { createStore } from 'vuex'

const store=createStore({
  state() {
    return{
      count:0,
      apiKey:"f74144cebf6695340f4726c27579484e",
      imgUrl:"https://image.tmdb.org/t/p/w500"
    }
  
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    API_KEY: state=>{
      return state.apiKey
    },
    IMG_URL:state=>{  
      return state.imgUrl
    }
  }
})

export default store;