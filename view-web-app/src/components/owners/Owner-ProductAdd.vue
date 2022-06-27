<script lang="ts" setup>
import FormData from "form-data"
import {addArticle} from "@/modules/articleAPI";

const name = "";
const product_type = "";
//const file = ref();
//let filename: string;
//let fileData: any;

const restaurantId = localStorage.getItem('restaurantId');
const addProductEvent = async (e) => {
  e.preventDefault();
  console.log("aa");
  if(!restaurantId)
    return;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("product_type", product_type);
  await addArticle(restaurantId,formData);
}

/*
const onFilePicked = (event) => {
  fileData = event.target.files[0];
  filename = fileData.name;
}
*/

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
            <th colspan="2"><label>Ajout d'un nouvel article</label></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th><label for="name">Nom de l'article</label></th>
            <th><input v-model="name" type="text" placeholder="Frites" required="required"></th>
          </tr>
          <br>
          <tr>
            <th><label>Type d'article</label></th>
            <th>
              <div>
                <input type="radio" id="plat" name="drone" value="plat" checked>
                <label htmlFor="plat">Un plat</label>
              </div>
              <div>
                <input type="radio" id="accompagnement" name="drone" value="accompagnement">
                <label htmlFor="accompagnement">Un accompagnement</label>
              </div>
              <div>
                <input type="radio" id="sauce" name="drone" value="sauce">
                <label htmlFor="sauce">Une sauce</label>
              </div>
              <div>
                <input type="radio" id="boisson" name="drone" value="boisson">
                <label htmlFor="boisson">Une boisson</label>
              </div>
            </th>
          </tr>
          </tbody>
        </table>
        <div>
          <br>
          <button @click="addProductEvent" class="btn_add_form">Ajouter</button>
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
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 100px;
  height: 40px;
  float: right;
}


</style>
