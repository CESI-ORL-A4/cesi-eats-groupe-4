<script setup lang="ts">
import { loadUserData } from "@/modules/userAPI";
import useGlobalStore from "@/stores/store";
import axios from "axios";
import {onBeforeMount, ref} from "vue";
import { useToast } from "vue-toastification";
import config from "../config.json";

const toast = useToast();
const store = useGlobalStore();
const isEditing = ref(false);
const isLoading = ref(true);

const birthdate = ref();
function dateFormat(date: any) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

const payload = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
});

onBeforeMount(async () => {
    if (store.state.user?.id) {
        const response = await loadUserData(store.state.user?.id);
        isLoading.value = false;
        if (response) {
            const { firstName, lastName, email, address, phone } = response.data;
            payload.value = {
                ...payload.value,
                firstName,
                lastName,
                email,
                address,
                phone,
            }
            birthdate.value = new Date(response.data.birthdate).toLocaleDateString();
        }
    }

});

function onSubmit() {
    isEditing.value = false;
    isLoading.value = true;
    const { password, ...payloadContent } = payload.value;
    let updatePayload;
    if (password !== "") {
        updatePayload = {password, ...payloadContent};
    } else {
        updatePayload = payloadContent;
    }

    axios.put(`${config.GATEWAY_URL}/users/${store.state.user?.id}`, updatePayload).then((_) => {
        toast.success("Données mises à jour !", {
            timeout: 5000
        });
        isLoading.value = false;
    }, (error) => {
        console.log("error", error);
        toast.error("Une erreur est survenue...", {
            timeout: 10000
        });
        isLoading.value = false;
    })

}

</script>

<template>
    <div class="user-infos-page" >
        <b-spinner class="loading-spinner" v-if="isLoading" variant="success"/>
        <div v-if="!isLoading" class="user-infos-wrapper">
            <h2>Mes informations personnelles</h2>
            <b-form @submit.prevent="onSubmit">
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
                                :disabled="!isEditing"
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
                                :disabled="!isEditing"
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
                        disabled
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
                                :disabled="!isEditing"
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <label for="birthday-picker">Date d'anniversaire :</label>
                        <div class="form-datepicker">
                            <Datepicker
                                v-model="birthdate"
                                autoApply="true"
                                :format="dateFormat"
                                :disabled="!isEditing"
                            />
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
                        :disabled="!isEditing"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-row v-if="isEditing">
                    <b-col>
                        <b-form-group
                            label="Mot de passe :"
                            label-for="password-input"
                        >
                            <b-form-input
                                id="password-input"
                                type="password"
                                v-model="payload.password"
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
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-button v-if="!isEditing" variant="dark" @click="isEditing = true">Éditer</b-button>
                <b-form-row v-if="isEditing">
                    <b-col>
                        <b-button type="submit" variant="success">Appliquer</b-button>
                        <b-button class="spaced-element" variant="danger" @click="isEditing = false">Annuler</b-button>
                    </b-col>
                </b-form-row>
            </b-form>
        </div>
    </div>
</template>


<style scoped>
.loading-spinner {
    width: 80px;
    height: 80px;
    margin-top: 50px;
}
.toast {
    opacity: 0;
}

.user-infos-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.user-infos-wrapper {
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
