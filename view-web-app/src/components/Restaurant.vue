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
     <div class="menu-wrapper">
      <b-card-group columns>
        <div :key="restaurant"  v-for="restaurant in list_restaurant" @click="pushMenu(restaurant._id)">
          <div>
            <b-card
                :title="restaurant.name"
                :img-src="restaurant.image"
                :img-alt="restaurant.name"
                img-top
                tag="article"
                style="max-width: 27rem;"
                class="mb-2"
            >
              <b-card-text>
                <h5>Adresse : </h5>
                <p> {{restaurant.address}}</p>
                <h5>Description : </h5>
                <p>{{restaurant.description}}</p>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </b-card-group>
    </div>



  </div>
</template>

<style scoped>

.menu-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
}


#div_restaurant{
  margin-left: 20px;
}
</style>