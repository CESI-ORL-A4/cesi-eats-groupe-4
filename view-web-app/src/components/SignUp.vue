<script setup lang="ts">
import {ref} from 'vue';
import axios from "axios";
import config from "../config.json";
import {useToast} from 'vue-toastification';
import {useRouter} from 'vue-router';

const toast = useToast();
const router = useRouter();


function pushCGU(){
  router.push('/cgu')
}

let userRoleOptions = [
  {value: "BASIC", text: "Je suis un client"},
  {value: "DELIVERER", text: "Je suis un livreur"},
  {value: "OWNER", text: "Je suis un restaurateur"},
]

const birthdate = ref();

function dateFormat(date: any) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

const isLoading = ref(false);

const payload = {
  role: "BASIC",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  birthdate: ""
}

const errorsMapping: Record<string, string> = {
  "User already exists": "Cet utilisateur existe déjà !"
}

function onSubmit() {
  payload.birthdate = birthdate.value;
  isLoading.value = true;
  toast.clear();
  axios.post(`${config.GATEWAY_URL}/users/register`, payload).then((_) => {
    toast.success("Inscription réussie !", {
      timeout: 5000
    });
    isLoading.value = false;
    router.push("/signIn");
  }, (error) => {
    let errorMessage = "Une erreur est survenue...";
    if (error.response.data) {
      if (error.response.data.error in errorsMapping) {
        errorMessage = errorsMapping[error.response.data.error];
      }
    }
    toast.error(errorMessage, {
      timeout: 10000
    });
    isLoading.value = false;
  })
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-wrapper">
      <h2>Inscription</h2>
      <b-form @submit.prevent="onSubmit">
        <div class="client-type-selector">
          <b-form-select v-model="payload.role" :options="userRoleOptions"></b-form-select>
        </div>
        <b-form-row>
          <b-col>
            <b-form-group
                label="Prénom :"
                label-for="firstname-input"
            >
              <b-form-input
                  id="firstname-input"
                  placeholder="Jean"
                  v-model="payload.firstName"
                  required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                label="Nom :"
                label-for="lastname-input"
            >
              <b-form-input
                  id="lastname-input"
                  placeholder="Martin"
                  v-model="payload.lastName"
                  required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-group
            label="Email :"
            label-for="email-input"
        >
          <b-form-input
              id="email-input"
              placeholder="jean@gmail.com"
              type="email"
              v-model="payload.email"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-row>
          <b-col>
            <b-form-group
                label="Téléphone :"
                label-for="phone-input"
            >
              <b-form-input
                  id="phone-input"
                  placeholder="0689387644"
                  type="phone"
                  v-model="payload.phone"
                  required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <label for="birthday-picker">Date d'anniversaire :</label>
            <div class="form-datepicker">
              <Datepicker v-model="birthdate" autoApply="true" :format="dateFormat" required/>
            </div>
          </b-col>
        </b-form-row>
        <b-form-group
            label="Adresse :"
            label-for="address-input"
        >
          <b-form-input
              id="address-input"
              v-model="payload.address"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-row>
          <b-col>
            <b-form-group
                label="Mot de passe :"
                label-for="password-input"
            >
              <b-form-input
                  id="password-input"
                  type="password"
                  v-model="payload.password"
                  required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                label="Confirmation :"
                label-for="password-confirm-input"
            >
              <b-form-input
                  id="password-confirm-input"
                  type="password"
                  required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-form-group >
            <input type="checkbox" required/>
              J'accepte les <a href="/CGU" target="_blank">mentions légales</a>
          </b-form-group>
        </b-form-row>
        <b-button v-if="!isLoading" type="submit" variant="dark">S'inscrire</b-button>
        <b-spinner v-if="isLoading" variant="success"/>
      </b-form>
    </div>
  </div>
</template>


<style scoped>
.checkboxPos{
  padding-left: 10px;
  padding-top: -10px;
}
.checkboxButton{
  border: 0px;
  color: dodgerblue;
  background-color: white;
}

.largerCheckbox{
  width: 25px;
  height: 25px;
}

.toast {
  opacity: 0;
}

.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.signup-wrapper {
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 15px;
}

.form-line {
  display: flex;
}

.top-spacing {
  margin-top: 10px;
}

.spaced-childs {
  justify-content: space-between;
}

.spaced-element {
  margin-left: 20px;
}

.client-type-selector {
  margin-bottom: 1rem;
}

.form-datepicker {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
