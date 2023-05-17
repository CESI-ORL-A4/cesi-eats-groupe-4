<script setup lang="ts">
import useGlobalStore from '@/stores/store';
import config from "../../config.json";
import { onBeforeMount, ref, watch } from 'vue';
import axios from 'axios';
import OrderCard from '../orders/OrderCard.vue';
import ReloadIcon from '../icons/ReloadIcon.vue';

const store = useGlobalStore();
const orders = ref<any[]>([]);
const isLoading = ref(true);

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

async function loadAllOrders() {
    isLoading.value = true;
    const restaurantId = store.state.user?.restaurantId;
    if (restaurantId) {
        const ordersList = (await axios.get(`${config.GATEWAY_URL}/restaurants/${restaurantId}/orders/in-process`)).data;
        const loadedOrders = await loadOrdersDetails(restaurantId, ordersList);
        orders.value = loadedOrders;
        isLoading.value = false;
    }
}

onBeforeMount(() => {
    loadAllOrders();
})

watch(() => store.state.user?.restaurantId, async (restaurantId: string | undefined) => {
    loadAllOrders();
});

function deleteOrderCallback(order: any) {
    const index = orders.value.findIndex((o) => o.id === order.id);
    orders.value.splice(index, 1);
}

</script>

<template>
    <section class="orders-section">
        <div class="orders-header">
            <h2>Gestion des commandes</h2>
            <span class="flex-grow"/>
            <div class="reload-button" @click="loadAllOrders()">
                <ReloadIcon/>
            </div>
        </div>
        <div class="loading-spinner-wrapper" v-if="isLoading">
            <b-spinner style="width: 5rem; height: 5rem;" variant="success"/>
        </div>
        <b-card-group columns v-if="!isLoading">
            <div class="order-card" v-for="order in orders">
                <OrderCard :order="order" @delete-order="deleteOrderCallback"/>
            </div>
        </b-card-group>
    </section>
</template>

<style scoped>

.orders-section {
    margin: 50px;
}

.orders-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.reload-button {
    width: 30px;
    cursor: pointer;
}

.flex-grow {
    flex: 1;
}

.commands-list {
    margin-top: 100px;
    width: 100%;
}

.loading-spinner-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

</style>


