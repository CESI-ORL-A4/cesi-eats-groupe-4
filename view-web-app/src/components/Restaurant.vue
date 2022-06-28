<script setup lang="ts">

import router from "@/router";

const list_restaurant= [
  {id: "1" ,name : "burger-king", image: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "2" ,name : "burger-king", image: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "3" ,name : "burger-king", image: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "4" ,name : "burger-king", image: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "5" ,name : "burger-king", image: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
]
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
      <div class="restaurant-card"   :key="restaurant"  v-for="restaurant in list_restaurant" @click="pushMenu(restaurant.id)">
        <img  class="image_restaurant" alt="restaurant" :src="restaurant.image">
        <h1>{{restaurant.name}}</h1>
        <p>{{restaurant.address}}</p>
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
}

.image_restaurant{
  height: 180px;
  border-radius: 15px;

}

#div_restaurant{
  margin-left: 20px;
}
</style>