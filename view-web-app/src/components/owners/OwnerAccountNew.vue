<script lang="ts" setup>
import {ref} from "vue";
import {addRestaurant} from "@/modules/restaurantAPI";
import FormData from "form-data"
import {addArticle} from "@/modules/articleAPI";
import useGlobalStore from "@/stores/store";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();


const name = ref("");
const address = ref("");
const description = ref("");
const file = ref();
let filename: string;
let fileData: any;

const addRestaurantEvent = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  console.log(fileData);
  formData.append("imageData", fileData);
  formData.append("name", name.value);
  formData.append("address", address.value);
  formData.append("description", description.value);
  if (filename)
    formData.append("imageName", filename);
  formData.append("ownerId", localStorage.getItem('userId'));

  const restaurantName = name.value;
  const returnAddRestaurant = await addRestaurant(formData);

  if (!returnAddRestaurant) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    toast.success(`Votre restaurant "` + restaurantName + `" a bien été crée !`, {
      timeout: 5000
    });
    router.push({name: "owner"})
  }
}

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  filename = fileData.name;
}
</script>

<template>
  <div class="owner_add_menu-page">
    <div class="owner_add_menu-wrapper">
      <h2>Informations de votre restaurant</h2>
      <b-form @submit.prevent="addRestaurantEvent">
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
              required
          />
        </b-form-group>
        <b-button type="submit" variant="dark">Créer mon restaurant</b-button>
      </b-form>
    </div>
  </div>
</template>

<style scoped>
.positioned {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

thead,
tfoot {
  font-size: 35px;
}

tbody {
  text-align: left;
}

.btn_sign_in_form {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 100px;
  height: 40px;
  float: right;
}


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
