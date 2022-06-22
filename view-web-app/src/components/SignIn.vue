<script setup lang="ts">

</script>

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
            <th><input type="email" id="Email" name="Email" placeholder="jeans@gmail.com"></th>
          </tr>
          <tr>
            <th><label for="Password">Password </label></th>
            <th><input type="password" id="Password" name="Password" placeholder="Password//1234!"></th>
          </tr>
          </tbody>
        </table>
        <div>
          <br>
          <button class="btn_sign_in_form">Se connecter</button>
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