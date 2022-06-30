<script lang="ts" setup>
import {updateMenu, getMenu, deleteMenu} from "@/modules/menuAPI";
import {onBeforeMount, ref, watch} from "vue";
import {deleteArticle, getArticle, getArticles} from "@/modules/articleAPI";
import useGlobalStore from "@/stores/store";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

const name = ref("");
const description = ref("");
let selectedArticles = [];
let selectedArticlesId = ref([]);
const price = ref("");
const file = ref();
let fileName: string;
let fileData: any;

const list_products = ref([]);

const restaurantId = store.state.user?.restaurantId;

const menuId = router.currentRoute.value.params.id;

const chargeArticleMenu = async () => {
  if (restaurantId) {
    const menu = await getMenu(restaurantId, menuId);
    if (menu) {
      name.value = menu.name;
      description.value = menu.description;
      selectedArticles = menu.articles;
      if (selectedArticles)
        selectedArticles.forEach(article => {
          if (article) {
            selectedArticlesId.value.push(article._id)
          }
        });
      price.value = menu.price;
      file.value = menu.linkImage;
    }
  }
}

onBeforeMount(async () => {
  console.log(restaurantId);
  if (restaurantId) {
    const products = await getArticles(restaurantId);
    await chargeArticleMenu();
    if (products) {
      products.forEach(product => {
        product.check = selectedArticlesId.value.includes(product._id);
      });
      list_products.value = products;
    }
  }
})

const updateMenuEvent = async () => {
  if (!restaurantId)
    return;
  let returnData;
  const menuName = name.value;
  const formData = {
    name: name.value,
    description: description.value,
    articles: JSON.stringify(selectedArticlesId.value),
    price: price.value,
    imageData: fileData,
  };
  if (fileName)
    returnData = {...formData, imageName: fileName}
  else
    returnData = formData
  formData.imageName = fileName;
  //console.log(formData);
  const returnMenu = await updateMenu(restaurantId, menuId, returnData);
  if (!returnMenu) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`Le menu "` + menuName + `" a bien été mis à jour !`, {
      timeout: 5000
    });
    router.back();
  }
}

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  fileName = fileData.name;
};


const deleteMenuEvent = async () => {
  const MenuName = name.value;
  console.log("Menu ID : " + menuId);
  const restaurantId = store.state.user?.restaurantId;
  const returnArticle = await deleteMenu(restaurantId, menuId);

  if (!returnArticle) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`Le menu "` + MenuName + `" a bien été supprimé !`, {
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
    <b-button @click="deleteMenuEvent" pill variant="outline-danger">Supprimer le menu</b-button>
  </div>
  <div class="owner_update_menu-page">
    <div class="owner_update_menu-wrapper">
      <h2>Modification du menu</h2>
      <b-form @submit.prevent="updateMenuEvent">
        <b-form-group
            label="Nom du menu :"
            label-for="name-input"
        >
          <b-form-input
              v-model="name"
              id="name-input"
              placeholder="Burger maxi"
              type="text"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
            label="Description :"
            label-for="description-input"
        >
          <b-form-input
              v-model="description"
              id="description-input"
              placeholder="Un menu bien complet pour vous satisfaire"
              type="text"
              required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
            label="Prix (en €) :"
            label-for="price-input"
        >
          <b-form-input
              v-model="price"
              id="price-input"
              placeholder="17,50"
              type="number"
              step="0.01"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-checkbox
            v-for="(product, index) in list_products"
            :key="index"
            v-model="selectedArticlesId"
            :value="product._id"
        >
          {{ product.name }}
        </b-form-checkbox>

        <b-form-group
            label="Image :"
            label-for="image-input"
        >
          <input
              type="file"
              id="file"
              ref="file"
              accept="image/*"
              v-on:change="onFilePicked"
          />
        </b-form-group>
        <b-button type="submit" variant="dark">Ajouter le menu</b-button>
      </b-form>
    </div>
  </div>
</template>

<style scoped>
.owner_update_menu-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.owner_update_menu-wrapper {
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 15px;
}

.line-up {
  margin-top: 20px;
  margin-left: 30px;
}

</style>