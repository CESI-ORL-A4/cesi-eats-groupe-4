<script setup lang="ts">
import useGlobalStore, { store } from '@/stores/store';
import OrderCard from '../../components/orders/OrderCard.vue';
import ReloadIcon from '../../components/icons/ReloadIcon.vue';
import {onBeforeMount, ref, watch} from "vue";
import axios from "axios";
import config from "@/config.json";
import {getOrderByUserId, getOrderHistoryByRestaurantId} from "@/modules/orderAPI";

const orders = ref<any[]>([]);
const isLoading = ref(true);

async function loadMenus(restaurantId: string, order: any) {
  const menus: any[] = [];
  for (const menuId of order.menuIds) {
    menus.push((await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/${restaurantId}/menus/${menuId}`)).data.menu);
  }
  return menus;
}

async function loadOrdersDetails(ordersList: any[]) {
  const finalOrders: any []= [];
  for (const order of ordersList) {
    // fetch user details
    const menus: any[] = await loadMenus(order.restaurantId, order);
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
    const ordersList = await getOrderHistoryByRestaurantId(restaurantId);
    const loadedOrders = await loadOrdersDetails(ordersList);
    orders.value = loadedOrders;
    isLoading.value = false;
  }
}
watch(() => store.state.user?.restaurantId, async (userId: string | undefined) => {
  loadAllOrders();
});

onBeforeMount(() => {
  loadAllOrders();
})
</script>

<template>
  <section class="orders-section">
    <div class="orders-header">
      <h2>Historique des commandes :</h2>
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
        <OrderCard :order="order" hiddeActionsButton=true @delete-order="deleteOrderCallback"/>
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
