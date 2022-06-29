<script setup lang="ts">

import router from "@/router";
import axios from "axios";
import {onBeforeMount, ref} from "vue";
import {getRestaurantByOwnerId, getRestaurants} from "@/modules/restaurantAPI";
import {getMenus} from "@/modules/menuAPI";
import {useRoute} from "vue-router";

let list_restaurant= ref([]);




onBeforeMount(async () => {
  const restaurants = await getRestaurants();
  console.log(restaurants);
  if(restaurants){
    list_restaurant.value = restaurants;
  }
});


function pushMenu(id: string){
  router.push({path: `/restaurant/${id}`})
}

</script>

<template>
  <div><br/>
    <div id="div_restaurant">
      <h1>
        Nos restaurants :
      </h1><br/>
    </div>
    <div class="restaurants-wrapper">
      <div class="restaurant-card"   :key="restaurant"  v-for="restaurant in list_restaurant" @click="pushMenu(restaurant._id)">
        <img  class="image_restaurant" alt="restaurant" :src="restaurant.image">
        <h1>{{restaurant.name}}</h1>
        <h5>Adresse : </h5>
        <p> {{restaurant.address}}</p>
        <h5>Description : </h5>
        <p>{{restaurant.description}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.restaurants-wrapper{
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;

}
.restaurant-card{
  margin-left: 30px;
  margin-bottom: 30px;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 20px;
  background-color: antiquewhite;
  max-width: 400px;
}

.image_restaurant{
  height: 180px;
  border-radius: 15px;

}

#div_restaurant{
  margin-left: 20px;
}
</style>