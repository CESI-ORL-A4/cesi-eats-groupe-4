<template>
  <div>
    <div class="positioned">
      <form class="form">
        <table>
          <thead>
          <tr>
            <th colspan="2"><label>Connexion</label></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th><label for="Email">Email</label></th>
            <th><input v-model="email" type="email" id="Email" name="Email" placeholder="jeans@gmail.com"
                       required="required"></th>
          </tr>
          <tr>
            <th><label for="Password">Mot de passe </label></th>
            <th><input v-model="password" type="password" id="Password" name="Password" placeholder="**********"
                       required="required"></th>
          </tr>
          </tbody>
        </table>
        <div>
          <br>
          <button @click="login" type="submit" class="btn_sign_in_form">Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>


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
    else if (result.role==="basic")
      router.push('/basic')
    else if (result.role==="deliverer")
      router.push('/deliverer')
    else if (result.role==="owner")
      router.push('/owner')
    else
      router.push('/account')
  })
}
</script>


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