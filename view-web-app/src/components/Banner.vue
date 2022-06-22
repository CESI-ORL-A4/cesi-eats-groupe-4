<script setup lang="ts">

</script>

<template>
  <div class="flex-container">
    <div class="item">
      <p>CesiEats</p>
    </div>
    <div class="item-x">
      <button type="button" class="btn_sign_up" onclick="btn_sign_up">Connexion</button>
      <button type="button" class="btn_sign_in" onclick="btn_sign_in">Inscription</button>
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
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}
.btn_sign_in{
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}

</style>