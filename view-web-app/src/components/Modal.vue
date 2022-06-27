<script setup lang="ts">
import {ref} from "vue";

let showModal = ref(false);

function btn_add_cart(id: string){
  showModal.value = false;
  console.log(id);
}

const props = defineProps({
  menu:{}
})
</script>

<template>
  <div>
    <button class="button btn_menu" @click="showModal = true">
      Voir
    </button>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <div></div>
        <img alt="menu" :src="menu.image">
        <h1>{{menu.name}}</h1>
        <p>{{menu.description}}</p>
        <ul>
          <li>Article : </li>
          <ul>
            <li :key="article" v-for="article in menu.articles" class="article_name"> {{article.name}}</li>
          </ul>
        </ul>
        <p>{{menu.price}}</p>
        <div class="space">
          <button class="button" @click="showModal = false">
            Quitter
          </button>
          <button class="button"  @click="btn_add_cart(menu.id)">
            Ajouter au panier
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}
.space{
  display: flex;
  justify-content: space-between;
}
.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
  border-radius: 8px;

  color: #FFF;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

&:hover {
   box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #FFF;
  border-radius: 16px;

  padding: 25px;

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
.btn_menu{
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 80px;
  height: 40px;
  float: right;
  margin-top: -27px;
}

img{
  height: 130px;
}
</style>