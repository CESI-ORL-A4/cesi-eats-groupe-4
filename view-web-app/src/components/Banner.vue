<script setup lang="ts">
import router from "@/router"
function btn_sign_up(){
  router.push({name : "SignUp"})
}
function btn_sign_in(){
  router.push({name : "SignIn"})
}
</script>

<template>
  <div class="flex-container">
    <div class="item">
      <p>CesiEats</p>
    </div>
    <div class="item-x">
      <button type="button" class="btn_sign_in" @click="btn_sign_in">Connexion</button>
      <button type="button" class="btn_sign_up" @click="btn_sign_up">Inscription</button>
    </div>
  </div>

</template>


<style scoped>
.item{
  font-size: 24px;
  margin-left: 20px;
}
.item-x{
  margin-right: 20px;
}
.btn_sign_up{
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}
.btn_sign_in{
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
  padding: 8px;
}


.item {
  /* flex:0 1 auto; */
  flex-shrink: 1;
  align-self: center;
  color: white;
}

.item-x {
  /* flex:0 1 auto; */
  align-self: center;
  color: white;
}
</style>