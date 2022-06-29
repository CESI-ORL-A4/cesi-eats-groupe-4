<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

let showPopup = ref(false);

function btn_add_cart(id: string){
  showPopup.value = false;
  console.log(id);
}



const props = defineProps({
  menu:{}
})
</script>


<template>
  <div>
    <button class="button" @click="showPopup = true">
      Voir
    </button>
    <transition name="fade" appear>
      <div class="popup-overlay" v-if="showPopup" @click="showPopup = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="popup" v-if="showPopup">
        <img class="image_popup" alt="menu" :src="menu.image"/>
        <h1>{{menu.name}}</h1>
        <p>{{menu.description}}</p>
        <p>{{menu.price}}</p>
        <ul>
          <li>Article : </li>
          <ul>
            <li :key="article" v-for="article in menu.articles">{{article.name}}</li>
          </ul>
        </ul>
        <div class="flex_btn">
        <button class="btn_cancel" @click="showPopup = false">
          Quitter
        </button>
        <button class="btn_cart" @click="btn_add_cart(menu.id)">
          Ajouter au panier
        </button>
        </div>
      </div>
    </transition>
  </div>
</template>



<style scoped>

.image_popup{
  height: 230px;
  border-radius: 100px;
}

.flex_btn{
  display: flex;
  justify-content: space-between;

}

.btn_cancel{
  border-radius: 20px;
}

.btn_cart{
  background-color: #F6F6F6;
  float: right;
  border-radius: 20px;
}

img{
  height: 310px;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: #282828;
  cursor: pointer;
  float: right;
  margin-top: -40px;
  display: inline-block;
  padding: 15px 25px;
  border-radius: 8px;

  color: white;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

&:hover {
   box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.popup {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: burlywood;
  border-radius: 16px;
  padding: 25px;
}
h1 {
  color: #282828;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #282828;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
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
</style>