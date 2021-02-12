import axios from 'axios';
export default{
  namespaced: true,
  state: {
    tvShowsTopRated: [],
    apiKey: "f74144cebf6695340f4726c27579484e",
    page:1
  },
  mutations: {
    SET_TV_SHOWS_TOP_RATED_TO_STATE: (state, tvShowsTopRated) => {
      state.tvShowsTopRated = tvShowsTopRated;
    },
  },
  actions: {
    GET_TV_SHOWS_TOP_RATED({ commit },page=this.state.page) {
      return axios
        .get(`/tv/top_rated?api_key=${this.state.apiKey}&language=ru-RU&page=${page}`)
        .then((res) => {
          commit("SET_TV_SHOWS_TOP_RATED_TO_STATE", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return e
        });
    },
  },
  modules: {},
};
