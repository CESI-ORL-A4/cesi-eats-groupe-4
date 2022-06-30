<script setup lang="ts">
import useGlobalStore from '@/stores/store';
import config from "../../config.json";
import { ref, watch } from 'vue';
import axios from 'axios';

const store = useGlobalStore();
const orders = ref<any[]>();

watch(() => store.state.user?.restaurantId, (restaurantId: string | undefined) => {
    if (restaurantId) {
        axios.get(`${config.GATEWAY_URL}/restaurants/${restaurantId}/orders/in-process`).then( async (response) => {
            const ordersList = response.data;
            console.log("result", ordersList);
            // fetch details for all orders
            const finalOrders: any []= [];
            ordersList.forEach(async (order: any) => {
                // fetch user details
                const userResponse = await axios.get(`${config.GATEWAY_URL}/users/${order.userId}`);
                const user = userResponse.data; 
                // fetch all menus details
                const menus: any[] = [];
                order.menuIds.forEach(async (menuId: string) => {
                    menus.push((await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/${restaurantId}/menus/${menuId}`)).data.menu);
                });

                finalOrders.push({
                    id: order._id,
                    state: order.state,
                    user,
                    menus
                })
            });
            orders.value = finalOrders;
            console.log("ORDERS", orders.value);
        })
    }
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
            </b-card> 
        </div>
    </section>
</template>

<style>

p {
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


