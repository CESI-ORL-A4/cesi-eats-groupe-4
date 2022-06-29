<script lang="ts" setup>
import {getArticle, getArticles} from "@/modules/articleAPI";
import {updateArticle} from "@/modules/articleAPI";
import useGlobalStore from "@/stores/store";
import {ref, watch} from "vue";

const name = ref("");
const type = ref("");

const productTypeOptions = [
  { value: "plat", text: "Un plat" },
  { value: "accompagnement", text: "Un accompagnement" },
  { value: "sauce", text: "Une sauce" },
  { value: "boisson", text: "Une boisson" },
]

const store = useGlobalStore();

watch(() => store.state.user?.restaurantId, async (restaurantId) => {
  if (restaurantId) {
    const products = await getArticles(restaurantId);
    console.log(products);
    if (products) {
      list_products.value = products;
    }
  }
}, { immediate: true });

const list_products = ref([]);

</script>


<template>
  <div class="owner_add_menu-page">
    <div class="owner_add_menu-wrapper">
      <h2>Modification d'un article</h2>
      <b-form @submit.prevent="updateProductEvent">
        <b-form-group
            label="Nom de l'article :"
            label-for="name-input"
        >
          <b-form-input
              v-model="name"
              id="name-input"
              placeholder="Frites"
              type="text"
              required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
            label="Type d'article :"
            label-for="type-input"
        >
          <div class="client-type-selector">
            <b-form-select v-model="type" :options="productTypeOptions"></b-form-select>
          </div>
        </b-form-group>

        <b-button type="submit" variant="dark">Modifier le menu</b-button>
      </b-form>
    </div>
  </div>
</template>



<style scoped>

.owner_add_menu-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.owner_add_menu-wrapper {
  display: flex;
  flex-direction: column;
}


.client-type-selector {
  margin-bottom: 1rem;
}

</style>
