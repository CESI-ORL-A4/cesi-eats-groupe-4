<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Banner from '@/components/Banner.vue'
import { onMounted } from 'vue';
import { tryLoadUserData } from "./auth/auth";

onMounted(() => {
    tryLoadUserData();
})

</script>

<template>
  <Banner/>
  <RouterView />
</template>

<style>
body, html {
  margin: 0;
  font-family: Poppins;
  height: 100%;
  background-color: #fcfcfc;
}

#app {
  height: 100%;
}

@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "PoppinsMedium";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-Medium.ttf) format("truetype");
}
@font-face {
  font-family: "PoppinsBold";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-bold.ttf) format("truetype");
}
@font-face {
  font-family: "PoppinsSemiBold";
  src: local("Poppins"),
  url(./assets/Fonts/Poppins/Poppins-SemiBold.ttf) format("truetype");
}
</style>
