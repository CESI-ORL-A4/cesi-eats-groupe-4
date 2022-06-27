<script setup lang="ts">

const list_menus = [
  {
    id: "1",
    name: "Kebab",
    description: "Tacos triple cordon bleu.",
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
    <div class="restaurant">
      <h1>Chez MOMO</h1>
      <h3>Nos Menus : </h3>
    </div>

    <div class="menu-wrapper">
      <div class="menu-card menu-border"   :key="menu"  v-for="menu in list_menus" >
        <img alt="menu" :src="menu.image">
        <h1>{{menu.name}}</h1>
        <p>{{menu.price}}</p>
        <button type="button" class="btn_menu" >Voir</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.restaurant{
  padding-left: 50px;
}

.btn_menu{
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 80px;
  height: 40px;
  float: right;
  margin-top: -45px;
}

.menu-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-card {
  margin-left: 10px;
}

.menu-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 15px;
}
img{
  height: 130px;
}
</style>