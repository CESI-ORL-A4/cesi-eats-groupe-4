<script setup lang="ts">

</script>

<template>
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
          <th><label for="type_user">Vous êtes : </label></th>
          <th>
            <div>
              <input type="radio" id="basic" name="drone" value="basic" checked>
              <label htmlFor="basic">Un client</label>
            </div>
            <div>
              <input type="radio" id="deliverer" name="drone" value="deliverer">
              <label htmlFor="deliverer">Un livreur</label>
            </div>
            <div>
              <input type="radio" id="owner" name="drone" value="owner">
              <label htmlFor="owner">Un restaurateur</label>
            </div>
          </th>
        </tr>
        <tr>
          <th><label for="firstName">Prénom </label></th>
          <th><input type="text" id="firstName" name="firstName" placeholder="Jean" required="required"></th>
        </tr>
        <tr>
          <th><label for="lastName">Nom de famille </label></th>
          <th><input type="text" id="lastName" name="lastName" placeholder="Martin" required="required"></th>
        </tr>
        <tr>
          <th><label for="phone">Téléphone </label></th>
          <th><input type="number" id="phone" name="phone" placeholder="0665433883" required="required"></th>
        </tr>
        <tr>
          <th><label for="email">Email </label></th>
          <th><input type="email" id="email" name="email" placeholder="jean@gmail.com" required="required"></th>
        </tr>
        <tr>
          <th><label for="address" class="control-label">Adresse</label></th>
          <th>
            <div class="form-row">
              <div class="form-group col">
                <input type="text" class="form-control" v-model="address" id="adresse" name="adresse" autocomplete="off" data-toggle="tooltip" data-placement="top" title="Ce champ est intelligent... essaie d'y taper à peu près n'importequoi, par exemple : barry 65150 ;)" />
                <div class="address-feedback position-absolute list-group" style="z-index:1100;">
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th><label for="birthdayDate">Date d'anniversaire </label></th>
          <th><input type="date" id="birthdayDate" name="birthdayDate" placeholder=" " required="required"></th>
        </tr>
        <br>
        <tr>
          <th><label for="Password">Mot de passe </label></th>
          <th><input type="password" id="Password" name="Password" placeholder="Password//1234!" required="required">
          </th>
        </tr>
        <tr>
          <th><label for="Password">Confirmer le mot de passe </label></th>
          <th><input type="password" id="Password" name="Password" placeholder="Password//1234!" required="required">
          </th>
        </tr>
        </tbody>
      </table>
      <div>
        <br>
        <p><input id="termsOfUses" name="termsOfUses" type="checkbox" required="required">
          <span>J'accepte les <a href="/CGU" target="_blank">conditions générales d'utilisation</a>.</span>
        </p>
<!--        <p><input id="emailOffers" name="emailOffers" type="checkbox">
          <span>Je souhaite recevoir occasionnellement par email des offres de Cesi Eats.</span></p>
        <br>-->
        <button class="btn_sign_up_form">S'inscrire</button>
      </div>

    </form>
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

.btn_sign_up_form {
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 80px;
  height: 40px;
  float: right;
}

</style>