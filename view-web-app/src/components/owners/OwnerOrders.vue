<script setup lang="ts">
import useGlobalStore from '@/stores/store';
import config from "../../config.json";
import { onBeforeMount, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import OrderCard from '../orders/OrderCard.vue';

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
        console.log("orders", loadedOrders);
        console.log("livrerId", store.state.user?.id);
    }
}

onBeforeMount(() => {
    loadAllOrders(store.state.user?.restaurantId);
})

watch(() => store.state.user?.restaurantId, async (restaurantId: string | undefined) => {
    loadAllOrders(restaurantId);
});

</script>

<template>
    <section class="orders-section">
        <h2>Commandes</h2>
        <div class="commands-list">
            <OrderCard v-for="order in orders" :order="order"/>
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


