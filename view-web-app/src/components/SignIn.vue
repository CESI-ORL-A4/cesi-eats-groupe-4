<script lang="ts" setup>
import {ref} from "vue";
import {loginAPI} from "@/modules/identify";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter()

const login = (e) => {
  e.preventDefault();
  loginAPI(email.value, password.value).then((result) => {
    if (!result)
      router.push('/')
    else if (result.role === "basic")
      router.push('/basic')
    else if (result.role === "deliverer")
      router.push('/deliverer')
    else if (result.role === "owner")
      router.push('/owner')
    else
      router.push('/account')
  })
}
</script>


<template>
  <div class="signin-page">
    <div class="signin-wrapper">
      <h2>Connexion</h2>
      <b-form>
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
              placeholder="VotreMotDePasse"
              type="password"
              required
          >
          </b-form-input>
        </b-form-group>
        <b-button @click="login" variant="dark">Se connecter</b-button>
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
