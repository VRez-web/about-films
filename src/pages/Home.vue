<template>
  <main>
    <section class="">  
    </section>
  </main>
</template>

<script>
import axios from "../plugins/axios";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      apiKey: "f74144cebf6695340f4726c27579484e",
      apiUrl:'https://api.themoviedb.org/3',
    });

    onMounted(() => {
      axios
        .get(
          `${state.apiUrl}/movie/latest?api_key=${state.apiKey}&language=ru-RU`
        )
        .then(function (response) {
          console.log(response);
        });
    });
  },
};
</script>

<style>
main{
    background-color: #141414;
}
</style>