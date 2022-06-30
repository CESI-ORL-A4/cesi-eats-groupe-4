<script setup lang="ts">


import {onBeforeMount, ref} from "vue";
import {addDelivery, deliverieDelivered, getInProcessDeliveries, getOrderReadytoship} from "@/modules/deliveryAPI";
import axios from "axios";
import config from "@/config.json";
import {useToast} from "vue-toastification";

const charge = ref(false);
const toast = useToast();

const userId = localStorage.getItem("userId");
const processDeliveries = ref([]);
const haveProcessDelivery = ref(true);

const allOrder = ref([]);

async function delivererOrder(deliveryId:any) {
  debugger;
  charge.value = false;
  const response = await deliverieDelivered(deliveryId);
  if (!response) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    await chargeOrder();
    toast.success(`Commande livrée !`, {
      timeout: 5000
    });
  }
}

async function createDelivery(orderId:any) {
  charge.value = false;
  const response = await addDelivery({orderId, delivererId: userId});
  if (!response) {
    toast.error("Une erreur est survenue...", {
      timeout: 10000
    });
  } else {
    await chargeOrder();
    toast.success(`Le commande a bien été accepté !`, {
      timeout: 5000
    });
  }
}

async function loadRestaurant(restaurantId: string) {
  return (await axios.get(`${config.GATEWAY_URL}/catalog/restaurants/${restaurantId}`)).data.restaurant;
}

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
    const menus: any[] = await loadMenus(order.restaurantId, order);
    const userResponse = await axios.get(`${config.GATEWAY_URL}/users/${order.userId}`);
    const user = userResponse.data;
    finalOrders.push({
      id: order._id,
      state: order.state,
      user,
      menus,
      restaurant:order.restaurant
    })
  }
  return finalOrders;
}

const chargeOrder=async ()=>{
  if (userId) {

    let delivery = (await getInProcessDeliveries(userId))[0];
    if (delivery) {
      haveProcessDelivery.value = true;
      let order = (await axios.get(`${config.GATEWAY_URL}/orders/${delivery.orderId}`)).data;
      const restaurant = await loadRestaurant(order.restaurantId);
      order = [{...order,restaurant,delivery}];
      await showPrepareCommand(order);
    }
    else{
      await showAlllCommand();
      haveProcessDelivery.value = false;
    }
    charge.value = true;
  }
}

onBeforeMount(async () => {
  await chargeOrder();
})

const showPrepareCommand=async(process: any)=>{
  processDeliveries.value = await loadOrdersDetails(process);
  haveProcessDelivery.value = true;
  console.log(processDeliveries.value);
}

const showAlllCommand=async()=>{
  const orders = await getOrderReadytoship();
  let orderUpdate = [];
  if (orders && orders.length>0) {
    for(const order of orders)
    {
      const restaurant = await loadRestaurant(order.restaurantId)
      orderUpdate.push({...order,restaurant});
    }
    allOrder.value = await loadOrdersDetails(orderUpdate);
    console.log(allOrder);
  }
}

const fields = [
  {key: 'restaurant', label: 'Nom du restaurant'},
  {key: 'restaurantAddress', label: 'Addresse du restaurant'},
  {key: 'clientInfos', label: 'Informations client'},
  {key: 'menus', label: 'Composition'},
  {key: 'accept', label: ''},
]


</script>


<template>
    <div v-if="charge" class="containerBig">
      <div v-if="!haveProcessDelivery">
        <p class="title">Liste des commandes :</p>
        <div class="content">
          <b-card >
            <b-media>
              <div>
                <b-table class="table" :items="allOrder" :fields="fields" caption-top>
                  <template  #cell(restaurant)="order" >
                    <p class="new-text">{{order.item.restaurant.name}} <br> {{order.item.restaurant.description}}</p>
                  </template>
                  <template  #cell(restaurantAddress)="order" >
                    <p >{{order.item.restaurant.address}}</p>
                  </template>
                  <template  #cell(clientInfos)="order" >
                    <p >{{order.item.user.firstName}} {{order.item.user.lastName}} <br>{{order.item.user.address}}<br>{{order.item.user.phone}}</p>
                  </template>
                  <template  #cell(menus)="order" >
                    <p>
                      <template v-for="menu in order.item.menus">
                        {{menu.name}}<br>
                      </template>
                    </p>
                  </template>
                  <template #cell(accept)="order" >
                    <b-button size="sm" pill variant="success" class="button" @click="createDelivery(order.item.id)">Accepter</b-button>
                  </template>
                </b-table>
              </div>
            </b-media>
          </b-card>
        </div>


      </div>
      <div v-if="haveProcessDelivery">
        <p class="title">Commande en cours de livraison :</p>
        <div class="card-container">
        <b-card
            no-body
            style="max-width: 20rem;"
            :img-src="processDeliveries[0].restaurant.image"
            img-alt="Restaurant image"
            img-midle
        >
          <template #header>
            <h4 class="mb-0">Client</h4>
          </template>

          <b-card-body>
            <b-card-title>{{processDeliveries[0].restaurant.name}}</b-card-title>
            <b-card-text>
              {{processDeliveries[0].restaurant.description}}
            </b-card-text>
          </b-card-body>


          <b-list-group flush>
            <b-list-group-item>Addresse : {{processDeliveries[0].restaurant.address}}</b-list-group-item>
          </b-list-group>

          <b-card-body>
            <b-card-title>Numéro de commande :</b-card-title>
            {{processDeliveries[0].id}}
          </b-card-body>
        </b-card>
          <svg class="svg" height="512" id="svg2" version="1.1" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs4"/><g id="layer1" transform="translate(0,-540.36218)"><path d="m 23.6778,780.69875 c 0,10.44229 0,20.88458 0,31.32687 l 374.06891,0 0.0162,24.85718 90.55929,-40.52062 -90.55929,-40.52062 -0.0162,24.85719 z" id="path3035" style="fill:#000000;stroke:none"/></g></svg>
        <b-card
            no-body
            style="max-width: 20rem;"
            img-alt="Restaurant image"
            img-src="https://cesieats.s3.amazonaws.com/client.png"
            img-midle
        >
          <template #header>
            <h4 class="mb-0">Client</h4>
          </template>

          <b-card-body>
            <b-card-title>{{processDeliveries[0].user.firstName}} {{processDeliveries[0].user.lastName}}</b-card-title>
          </b-card-body>


          <b-list-group flush>
            <b-list-group-item>Addresse : {{processDeliveries[0].user.address}}</b-list-group-item>
            <b-list-group-item>Numéro de téléphone : {{processDeliveries[0].user.phone}}</b-list-group-item>
          </b-list-group>

          <b-card-body>
            <b-card-title>Numéro de commande :</b-card-title>
            {{processDeliveries[0].id}}
          </b-card-body>
          <b-card-body>
            <b-card-title>Menu :</b-card-title>
            <b-list-group flush>
              <template v-for="menu in processDeliveries[0].menus">
                  <p>Nom : {{menu.name}}</p>
              </template>
            </b-list-group>
          </b-card-body>
          <template v-if="processDeliveries[0].state === 'UNDER_SHIPMENT'">
            <b-button @click="delivererOrder(processDeliveries[0].id)" variant="outline-success">Valider la livraison</b-button>
          </template>
          <template v-if="processDeliveries[0].state === 'WAITING_PICKUP'">
            <p class="waitingText" >En attente de récupération de la commande chez le restaurateur</p>
          </template>
        </b-card>
        </div>

      </div>

    </div>
</template>

<style scoped>
.waitingText{
  color: red;
  text-align: center;
  font-family: PoppinsSemiBold;
}

.title{
  font-family: PoppinsSemiBold;
  font-size: 155%;
}

p{
  margin : 0;
  font-family: PoppinsMedium;
}
.containerBig{
  margin: 2% 15%;
  padding-bottom: 5%;
}

.card-container{
  margin-top: 2%;
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.big{
  margin: 0 13%;
}
</style>
