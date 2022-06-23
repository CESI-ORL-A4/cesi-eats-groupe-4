<script setup lang="ts">
import router from "@/router";

function basicPage() {
  router.push({name: "basic"})
}

function delivererPage() {
  router.push({name: "deliverer"})
}

function ownerPage() {
  router.push({name: "owner"})
}

const role = localStorage.getItem('role');
const role_basic = '"BASIC"';
const role_deliverer = '"DELIVERER"';
const role_owner = '"OWNER"';
console.log(role);

</script>

<template>
  <div class="flex-container">
    <div>
      <h2>Informations sur votre compte :</h2>
      <ul>
        <li><p>Prénom : xxxxx</p></li>
        <li><p>Nom de famille : xxxxx</p></li>
        <li><p>Date de naissance : xx/xx/xxxx</p></li>
        <li><p>Téléphone : xx xx xx xx xx</p></li>
        <li><p>Email : xxxxxxxx@gmail.com</p></li>
        <li><p>Mot de passe : ********</p></li>
      </ul>
      <button type="button" class="btn_manage">Modifier mes informations</button>
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
        <li><p>Nom : xxxxxx</p></li>
        <li><p>Adresse : xxxxxx</p></li>
        <li><p>Description : xxxxxx</p></li>
        <li><p>[Image]</p></li>
      </ul>
      <button type="button" class="btn_manage" @click="ownerPage">Gérer mon restaurant</button>
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

