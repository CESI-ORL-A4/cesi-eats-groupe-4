<script setup lang="ts">
import useGlobalStore from "@/stores/store";
import {computed} from "@vue/reactivity";

const store = useGlobalStore();
let cart = store.state.cart;

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

function deleteEntry(data: any) {
  store.commit("cartRemoveMenuByIndex", data.index);
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
          <b-table :items="cart_menus" :fields="fields" caption-top>
            <template #cell(delete)="row" >
              <b-button size="sm" variant="dark" @click="deleteEntry(row)">Supprimer</b-button>
            </template>
          </b-table>
          <p>Prix {{ totalPrice }}</p>
        </div>
        <template #aside>
          <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        </template>

        <h5 class="mt-0">Ma Commande : </h5>
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
        <div class="btnWrapper">
          <b-button class="button" variant="warning"> Supprimer la commande</b-button>
          <b-button class="button" variant="success"> Payer la commande</b-button>
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

</style>