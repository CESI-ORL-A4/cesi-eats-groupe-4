<script setup lang="ts">
import AddressAutocomplete from "@/components/AddressAutocomplete.vue";

let selection = "client";
let dateValue = "";
let userTypeOptions = [
    { value: "client", text: "Je suis un client" },
    { value: "deliverer", text: "Je suis un livreur" },
    { value: "owner", text: "Je suis un restaurateur" },
]
</script>

<template>
    <div class="signup-page" >
        <div class="signup-wrapper">
            <h2>Inscription</h2>
            <b-form>
                <div class="client-type-selector">
                    <b-form-select v-model="selection" :options="userTypeOptions"></b-form-select>
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
                                required
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <label for="birthday-picker">Date d'anniversaire :</label>
                        <div class="form-datepicker">
                            <Datepicker/>
                        </div>
                    </b-col>
                </b-form-row>
                <b-form-group
                    label="Adresse :"
                    label-for="address-input"
                >
                    <b-form-input
                        id="address-input"
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
                <b-button type="submit" variant="dark">S'inscrire</b-button>
            </b-form>
        </div>
    </div>
</template>


<style scoped>
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
