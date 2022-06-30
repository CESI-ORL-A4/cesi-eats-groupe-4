<script lang="ts" setup>
import router from "@/router";

function ownerProductsPage() {
  router.push({name: "owner-products"})
}

function ownerCommandsPage() {
  router.push({name: "owner-orders"})
}

function ownerHistoryCommandPage() {
  router.push({name: "owner-history-command"})
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
    <button type="button" class="btn_manage_owner" @click="ownerCommandsPage">
      <p>Gérer les commandes</p>
      <img height="120" alt="Menu" src="@/assets/images/owners/command.png">
    </button>
    <button type="button" class="btn_manage_owner" @click="ownerMenusPage"><p>Accéder aux menus</p>
      <img height="120" alt="Menu" src="@/assets/images/owners/menu.png"></button>
    <button type="button" class="btn_manage_owner" @click="ownerProductsPage"><p>Accéder aux articles</p>
      <img height="120" alt="Menu" src="@/assets/images/owners/product.png"></button>
    <button type="button" class="btn_manage_owner" @click="ownerHistoryCommandPage"><p>Voir l'historique des
      commandes</p>
      <img height="120" alt="Menu" src="@/assets/images/owners/history.png"></button>
    <button type="button" class="btn_manage_owner" @click="ownerStatsPage"><p>Statistiques du restaurant</p>
      <img height="120" alt="Menu" src="@/assets/images/owners/stats.png"></button>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;


}

.btn_manage_owner {
  margin-top: 30px;
  background-color: #F6F6F6;
  border-radius: 10px;
  font-size: 120%;
  width: 15em;
  height: 15em;
  margin-left: 2em;
  margin-right: 2em;
  flex-wrap: wrap;
}

p {
  margin: 0;
  margin-bottom: 10px;
  font-family: PoppinsSemiBold;
}
</style>


