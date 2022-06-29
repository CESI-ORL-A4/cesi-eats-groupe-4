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
      <div><h2 class="line-up">Articles disponibles dans votre restaurant :</h2></div>
      <div>
        <p>
          <button type="button" class="btn_manage" @click="pushProductAddPage">Ajouter un article</button>
        </p>
        <br></div>
    </div>

    <div class="product-card">
      <b-card-group columns>
        <b-card header="Article" class="text-center" :key="product" v-for="product in list_products"
                @click="pushProductUpdatePage(product._id)">
          <b-card-title>{{ product.name }}</b-card-title>
          <b-card-text class="small text-muted">{{ product.type }}</b-card-text>
          <template #footer>
            <small class="text-muted">Clique ici pour modifier/supprimer l'article</small>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<style scoped>
.flex-container-add_product {
  display: flex;
  justify-content: space-between;
}

.line-up {
  margin-top: 20px;
  margin-left: 60px;
}

.btn_manage {
  margin-top: 20px;
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
  margin: 60px;
  margin-top: -30px;
}

.product-border {
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

</style>