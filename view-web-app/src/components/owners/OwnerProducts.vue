<script lang="ts" setup>
import router from "@/router";
import {onBeforeMount, ref} from "vue";
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
  if (products) {
    list_products.value = products;
  }
});

const list_products = ref([]);

</script>


<template>
  <div>
    <div class="flex-container-add_product">
      <div><h2>Articles disponibles dans votre restaurant :</h2></div>
      <div>
        <p>
          <button type="button" class="btn_manage" @click="pushProductAddPage">Ajouter un article</button>
        </p>
        <br></div>
    </div>
    <div class="product-wrapper">
      <div class="product-card product-border" :key="product" v-for="product in list_products"
           @click="pushProductUpdatePage(product.id)">
        <p>{{ product.name }} ({{ product.product_type }})</p>
        <center>
          <p>
            <button type="button" class="btn_update_product">Modifier / Supprimer l'article</button>
          </p>
        </center>
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