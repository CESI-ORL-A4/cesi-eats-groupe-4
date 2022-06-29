<script lang="ts" setup>
import {addArticle, deleteArticle, getArticle, getArticles, updateArticle} from "@/modules/articleAPI";
import useGlobalStore from "@/stores/store";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

const name = ref("");
const type = ref("");

const articleId = router.currentRoute.value.params.id;

const productTypeOptions = [
  {value: "plat", text: "Un plat"},
  {value: "accompagnement", text: "Un accompagnement"},
  {value: "sauce", text: "Une sauce"},
  {value: "boisson", text: "Une boisson"},
]


watch(() => store.state.user?.restaurantId, async (restaurantId) => {
  if (restaurantId) {
    const product = await getArticle(restaurantId, articleId);
    //console.log(product);
    if (product) {
      name.value = product.name;
      type.value = product.type;
    }
  }
}, {immediate: true});

const updateProductEvent = async () => {
  const restaurantId = store.state.user?.restaurantId;
  //console.log(restaurantId);

  if (!restaurantId && !articleId)
    return;
  const formData = {
    name: name.value,
    type: type.value
  };
  const articleName = name.value;
  const returnArticle = await updateArticle(restaurantId, articleId, formData);
  if (!returnArticle) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`L'article "` + articleName + `" a bien été mis à jour !`, {
      timeout: 5000
    });
    router.back();
  }
}


const deleteProductEvent = async () => {
  const articleName = name.value;
  console.log("Article ID : " + articleId);
  const restaurantId = store.state.user?.restaurantId;
  const returnArticle = await deleteArticle(restaurantId, articleId);

  if (!returnArticle) {
    toast.error("Une erreur est survenue... \nDans le cas où l'article est présent dans un menu, pensez à le retirer !", {
      timeout: 10000
    });
  } else {
    toast.success(`L'article "` + articleName + `" a bien été supprimé !`, {
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
  <div class="line-up">
    <b-button @click="deleteProductEvent" pill variant="outline-danger">Supprimer l'article</b-button>
  </div>
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

.line-up {
  margin-top: 20px;
  margin-left: 30px;
}

</style>
