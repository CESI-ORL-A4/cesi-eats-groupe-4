<script setup lang="ts">
import Modal from '@/components/Modal.vue'

const list_menus = [
  {
    id: "1",
    name: "Kebab",
    description: "Tacos triple cordon bleu.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "6,50 €",
    articles: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
  {
    id: "2",
    name: "Tacos simple",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "7,50 €",
    articles: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
  {
    id: "3",
    name: "Tacos double",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "8,50 €",
    articles: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
  {
    id: "4",
    name: "Tacos triple",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "9,50 €",
    articles: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
  {
    id: "5",
    name: "Burger",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "9,00 €",
    articles: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
  {
    id: "6",
    name: "Sandwich",
    description: "Viande au choix. Servi avec frites et boisson 33 cl au choix.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kebab.JPG/1200px-Kebab.JPG",
    price: "8,00 €",
    article: [
      {name: "Coca-cola"},
      {name: "Kebab Jambon"},
      {name: "Glace Vanille"},
    ],
  },
];

</script>

<template>
  <div>
    <div class="restaurant">
      <h1>Chez MOMO</h1>
      <h3>Nos Menus : </h3>
    </div>

    <div class="menu-wrapper" >
      <div class="menu-card menu-border"   :key="menu"  v-for="menu in list_menus" >
        <img alt="menu" :src="menu.image">
        <h1>{{menu.name}}</h1>
        <p>{{menu.price}}</p>
        <div>
          <Modal :menu="menu"/>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.restaurant{
  padding-left: 50px;
}



.menu-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.menu-card {
  margin-left: 10px;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 20px;
  background-color: antiquewhite;
}

.menu-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 15px;
}
img{
  height: 130px;
}

.article_name{
  margin-left: 20px;
}


</style>