<script lang="ts" setup>
import {getArticles} from "@/modules/articleAPI";
import {addMenu} from "@/modules/menuAPI";
import {onBeforeMount, ref} from "vue";
import useGlobalStore from "@/stores/store";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

const name = ref("");
const description = ref("");
const selectedArticles: Array<string> = [];
const price = ref("");
const file = ref();
let fileName: string;
let fileData: any;


const restaurantId = store.state.user?.restaurantId;
//console.log(restaurantId);

onBeforeMount(async () => {
  const products = await getArticles(restaurantId);
  //console.log(products);
  if (products) {
    list_products.value = products;
  }
});

const list_products = ref([]);

const addMenuEvent = async (e) => {
  e.preventDefault();
  if (!restaurantId)
    return;

  const menuName = name.value;
  const formData = {
    name: name.value,
    description: description.value,
    articles: JSON.stringify(selectedArticles),
    price: price.value,
    imageData: fileData,
    imageName: fileName,
  };
  //console.log(formData);


  const returnAddMenu = await addMenu(restaurantId, formData);

  if (!returnAddMenu) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`Le menu "` + menuName + `" a bien été ajouté !`, {
      timeout: 5000
    });
    router.back();
  }
}

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  fileName = fileData.name;
};

const changeArticle = (articleId) => {
  const index = selectedArticles.findIndex(article => article === articleId);
  if (index === -1) {
    selectedArticles.push(articleId);
  } else {
    selectedArticles.splice(index, 1);
  }
  //console.log(index);
  //console.log(selectedArticles);
};

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
      <h2>Ajout d'un nouveau menu</h2>
      <b-form @submit.prevent="addMenuEvent">
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
        <b-form-checkbox-group>
          <span v-for="(product, index) in list_products">
            <b-form-checkbox @change="changeArticle" :value="product._id">{{ product.name }} ({{
                product.type
              }})</b-form-checkbox>
          </span>
        </b-form-checkbox-group>

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
              required
          />
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

h2 {
  margin-bottom: 15px;
}

.line-up {
  margin-top: 20px;
  margin-left: 30px;
}

</style>