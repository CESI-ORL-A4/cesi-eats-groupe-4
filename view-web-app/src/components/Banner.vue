<script setup lang="ts">
import router from "@/router"

function btn_sign_up() {
  router.push({name: "SignUp"})
}

function btn_sign_in() {
  router.push({name: "SignIn"})
}

function homePage() {
  router.push({name: "home"})
}

</script>

<template>
  <div class="flex-container">
    <div class="item" @click="homePage">
      <p><img alt="Redirection home" src="../assets/home.png" width="22" height="22"/> Cesi <span>Eats</span></p>
    </div>
    <div class="item-x">
      <button type="button" class="btn_sign_in" @click="btn_sign_in">Connexion</button>
      <button type="button" class="btn_sign_up" @click="btn_sign_up">Inscription</button>
    </div>
  </div>
</template>


<style scoped>
span {
  color: #ff5404
}


.btn_sign_up {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}

.btn_sign_in {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #151515;
  height: 100%;
  gap: 5px;

}

.flex-container > div {
  border-radius: 5px;
  padding: 0px;
}


.item {
  /* flex:0 1 auto; */
  font-size: 30px;
  margin-left: 15px;
  flex-shrink: 1;
  align-self: center;
  color: white;
}

.item-x {
  /* flex:0 1 auto; */
  margin-right: 20px;
  align-self: center;
  color: white;

}
</style>