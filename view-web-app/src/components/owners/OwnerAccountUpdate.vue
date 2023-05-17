<script lang="ts" setup>
import {ref, watch} from "vue";
import {deleteRestaurant, getRestaurant, getRestaurantByOwnerId, updateRestaurant} from "@/modules/restaurantAPI";
import FormData from "form-data"
import useGlobalStore from "@/stores/store";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {deleteMenu} from "@/modules/menuAPI";
import {computed} from "@vue/reactivity";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

const name = ref("");
const address = ref("");
const description = ref("");
const file = ref();
let fileName: string;
let fileData: any;

watch(() => store.state.user?.restaurantId, async (restaurantId) => {
    if(!restaurantId){
      await router.push({name: "owner-account-new"});
    }
    const restaurant = await getRestaurant(restaurantId);
    if (restaurant) {
      name.value = restaurant.name;
      address.value = restaurant.address;
      description.value = restaurant.description;
      file.value = restaurant.linkImage;
    }
}, {immediate: true});

const updateRestaurantEvent = async () => {
  if (store.state.user?.restaurantId) {
    let returnData;
    const formData = {
      name: name.value,
      address: address.value,
      description: description.value,
      imageData: fileData,
    };
    console.log(formData);
    if (fileName)
      returnData = {...formData, imageName: fileName}
    else
      returnData = formData
    formData.imageName = fileName;
    //console.log(formData);
    const restaurantName = name.value;
    const returnRestaurant = await updateRestaurant(store.state.user.restaurantId, returnData);
    console.log(returnRestaurant);
    if (!returnRestaurant) {
      toast.error("Une erreur est survenue...", {
        timeout: 10000
      });
    } else {
      toast.success(`Le resturant "` + restaurantName + `" a bien été mis à jour !`, {
        timeout: 5000
      });
      router.back();
    }
  }
}

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  fileName = fileData.name;
}

const deleteRestaurantEvent = async () => {
  if (store.state.user?.restaurantId) {
    const restaurantName = name.value;
    const restaurantId = store.state.user?.restaurantId;
    const returnRestaurant = await deleteRestaurant(restaurantId);

    if (!returnRestaurant) {
      toast.error("Une erreur est survenue...", {
        timeout: 10000
      });
    } else {
      store.commit("setUserRestaurantId", undefined);
      toast.success(`Votre restaurant "` + restaurantName + `" a bien été supprimé !`, {
        timeout: 5000
      });
      router.back();
    }
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
    <b-button @click="deleteRestaurantEvent" pill variant="outline-danger">Supprimer le restaurant</b-button>
  </div>
  <div class="owner_add_menu-page">
    <div class="owner_add_menu-wrapper">
      <h2>Modification de votre restaurant</h2>
      <b-form @submit.prevent="updateRestaurantEvent">
        <b-form-group
            label="Nom de votre restaurant :"
            label-for="name-input"
        >
          <b-form-input
              v-model="name"
              id="name-input"
              placeholder=" "
              type="text"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
            label="Adresse :"
            label-for="address-input"
        >
          <b-form-input
              v-model="address"
              id="address-input"
              placeholder=" "
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
              placeholder=" "
              type="text"
              required
          >
          </b-form-input>
        </b-form-group>
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
        <b-button type="submit" variant="dark">Modifier mon restaurant</b-button>
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
