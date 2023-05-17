<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {loginAPI} from "@/modules/authAPI";
import {useRouter} from "vue-router";
import useGlobalStore from "@/stores/store";
import { useToast } from "vue-toastification";

const store = useGlobalStore();
const toast = useToast();
const email = ref("");
const password = ref("");
const router = useRouter()

onMounted(() => {
    if (!!store.state.user) {
        router.push("/home");
    }
})

const login = () => {
    toast.clear();
  loginAPI(email.value, password.value).then((result) => {
      if (!result) {
          toast.error("Email ou mot de passe incorrect")
      } else {
          store.dispatch("fetchUserData", result);
          switch (result.role) {
              case "BASIC":
                router.push("/restaurants");
                break;
              case "DELIVERER":
                router.push("/deliverer/dashboard");
                break;
              case "OWNER":
                router.push("/owner");
                break;
              case "COMMERCIAL":
                router.push("/commercial");
                break;
              default:
                router.push("/home");
          }
      }
  })
}
</script>


<template>
  <div class="signin-page">
    <div class="signin-wrapper">
      <h2>Connexion</h2>
      <b-form @submit.prevent="login">
        <b-form-group
            label="Email :"
            label-for="email-input"
        >
          <b-form-input
              v-model="email"
              id="email-input"
              placeholder="jean@gmail.com"
              type="email"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
            label="Mot de passe :"
            label-for="password-input"
        >
          <b-form-input
              v-model="password"
              id="password-input"
              type="password"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="dark">Se connecter</b-button>
      </b-form>
    </div>
  </div>
</template>





<style scoped>
.signin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.signin-wrapper {
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 15px;
}

</style>
