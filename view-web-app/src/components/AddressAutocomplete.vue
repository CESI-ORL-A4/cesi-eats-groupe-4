<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
let address_feedback= ref([])
const address = ref("");
let myTimeout;
function mySetTimeout() {

  clearTimeout(myTimeout);
  myTimeout = setTimeout(getAddress,1000 )
}

function getAddress(){
  console.log("ahh");
  address_feedback.value=[];
  console.log("address", address.value);
  axios.get('https://api-adresse.data.gouv.fr/search/', {
    method : "get",
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    },
    params: {q: address.value,limit: 15, autocomplete: 1 }
  }).then(response => {
    response.data.features.forEach(feature => address_feedback.value.push(feature.properties.label));
  });
}

function changeAddress(rue: string) {
  console.log("item",rue);
  address.value = rue;
  address_feedback.value=[];
}

</script>


<template>
  <div>
    <input type="text" class="form-control" v-on:keyup="mySetTimeout" v-model="address" id="address" name="address" autocomplete="on" data-toggle="tooltip" data-placement="top" title="Ce champ est intelligent... essaie d'y taper à peu près n'importequoi, par exemple : barry 65150 ;)" />
    <div class="addressAuto" id="navi">
      <div class="address_feedback position-absolute list-group" id="infoi" @click="changeAddress(feedback)" :key="feedback"  v-for="feedback in address_feedback">
        {{feedback}}
      </div>
    </div>
  </div>
</template>



<style scoped>

.list-group{
  width: 350px;
  background-color: #F8F8FF;
  border: 1px double grey ;
}

</style>