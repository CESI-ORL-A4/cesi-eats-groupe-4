<script lang="ts" setup>
import {ref} from "vue";
import {addRestaurant} from "@/modules/identify";
import FormData from "form-data"

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
  formData.append("description", address.value);
  formData.append("imageName", filename);
  formData.append("ownerId", localStorage.getItem('id'));

  await addRestaurant(formData);
}

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  filename = fileData.name;
}
</script>

<template>
  <div>
    <div class="positioned">
      <form class="form">
        <table>
          <thead>
          <tr>
            <th colspan="2"><label>Informations</label></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th><label>Nom</label></th>
            <th><input v-model="name" type="text"
                       required="required"></th>
          </tr>
          <tr>
            <th><label for="address">Address</label></th>
            <th><input v-model="address" type="text"
                       required="required"></th>
          </tr>
          <tr>
            <th><label>Description</label></th>
            <th><input v-model="description" type="text"
                       required="required"></th>
          </tr>
          <tr>
            <th><label>Image</label></th>
            <th><input type="file" id="file" ref="file" accept="image/*" v-on:change="onFilePicked" required/></th>
          </tr>
          </tbody>
        </table>
        <div>
          <br>
          <button @click="addRestaurantEvent" type="submit" class="btn_sign_in_form">Add</button>
        </div>
      </form>
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

</style>
