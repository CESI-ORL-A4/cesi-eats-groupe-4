<script setup lang="ts">

import router from "@/router";

const list_restaurant= [
  {id: "1" ,name : "burger-king", img: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "2" ,name : "burger-king", img: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "3" ,name : "burger-king", img: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "4" ,name : "burger-king", img: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
  {id: "5" ,name : "burger-king", img: "https://images.squarespace-cdn.com/content/v1/5b2cd12dee17596af71ba454/1539847301184-3UITCHK67PAFGBIOSK7U/Pur-Restaurant-Paris.jpg", description: "cesi est un restaurant", address: "37a rue du nécotin"},
]
function pushMenu(id: string){
  router.push({path: `/Menu/${id}`})
}

</script>

<template>
  <div>
    <div id="food">
      <div class="restaurants-wrapper">
        <div class="restaurant-card"   :key="restaurant"  v-for="restaurant in list_restaurant" @click="pushMenu(restaurant.id)">
          <img alt="restaurant" :src="restaurant.img">
          <h1>{{restaurant.name}}</h1>
          <p>{{restaurant.address}}</p>
          <p>{{restaurant.description}}</p>
        </div>
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
  margin-left: 10px;
}

img{
  height: 130px;
}
</style>