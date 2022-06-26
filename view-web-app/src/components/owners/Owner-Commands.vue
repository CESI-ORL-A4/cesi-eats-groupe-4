<script lang="ts" setup>

import router from "@/router";

function pushCommandShowPage(id: string) {
  router.push({path: `/owner/command/${id}`})
}

function ownerHistoryCommandPage() {
  router.push({name: "owner-history-command"})
}

/* STATUS :
* En cours de validation
* En cours de préparation (après acceptation) ou Refusée
* Prête
* Expédiée
* */

const list_command = [
  {
    id: "1",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    status: "En cours de validation",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "2",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    status: "En cours de préparation",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "3",
    first_name: "Anthime",
    last_name: "Didi",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    status: "En cours de préparation",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
  {
    id: "4",
    first_name: "Anthime",
    last_name: "Didi",
    status: "Prête",
    address: "338 rue aux chiens à Olivet",
    phone: "06 65 43 38 84",
    articles: {menu1: "Tacos simple", menu2: "Tacos triple", menu3: "Kebab", menu4: "Tacos simple",},
  },
];
</script>


<template>
  <div>
    <div class="flex-container-add_product">
      <div><h2>Commandes en cours / prêtes :</h2></div>
      <div><p><button type="button" class="btn_manage" @click="ownerHistoryCommandPage">Voir l'historique des commandes</button></p></div>
    </div>
    <div class="product-wrapper">
      <div class="product-card product-border" :key="command" v-for="command in list_command"
           @click="pushCommandShowPage(command.id)">
        <h3>N°{{ command.id }} - {{ command.status }}</h3>
        <ul>
          <li>Client : {{ command.first_name }} {{ command.last_name }}</li>
          <li>Adresse : {{ command.address }}</li>
          <li>Téléphone : {{ command.phone }}</li>
          <li>Menu(s) acheté(s) :</li>
          <ul>
            <li>{{ command.articles.menu1 }}</li>
            <li>{{ command.articles.menu2 }}</li>
            <li>{{ command.articles.menu3 }}</li>
            <li>{{ command.articles.menu4 }}</li>
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