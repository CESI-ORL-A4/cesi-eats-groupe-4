<script setup lang="ts">
import { ref } from "vue";
import useGlobalStore from "@/stores/store";
import {computed} from "@vue/reactivity";
import config from "../config.json";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const toast = useToast();
const router = useRouter();
const isLoading = ref(false);

const cart_menus = computed(() => store.state.cart?.menus);
const totalPrice = computed(() => {
  if (store.state.cart) {
    const menus = store.state.cart.menus;
    let sum = 0;
    menus.forEach((menu: any) => {
      sum += parseFloat(menu.price);
    })
    return sum;
  }
  return 0;
});

function deleteCart(){
  store.commit("clearCart");
}

function deleteEntry(data: any) {
  store.commit("cartRemoveMenuByIndex", data.index);
}

function checkout() {
    const cart = store.state.cart;
    if (cart) {
        const payload = {
            restaurantId: cart.restaurantId,
            userId: store.state.user?.id,
            menuIds: cart.menus.map(menu => menu._id)
        }
        isLoading.value = true;
        axios.post(`${config.GATEWAY_URL}/orders`, payload).then((_) => {
            toast.success("Commande payée avec succès, elle est maintenant en cours de préparation !", {
                timeout: 5000
            });
            isLoading.value = false;
            router.push({ name: "restaurants" });
            store.commit("clearCart");
        }, (error) => {
            let errorMessage = "Une erreur est survenue...";
            if (error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            toast.error(errorMessage, {
                timeout: 10000
            });
            isLoading.value = false;
        });
    }
}

const fields = [
  {key: 'name', label: 'Nom'},
  {key: 'description', label: 'Description'},
  {key: 'price', label: 'Prix'},
  {key: 'delete', label: ''}
]
</script>

<template>
  <div class="content">
    <b-card >
      <b-media>
        <div>
          <h5 class="mt-0">Ma Commande : </h5><br/>
          <b-table :items="cart_menus" :fields="fields" caption-top>
            <template #cell(delete)="row" >
              <b-button size="sm" variant="dark" @click="deleteEntry(row)">Supprimer</b-button>
            </template>
          </b-table>
          <p class="mt-1">Prix total de la commande : {{ totalPrice }}€</p>
        </div>
        <template #aside>
          <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        </template>


        <div class="cart-content">
          <b-card
              v-for="menu in list_menus" :key="menu"
              :title="menu.name"
              tag="article"
              class="mb-2"
          >
            <b-card-text>
              {{menu.description}}
            </b-card-text>
            <p>
              Prix : {{menu.price}} €
            </p>
            <ul>
              <li>
                Article
                <ul>
                  <li v-for="article in menu.articles" :key="article">{{ article.name }}</li>
                </ul>
              </li>
            </ul>
          </b-card>
        </div>
        <b-spinner v-if="isLoading" variant="success"/>
        <div v-if="!isLoading" class="btnWrapper">
          <b-button class="button" variant="warning" @click="deleteCart()"> Supprimer la commande</b-button>
          <b-button class="button" variant="success" @click="checkout()"> Payer la commande</b-button>
        </div>
      </b-media>
    </b-card>
  </div>
</template>


<style scoped>
.flex-container{
  display: flex;
}
.btnWrapper{
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
}
.button{
  justify-content: center;
}

.cart-content{
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: left;
}
.content{
  padding: 60px 150px 120px;
}
.mb-2{
  margin-left: 40px;
  max-width: 15rem;
}
.mt-1{
  font-size: 30px;
}

.mt-0{
  font-size: 45px;
}

</style>
