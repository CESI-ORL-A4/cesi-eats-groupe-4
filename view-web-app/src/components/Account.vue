<script setup lang="ts">
import router from "@/router";
import {onBeforeMount, ref} from "vue";
import {getRestaurantByOwnerId} from "@/modules/restaurantAPI";

function basicPage() {
  router.push({name: "basic"})
}

function delivererPage() {
  router.push({name: "deliverer"})
}

function ownerPage() {
  router.push({name: "owner"})
}

function ownerRestaurantInformationPage() {
  router.push({name: "owner-restaurant-information"})
}

onBeforeMount(async () => {
  const restaurant = await getRestaurantByOwnerId(localStorage.getItem('id'));
  console.log(restaurant);
  restaurant_information.value = restaurant;
  return "";
});

const role = localStorage.getItem('role');
const role_basic = "BASIC";
const role_deliverer = "DELIVERER";
const role_owner = "OWNER";


const restaurant_information = ref({});
const account_information = {
  first_name: "Anthime",
  last_name: "Didi",
  birthdate: "31/03/1999",
  address: "338 rue aux chiens à Olivet",
  phone: "06 65 43 38 84",
  email: "owner@gmail.com",
  password: "********",
  sponsorship_code: "D54P9POX12",
};
const restaurant_information_bis = {
  name: "Bunny's",
  address: "5 Av. de la Bolière à Orléans",
  description: "Kebabier de père en fils !",
  image: "https://matchpint-cdn.matchpint.cloud/shared/img/pub/110551/1070624494-1585304178_banner.jpeg",
};
</script>

<template>
  <div class="flex-container">
    <div>
      <h2>Informations sur votre compte :</h2>
      <ul>
        <li><p>Prénom : {{ account_information.first_name }} </p></li>
        <li><p>Nom de famille : {{ account_information.last_name }}</p></li>
        <li><p>Date de naissance : {{ account_information.birthdate }}</p></li>
        <li><p>Adresse : {{ account_information.address }}</p></li>
        <li><p>Téléphone : {{ account_information.phone }}</p></li>
        <li><p>Email : {{ account_information.email }}</p></li>
        <li><p>Mot de passe : {{ account_information.password }}</p></li>
      </ul>
      <p>
        <button type="button" class="btn_manage">Modifier mes informations</button>
      </p>
      <br>
      <h2>Parrainage :</h2>
      <p>Votre code de parrainage : {{ account_information.sponsorship_code }} </p><br><br>
      <p>
        <button type="button" class="btn_manage">Supprimer mon compte</button>
      </p>
    </div>
    <div v-if="role === role_basic">
      <h2>Dernière commande :</h2>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <button type="button" class="btn_manage" @click="basicPage">Voir l'historique des commandes</button>
    </div>
    <div v-if="role === role_deliverer">
      <h2>Dernière livraison :</h2>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <button type="button" class="btn_manage" @click="delivererPage">Voir l'historique des livraisons</button>
      <button type="button" class="btn_manage" @click="delivererPage">Commencer une livraison</button>
    </div>
    <div v-if="role === role_owner">
      <h2>Informations sur votre restaurant :</h2>
      <ul>
        <li><p>Nom : {{ restaurant_information.name }} </p></li>
        <li><p>Adresse : {{ restaurant_information.address }}</p></li>
        <li><p>Description : {{ restaurant_information.description }}</p></li>
        <img height="180" alt="Restaurant" :src="restaurant_information.image">
      </ul>
      <p>
        <button type="button" class="btn_manage"  @click="ownerRestaurantInformationPage">Modifier les informations de mon restaurant</button>
      </p>
      <p>
        <button type="button" class="btn_manage" @click="ownerPage">Gérer mon restaurant</button>
      </p>
    </div>
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

