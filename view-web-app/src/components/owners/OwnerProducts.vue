<script lang="ts" setup>
import router from "@/router";
import {onBeforeMount, ref, watch} from "vue";
import {getArticles} from "@/modules/articleAPI";
import useGlobalStore from "@/stores/store";
import {loadUserData} from "@/modules/userAPI";


const store = useGlobalStore();

function pushProductUpdatePage(id: string) {
  router.push({path: `/owner/products/${id}`})
}

function pushProductAddPage() {
  router.push({name: "owner-products-add"})
}

watch(() => store.state.user?.restaurantId, async (restaurantId) => {
  if (restaurantId) {
    const products = await getArticles(restaurantId);
    console.log(products);
    if (products) {
      list_products.value = products;
    }
  }
}, {immediate: true});

const list_products = ref([]);

</script>


<template>
  <div>
    <div class="flex-container-add_product">
      <div><h2 class="line-up">Articles disponibles dans votre restaurant :</h2></div>
      <div>
        <p>
          <b-button class="btn_manage" @click="pushProductAddPage" variant="outline-dark">Ajouter un article</b-button>
        </p>
      </div>
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
  margin-top: 30px;
  margin-left: 60px;
}

.btn_manage {
  margin-top: 30px;
  margin-right: 60px;
}


.product-card {
  margin: 60px;
  margin-top: 10px;
}


</style>