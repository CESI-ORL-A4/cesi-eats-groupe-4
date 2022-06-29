<script setup lang="ts">


let list_menus = [
  {name : "Menu1", articles: [{name : "coca"},{name : "burger"}], price: 17.5, idMenu: "1"},
  {name : "Menu2", articles: [{name : "coca"},{name : "burger"}], price: 17.5, idMenu: "2"},
  {name : "Menu3", articles: [{name : "coca"},{name : "burger"}], price: 17.5, idMenu: "3"}
]


</script>

<template>
  <div>
    <div class="flex-container" v-for="list_menu in list_menus" :key="list_menu">
      <p>{{list_menu.name}}</p>
      <p>{{list_menu.price}}</p>
      <p>{{list_menu.idMenu}}</p>
      <p>Composition : </p>
      <div v-for="article in list_menu.articles" :key="article">

        <p><span>  -  </span>{{article.name}}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.flex-container{
  display: flex;

}
</style>