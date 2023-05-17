<script lang="ts" setup>
import FormData from "form-data"
import {addArticle} from "@/modules/articleAPI";
import {ref} from "vue";
import useGlobalStore from "@/stores/store";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

const name = ref("");
const type = ref("");


const productTypeOptions = [
  {value: "plat", text: "Un plat"},
  {value: "accompagnement", text: "Un accompagnement"},
  {value: "sauce", text: "Une sauce"},
  {value: "boisson", text: "Une boisson"},
]

const addProductEvent = async () => {
  const restaurantId = store.state.user?.restaurantId;
  //console.log(restaurantId);

  if (!restaurantId)
    return;
  const articleName = name.value;
  const formData = {name: name.value, type: type.value};
  //console.log(name.value);

  const returnAddArticle = await addArticle(restaurantId, formData);

  if (!returnAddArticle) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`L'article "` + articleName + `" a bien été ajouté !`, {
      timeout: 5000
    });
    router.back();
  }
}

function backPage() {
  router.back();
}
</script>


<template>
  <div class="line-up">
    <b-button @click="backPage" pill variant="outline-secondary">Revenir en arrière</b-button>
  </div>
  <div class="owner_add_menu-page">
    <div class="owner_add_menu-wrapper">
      <h2>Ajout d'un nouvel article</h2>
      <b-form @submit.prevent="addProductEvent">
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

        <b-button type="submit" variant="dark">Ajouter le menu</b-button>
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

.line-up {
  margin-top: 20px;
  margin-left: 30px;
}
</style>
