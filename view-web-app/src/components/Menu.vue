<script setup lang="ts">

import router from "@/router";
import {onBeforeMount, ref, watch} from "vue";
import {getMenus} from "@/modules/menuAPI";
import useGlobalStore from "@/stores/store";
import {getArticles} from "@/modules/articleAPI";
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";

const store = useGlobalStore();
const toast = useToast();
const role = store.state.user?.role;
const route = useRoute();


function addMenuToCart(menu: any) {
  const restaurantId = route.params.id;
  if (!store.state.cart || (store.state.cart && store.state.cart.restaurantId === restaurantId)) {
    store.commit("cartAddMenu", {
      restaurantId,
      menu
    });
    toast.success(`Le menu ${menu.name} a été ajouté au panier`, { timeout: 2000 });
  } else {
    toast.error("Une commande est déjà en cours pour un autre restaurant ! Visitez votre panier");
  }
}



watch(() => store.state.cart?.menus, (menus: any[] | undefined) => {
  if (menus) {
    console.log("MENUS CHANGE", menus);
  }
});

watch(() => store.state.user?.restaurantId, async (restaurantId) => {
  if (restaurantId) {
    const menus = await getMenus(restaurantId);
    console.log(menus);
    if (menus) {
      list_menus.value = menus;
    }
  }

  if (route.params.id) {
    const menus = await getMenus(route.params.id as string);
    console.log(menus);
    if (menus) {
      list_menus.value = menus;
    }
  }

}, {immediate: true});


const list_menus = ref([]);
</script>

<template>
  <div><br/>
    <div class="BasicTitle"><h1> Nos Menus :</h1></div><br/>
    <div class="menu-wrapper">
      <b-card-group>
        <div class="menu-card" :key="menu" v-for="menu in list_menus">
          <div>
            <b-card
                :title="menu.name"
                :img-src="menu.linkImage"
                :img-alt="menu.name"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
              <b-card-text v-for="article in menu.articles">
                <div v-if="article != null">
                  - {{ article.name }}
                </div>
              </b-card-text>
              <div><p class="price">Prix du menu {{menu.price}}€</p></div>
              <div v-if="role === 'BASIC' ">
                <b-button @click="addMenuToCart(menu)" variant="success">Ajouter au panier</b-button>
              </div>
            </b-card>
          </div>
        </div>
      </b-card-group>
    </div>
  </div>
</template>



<style scoped>
.price{
  font-weight: bold;
}
.flex-container-add_menu {
  display: flex;
  justify-content: space-around;
}

.line-up {
  margin-top: 20px;
  margin-left: 60px;
}

.btn_manage {
  margin-top: 20px;
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 200px;
  height: 43px;
}

.menu-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.BasicTitle{
  margin-left: 80px;
}

.menu-card {
  margin-left: 80px;
}

</style>