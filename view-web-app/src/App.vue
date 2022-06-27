<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Banner from '@/components/Banner.vue'

</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <Banner />
  <RouterView />


</template>

<style>
body {
  margin: 0;
  font-family: Poppins;
}
@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Poppins_bold";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-bold.ttf) format("truetype");
}
@font-face {
  font-family: "Poppins_semiBold";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-SemiBold.ttf) format("truetype");
}
</style>
