<script lang="ts" setup>
import router from "@/router";
import {onBeforeMount, ref, watch} from "vue";
import {getMenus} from "@/modules/menuAPI";
import useGlobalStore from "@/stores/store";
import {getArticles} from "@/modules/articleAPI";

const store = useGlobalStore();

function pushMenuUpdatePage(id: string) {
  router.push({path: `/owner/menu/${id}`})
}

function pushMenuAddPage() {
  router.push({name: "owner-menu-add"})
}


watch(() => store.state.user?.restaurantId, async (restaurantId) => {
  if (restaurantId) {
    const menus = await getMenus(restaurantId);
    console.log(menus);
    if (menus) {
      list_menus.value = menus;
    }
  }
}, { immediate: true });


const list_menus = ref([]);


</script>

<template>
  <div>
    <div class="flex-container-add_menu">
      <div><h2 class="line-up">Menus disponibles dans votre restaurant :</h2></div>
      <div>
        <p>
          <button type="button" class="btn_manage" @click="pushMenuAddPage">Ajouter un menu</button>
        </p>
        <br></div>
    </div>
    <div class="menu-wrapper">
      <b-card-group columns>
      <div class="menu-card" :key="menu" v-for="menu in list_menus"
           @click="pushMenuUpdatePage(menu.id)">
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

            <b-button href="#" variant="success">Modifier / Supprimer le menu</b-button>
          </b-card>
        </div>
      </div>
      </b-card-group>
    </div>
  </div>
</template>

<style scoped>
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
  justify-content: center;
}

.menu-card {
  padding: 10px;
}
</style>