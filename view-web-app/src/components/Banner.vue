<script setup lang="ts">
import router from "@/router"

const role = localStorage.getItem('role');

function btn_sign_up() {
  router.push({name: "signUp"})
}

function btn_sign_in() {
  router.push({name: "signIn"})
}

function btn_account() {
  router.push({name: "account"})
}

function homePage() {
  if(!role)
  {
    router.push({name: "home"})
  }
  else if(role == "BASIC")
  {
    router.push({name: "restaurants"})
  }
  else{
    router.push({name: "home"})
  }

}

</script>

<template>
  <header class="flex-container">
    <p class="header-title" @click="homePage">Cesi <span>Eats</span></p>
    <div class="item-x">
      <button v-show="role" type="button" class="btn_notif"><img height="13" alt="Notif" src="@/assets/icon-notif.png"></button>
      <button v-show="role" type="button" class="btn_account" @click="btn_account">Mon compte</button>
      <button v-show="!role" type="button" class="btn_sign_in" @click="btn_sign_in">Connexion</button>
      <button v-show="!role" type="button" class="btn_sign_up" @click="btn_sign_up">Inscription</button>
    </div>
  </header>
</template>


<style scoped>
button {
  outline: none;
  border: none;
  font-family: Poppins;
}

button:hover {
  opacity: 0.9;
}

.btn_notif {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 10px;
  width: 43px;
  height: 43px;
}

.btn_account {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}

.btn_sign_up {
  font-size: 15px;
  background-color: white;
  border-radius: 100px;
  padding: 8px 30px 8px 30px;
}

.btn_sign_in {
  font-size: 14px;
  margin-right: 20px;
  background-color: white;
  border-radius: 100px;
  padding: 8px 30px 8px 30px;
}


.flex-container {
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 20px;
  gap: 5px;
  box-shadow: 0 5px 20px black;
}

.flex-container > div {
  border-radius: 5px;
  padding: 0px;
}

p {
  margin: 12px;
}

.header-title {
  /* flex:0 1 auto; */
  font-family: "Poppins";
  font-size: 28px;
  margin-left: 15px;
  flex-shrink: 1;
  align-self: center;
  color: white;
  margin: 0;
  cursor: pointer;
}

.header-title span {
  color: #06C167;
  font-family: "PoppinsSemiBold";
}

.item-x {
  /* flex:0 1 auto; */
  align-self: center;
  color: white;

}
</style>
