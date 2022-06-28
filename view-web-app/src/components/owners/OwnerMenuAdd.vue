<script lang="ts" setup>
import router from "@/router";

import { ref } from "vue";
import { addMenu } from "@/modules/menuAPI";
import FormData from "form-data";
import { addMenu } from "@/modules/menuAPI";
import { addArticle } from "@/modules/articleAPI";

const name = "";
const description = "";
const products = "";
const price = "";
const file = "";
let filename: string;
let fileData: any;

const restaurantId = localStorage.getItem("restaurantId");
const addMenuEvent = async (e) => {
  e.preventDefault();
  if (!restaurantId) return;
  const formData = new FormData();
  console.log(fileData);
  formData.append("imageData", fileData);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("products", products);
  formData.append("price", price);
  formData.append("imageName", filename);
  await addMenu(formData);
};

const onFilePicked = (event) => {
  fileData = event.target.files[0];
  filename = fileData.name;
};

const list_products = [
  {
    id: "1",
    name: "Kebab",
    product_type: "plat",
  },
  {
    id: "2",
    name: "Tacos",
    product_type: "plat",
  },
  {
    id: "3",
    name: "Burger",
    product_type: "plat",
  },
  {
    id: "4",
    name: "Frites",
    product_type: "accompagnement",
  },
  {
    id: "5",
    name: "Riz",
    product_type: "accompagnement",
  },
  {
    id: "6",
    name: "Barbecue",
    product_type: "sauce",
  },
  {
    id: "7",
    name: "Ketchup",
    product_type: "sauce",
  },
  {
    id: "8",
    name: "Mayonnaise",
    product_type: "sauce",
  },
  {
    id: "9",
    name: "Moutarde",
    product_type: "sauce",
  },
  {
    id: "10",
    name: "Coca",
    product_type: "boisson",
  },
  {
    id: "11",
    name: "Ice tea",
    product_type: "boisson",
  },
  {
    id: "12",
    name: "Fanta",
    product_type: "boisson",
  },
];
</script>

<template>
  <div>
    <div class="positioned">
      <form class="form">
        <table>
          <thead>
            <tr>
              <th colspan="2"><label>Ajout d'un nouveau menu</label></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><label for="name">Nom du menu</label></th>
              <th>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Burger maxi"
                  required="required"
                />
              </th>
            </tr>
            <tr>
              <th><label>Description</label></th>
              <th>
                <textarea
                  v-model="description"
                  placeholder="Burger servi avec frites et boisson 33 cl au choix."
                  required="description"
                />
              </th>
            </tr>
            <tr>
              <th><label>Articles</label></th>
              <th>
                <div :key="product" v-for="product in list_products">
                  <input
                    type="checkbox"
                    id="{{ product.name }}"
                    name="{{ product.name }}"
                  />
                  <label for="{{ product.name }}"
                    >{{ product.name }} ({{ product.product_type }})</label
                  >
                </div>
              </th>
            </tr>
            <tr>
              <th><label>Prix (en €)</label></th>
              <th>
                <input
                  v-model="price"
                  type="number"
                  step="0.01"
                  placeholder="8,50"
                  required="required"
                />
              </th>
            </tr>
            <tr>
              <th><label>Image</label></th>
              <th>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  accept="image/*"
                  v-on:change="onFilePicked"
                  required
                />
              </th>
            </tr>
          </tbody>
        </table>
        <div>
          <br />
          <button @click="addMenuEvent" type="submit" class="btn_add_form">
            Ajouter
          </button>
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

.btn_add_form {
  background-color: #f6f6f6;
  border-radius: 100px;
  width: 100px;
  height: 40px;
  float: right;
}
</style>
