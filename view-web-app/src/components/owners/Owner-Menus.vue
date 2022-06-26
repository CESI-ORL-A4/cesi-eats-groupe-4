<script lang="ts" setup>

import router from "@/router";

function pushMenuUpdatePage(id: string) {
  router.push({path: `/owner/menus/${id}`})
}
function pushMenuAddPage() {
  router.push({name: "owner-menu-add"})
}

const list_menus = [
  {
    id: "1",
    name: "Kebab",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "6,50 €",
  },
  {
    id: "2",
    name: "Tacos simple",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "7,50 €",
  },
  {
    id: "3",
    name: "Tacos double",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "8,50 €",
  },
  {
    id: "4",
    name: "Tacos triple",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "9,50 €",
  },
  {
    id: "5",
    name: "Burger",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "9,00 €",
  },
  {
    id: "6",
    name: "Sandwiche",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "8,00 €",
  },
];

</script>

<template>
  <div>
    <div class="flex-container-add_menu">
      <div><h2>Menus disponibles dans votre restaurant :</h2></div>
      <div><p><button type="button" class="btn_manage" @click="pushMenuAddPage">Ajouter un menu</button></p><br></div>
    </div>
    <div class="menu-wrapper">
      <div class="menu-card menu-border" :key="menu" v-for="menu in list_menus"
           @click="pushMenuUpdatePage(menu.id)">
        <p>{{ menu.name }} - {{ menu.price }}</p>
        <img height="180" alt="Menu" :src="menu.image">
        <center><p><button type="button" class="btn_update_menu">Modifier / Supprimer le menu</button></p></center>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container-add_menu {
  display: flex;
  justify-content: space-between;
}

.btn_manage {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.btn_update_menu {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.menu-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-card {
  margin-left: 20px;
}

.menu-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

</style>