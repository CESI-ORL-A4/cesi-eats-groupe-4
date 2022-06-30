<script setup lang="ts">
import { useToast } from 'vue-toastification';
import config from "../../config.json";
import axios from 'axios';
import { computed } from '@vue/reactivity';

const { order, hiddeActionsButton } = defineProps<{
    order: any,
    hiddeActionsButton?: boolean;
}>();

const emit = defineEmits(["delete-order"]);

const toast = useToast();

const orderStateTitleMapping: Record<string, string> = {
    "WAITING_VALIDATION": "En attente de validation",
    "IN_PRODUCTION": "En cours de production",
    "READY_TO_SHIP": "En attente d'un livreur",
    "WAITING_PICKUP": "Livreur en route",
    "UNDER_SHIPMENT": "En cours de livraison",
    "DELIVERED": "Livré"
}

function getCardTitle() {
    return orderStateTitleMapping[order.state];
}

const showActionButton = computed(() => !hiddeActionsButton && (order.state === "WAITING_VALIDATION" || order.state === "IN_PRODUCTION" || order.state === "WAITING_PICKUP"));
const showSpinnerAnim = computed(() => order.state === "WAITING_VALIDATION" || order.state === "IN_PRODUCTION" || order.state === "WAITING_PICKUP");

function executeOrderAction() {
    switch (order.state) {
        case "WAITING_VALIDATION":
            changeOrderState("IN_PRODUCTION", "Commande validée, en cours de production...");
            break;
        case "IN_PRODUCTION":
            changeOrderState("READY_TO_SHIP", "Commande prête, en attente d'un livreur...");
            break;
        case "WAITING_PICKUP":
            changeOrderState("UNDER_SHIPMENT", "Commande expédiée !");
            break;
    }
}

const mapActionButtonTextState: Record<string, string> = {
    "WAITING_VALIDATION": "> Accepter la commande <",
    "IN_PRODUCTION": "> Commande prête <",
    "WAITING_PICKUP": "> Confirmer la prise en charge <"
}

function getActionButtonText() {
    if (order.state in mapActionButtonTextState) {
        return mapActionButtonTextState[order.state];
    }
    return "";
}

const mapStateVariant: Record<string, string> = {
    "WAITING_VALIDATION": "danger",
    "IN_PRODUCTION": "warning",
    "READY_TO_SHIP": "success",
    "WAITING_PICKUP": "success",
    "UNDER_SHIPMENT": "success",
}

function getVariant() {
    if (order.state in mapStateVariant) {
        return mapStateVariant[order.state];
    }
    return "";
}

function changeOrderState(state: string, successMessage: string) {
    axios.put(`${config.GATEWAY_URL}/orders/${order.id}`, {
        state
    }).then(_ => {
        toast.success(successMessage);
        if (state === "UNDER_SHIPMENT") {
            emit("delete-order", order.id);
        } else {
            order.state = state;
        }
    }, (error) => {
        toast.error("Une erreur est survenue");
        console.log("error", error);
    })
}


</script>

<template>
    <b-card
        no-body
        header-tag="header"
        :header="getVariant()"
        :header-bg-variant="getVariant()"
        header-text-variant="white"
        :border-variant="getVariant()"
    >
        <template #header>
            <div class="card-header-wrapper">
                <p class="card-header-text">{{ getCardTitle() }}</p>
                <span class="flex-grow"/>
                <div class="header-spinner" v-if="showSpinnerAnim">
                    <b-spinner style="width: 1.5rem; height: 1.5rem;"  type="grow" variant="white"/>
                </div>
            </div>
        </template>
        <b-list-group>
            <b-list-group-item>
                Commande numéro :<br/>
                {{ order.id }}
            </b-list-group-item>
            <b-list-group-item>
                Client : {{ order.user.firstName }} {{ order.user.lastName }}<br/>
                Adresse : {{ order.user.address }}<br/>
                Téléphone : {{ order.user.phone }}
            </b-list-group-item>
            <b-list-group-item>
                Menu(s) acheté(s) :
                <p class="menu-item" v-for="menu in order.menus">- {{ menu.name }}</p>
            </b-list-group-item>
            <b-list-group-item v-if="showActionButton">
                <b-button
                    :variant="getVariant()"
                    @click="executeOrderAction()"
                    block
                    squared
                    center
                >
            <p class="white-text-button">{{ getActionButtonText() }}</p>
        </b-button>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<style scoped>
p {
    margin: 0;
}

.flex-grow {
    flex-grow: 1;
}

.white-text-button {
    color: white;
    margin: 0;
}

.menu-item {
    margin: 0;
    margin-left: 10px;
}

.card-header-wrapper {
    display: flex;
    align-items: center;
}

.card-header-text {
    font-weight: bold;
    margin-bottom: 0;
}

.header-spinner {
    margin-left: 10px;
    margin-top: 5px;
}

</style>
