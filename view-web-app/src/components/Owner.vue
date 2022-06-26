<script lang="ts" setup>
import router from "@/router";

function ownerProductsPage() {
  router.push({name: "owner-products"})
}
function ownerCommandsPage() {
  router.push({name: "owner-commands"})
}
function ownerHistoryPage() {
  router.push({name: "owner-history"})
}
function ownerMenusPage() {
  router.push({name: "owner-menus"})
}
function ownerStatsPage() {
  router.push({name: "owner-stats"})
}
</script>

<template>
  <div>
    <p><button type="button" class="btn_manage" @click="ownerCommandsPage">Gérer les commandes</button></p><br>
    <p><button type="button" class="btn_manage" @click="ownerMenusPage">Accéder aux menus</button></p>
    <p><button type="button" class="btn_manage" @click="ownerProductsPage">Accéder aux articles</button></p><br>
    <p><button type="button" class="btn_manage" @click="ownerHistoryPage">Voir l'historique des commandes</button></p>
    <p><button type="button" class="btn_manage" @click="ownerStatsPage">Statistiques du restaurant</button></p>
  </div>
</template>

<style>
.flex-container {
  display: flex;
  justify-content: space-around;
}

.btn_manage {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}
</style>

