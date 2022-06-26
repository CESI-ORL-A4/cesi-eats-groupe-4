<script lang="ts" setup>

import router from "@/router";

function pushProductShowPage(id: string) {
  router.push({path: `/owner/history-command/${id}`})
}

const list_history_command = [
  {
    id: "1",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "2",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "3",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "4",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
];
</script>


<template>
  <div>
    <div class="flex-container-add_product">
      <div><h2>Historique des commandes :</h2></div>
    </div>
    <div class="product-wrapper">
      <div class="product-card product-border" :key="history_command" v-for="history_command in list_history_command"
           @click="pushProductShowPage(history_command.id)">
        <h3>Commande n°{{ history_command.id }}</h3>
        <ul>
          <li>Client : {{ history_command.first_name }} {{ history_command.last_name }}</li>
          <li>Adresse : {{ history_command.address }}</li>
          <li>Téléphone : {{ history_command.phone }}</li>
          <li>Menus :</li>
          <ul>
          <li>{{ history_command.articles.menu1 }}</li>
          <li>{{ history_command.articles.menu2 }}</li>
          <li>{{ history_command.articles.menu3 }}</li>
          <li>{{ history_command.articles.menu4 }}</li>
          </ul>
        </ul>
        <center>
          <p>
            <button type="button" class="btn_update_product">Accéder à la commande</button>
          </p>
        </center>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container-add_product {
  display: flex;
  justify-content: space-between;
}

.btn_manage {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.btn_update_product {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.product-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  margin-left: 20px;
}

.product-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

</style>