<script lang="ts" setup>

import router from "@/router";
import {onBeforeMount, ref} from "vue";
import {getRestaurantByOwnerId} from "@/modules/restaurantAPI";
import {getArticles} from "@/modules/articleAPI";

function pushProductUpdatePage(id: string) {
  router.push({path: `/owner/product/${id}`})
}
function pushProductAddPage() {
  router.push({name: "owner-product-add"})
}

onBeforeMount(async () => {
  const products = await getArticles(localStorage.getItem('restaurantId'));
  console.log(products);
  if(products){
    list_products.value = products;
  }
});

const list_products = ref([]);

const list_products_old = [
  {
    id: "1",
    name: "Kebab",
    product_type: "plat",
  },
  {
    id: "2",
    name: "Tacos",
    product_type: "plat",
  },
  {
    id: "3",
    name: "Burger",
    product_type: "plat",
  },
  {
    id: "4",
    name: "Frites",
    product_type: "accompagnement",
  },
  {
    id: "5",
    name: "Riz",
    product_type: "accompagnement",
  },
  {
    id: "6",
    name: "Barbecue",
    product_type: "sauce",
  },
  {
    id: "7",
    name: "Ketchup",
    product_type: "sauce",
  },
  {
    id: "8",
    name: "Mayonnaise",
    product_type: "sauce",
  },
  {
    id: "9",
    name: "Moutarde",
    product_type: "sauce",
  },
  {
    id: "10",
    name: "Coca",
    product_type: "boisson",
  },
  {
    id: "11",
    name: "Ice tea",
    product_type: "boisson",
  },
  {
    id: "12",
    name: "Fanta",
    product_type: "boisson",
  },
];
</script>


<template>
  <div>
    <div class="flex-container-add_product">
      <div><h2>Articles disponibles dans votre restaurant :</h2></div>
      <div><p><button type="button" class="btn_manage" @click="pushProductAddPage">Ajouter un article</button></p><br></div>
    </div>
    <div class="product-wrapper">
      <div class="product-card product-border" :key="product" v-for="product in list_products"
           @click="pushProductUpdatePage(product.id)">
        <p>{{ product.name }} ({{ product.product_type }})</p>
        <center><p><button type="button" class="btn_update_product">Modifier / Supprimer l'article</button></p></center>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container-add_product {
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

.btn_update_product {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.product-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  margin-left: 20px;
}

.product-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

</style>