<script setup lang="ts">
import useGlobalStore from '@/stores/store';
import config from "../../config.json";
import { onBeforeMount, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const store = useGlobalStore();
const orders = ref<any[]>([]);
const toast = useToast();

async function loadMenus(restaurantId: string, order: any) {
    const menus: any[] = [];
    for (const menuId of order.menuIds) {
        menus.push((await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/${restaurantId}/menus/${menuId}`)).data.menu);
    }
    return menus;
}

async function loadOrdersDetails(restaurantId: string, ordersList: any[]) {
    const finalOrders: any []= [];
    for (const order of ordersList) {
        // fetch user details
        const menus: any[] = await loadMenus(restaurantId, order);
        const userResponse = await axios.get(`${config.GATEWAY_URL}/users/${order.userId}`);
        const user = userResponse.data; 
        finalOrders.push({
            id: order._id,
            state: order.state,
            user,
            menus
        })
    }
    return finalOrders;
}

async function loadAllOrders(restaurantId?: string) {
    if (restaurantId) {
        const ordersList = (await axios.get(`${config.GATEWAY_URL}/restaurants/${restaurantId}/orders/in-process`)).data;
        const loadedOrders = await loadOrdersDetails(restaurantId, ordersList);
        orders.value = loadedOrders;
    }
}

onBeforeMount(() => {
    loadAllOrders(store.state.user?.restaurantId);
})

watch(() => store.state.user?.restaurantId, async (restaurantId: string | undefined) => {
    loadAllOrders(restaurantId);
});

const orderStateTitleMapping: Record<string, string> = {
    "WAITING_VALIDATION": "En attente de validation",
    "IN_PRODUCTION": "En cours de production",
    "READY_TO_SHIP": "Prête à être expédiée",
    "UNDER_SHIPMENT": "En cours de livraison",
    "DELIVERED": "Livré"
}

function getCardTitle(state: string) {
    return orderStateTitleMapping[state];
}

function acceptOrder(order: any) {
    axios.put(`${config.GATEWAY_URL}/orders/${order.id}`, {
        state: "IN_PRODUCTION"
    }).then(_ => {
        toast.success("Commande validée, en cours de production...");
        orders.value.find((o) => o.id === order.id).state = "IN_PRODUCTION";
    }, (error) => {
        toast.error("Une erreur est survenue");
        console.log("error", error);
    })
}

</script>

<template>
    <section class="orders-section">
        <h2>Commandes</h2>
        <div class="commands-list">
            <b-card
                v-for="order in orders"
                no-body
                header-tag="header"
                header="warning"
                header-bg-variant="warning"
                header-text-variant="white"
                border-variant="warning"
            >
                <template #header>
                    <div class="card-header-wrapper">
                        <p class="card-header-text">{{ getCardTitle(order.state) }}</p>
                        <div class="header-spinner">
                            <b-spinner style="width: 1.5rem; height: 1.5rem;"  type="grow" variant="white"/>
                        </div>
                    </div>
                </template>
                <b-card-body>
                    <b-card-text>
                        Client : {{ order.user.firstName }} {{ order.user.lastName }}<br/>
                        Adresse : {{ order.user.address }}<br/>
                        Téléphone : {{ order.user.phone }}
                    </b-card-text>
                    <b-card-text>
                        Menu(s) acheté(s) :
                        <p class="menu-item" v-for="menu in order.menus">- {{ menu.name }}</p>
                    </b-card-text>
                </b-card-body>
                <b-button variant="warning" @click="acceptOrder(order)"><p class="white-text-button">Accepter la commande</p></b-button>
            </b-card> 
        </div>
    </section>
</template>

<style>

p {
    margin: 0;
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

.orders-section {
    margin: 50px;
}

.commands-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
}
</style>


