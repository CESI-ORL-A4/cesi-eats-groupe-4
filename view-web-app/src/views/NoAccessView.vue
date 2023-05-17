<script setup lang="ts">
import router from "@/router";

const retour = ()=>{
  router.back()
}
</script>

<template>
  <p>Vous n'avez pas les droits pour atteindre cette page</p>
  <b-button style="margin-left: 2%" variant="danger" @click="retour">Retour</b-button>
</template>

<style scoped>
p{
  margin: 5% 2%;
  font-family: PoppinsSemiBold;
  color: red;
  font-size: 30px;
}
</style>
