<script lang="ts" setup>
import FormData from "form-data"
import {getArticle} from "@/modules/articleAPI";
import {updateArticle} from "@/modules/articleAPI";
import {ref} from "vue";

const name = ref("");
const type = ref("");

const productTypeOptions = [
  { value: "plat", text: "Un plat" },
  { value: "accompagnement", text: "Un accompagnement" },
  { value: "sauce", text: "Une sauce" },
  { value: "boisson", text: "Une boisson" },
]

const restaurantId = localStorage.getItem('restaurantId');

const urlcourante = document.location.href;
const articleId = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );

const updateProductEvent = async (e) => {
  e.preventDefault();
  if (!restaurantId)
    return;
  const formData = {name: name.value, type: type.value};
  console.log(name.value);
  await updateArticle(restaurantId, articleId, formData);
}


</script>


<template>
  <div class="owner_add_menu-page">
    <div class="owner_add_menu-wrapper">
      <h2>Ajout d'un nouvel article</h2>
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
