<script setup lang="ts">

</script>

<template>
  <div>
    <div class="positioned">
      <form class="form">
        <table>
          <thead margin="5px">
          <tr>
            <th colspan="2"><label>Inscription</label></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th><label for="Email">Email: </label></th>
            <th><input type="text" id="Email" name="Email" placeholder="Email"></th>
          </tr>
          <tr>
            <th><label for="Password">Password: </label></th>
            <th><input type="password" id="Password" name="Password" placeholder="Password" ></th>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>



<style scoped>
.positioned{
  display: flex;
  align-items: center;
  justify-content: center;

}

.form{
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
}

thead,
tfoot{
  font-size: 35px;
}

tbody,
tr,
th{
  margin-top: 20px;
}

</style>