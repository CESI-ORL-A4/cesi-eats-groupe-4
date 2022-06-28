<script lang="ts" setup>
import FormData from "form-data"
import {addArticle} from "@/modules/articleAPI";
import {ref} from "vue";

const name = ref("");
const type = ref("");

const restaurantId = localStorage.getItem('restaurantId');
const addProductEvent = async (e) => {
  e.preventDefault();
  if (!restaurantId)
    return;
  const formData = {name: name.value, type: type.value};
  console.log(name.value);
  await addArticle(restaurantId, formData);
}


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
                <input v-model="type" type="radio" id="plat" name="plat" v-bind:value="'plat'">
                <label htmlFor="plat">Un plat</label>
              </div>
              <div>
                <input v-model="type" type="radio" id="accompagnement" name="accompagnement"
                       v-bind:value="'accompagnement'">
                <label htmlFor="accompagnement">Un accompagnement</label>
              </div>
              <div>
                <input v-model="type" type="radio" id="sauce" name="sauce" v-bind:value="'sauce'">
                <label htmlFor="sauce">Une sauce</label>
              </div>
              <div>
                <input v-model="type" type="radio" id="boisson" name="boisson" v-bind:value="'boisson'">
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
