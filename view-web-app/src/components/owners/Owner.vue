<script lang="ts" setup>
import router from "@/router";

function ownerProductsPage() {
  router.push({name: "owner-products"})
}

function ownerCommandsPage() {
  router.push({name: "owner-orders"})
}

function ownerHistoryOrderPage() {
  router.push({name: "owner-history-order"})
}

function ownerMenusPage() {
  router.push({name: "owner-menus"})
}

function ownerStatsPage() {
  router.push({name: "owner-stats"})
}

function ownerAccountPage() {
  router.push({name: "owner-account-update"})
}
</script>

<template>
  <div class="line-up">
    <div>
      <b-card-group deck>
        <b-card
            border-variant="dark" header="Gestion des informations du restaurant" header-bg-variant="dark"
            header-text-variant="white" align="center">
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/account.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <b-button @click="ownerAccountPage" variant="dark">Accéder</b-button>
          </b-card-footer>
        </b-card>
        <b-card border-variant="dark" header="Gestion des articles" header-bg-variant="dark"
                header-text-variant="white" align="center">
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/product.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <b-button @click="ownerProductsPage" variant="dark">Accéder</b-button>
          </b-card-footer>
        </b-card>
        <b-card border-variant="dark" header="Historique des commandes" header-bg-variant="dark"
                header-text-variant="white" align="center">
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/history.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <b-button @click="ownerHistoryOrderPage" variant="dark">Accéder</b-button>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </div>
    <div class="mt-3">
      <b-card-group deck>
        <b-card
            border-variant="dark"
            header="Gestion des commandes"
            header-bg-variant="dark"
            header-text-variant="white"
            align="center"
        >
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/command.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <b-button @click="ownerCommandsPage" variant="dark">Accéder</b-button>
          </b-card-footer>
        </b-card>
        <b-card border-variant="dark" header="Gestion des menus" header-bg-variant="dark"
                header-text-variant="white" align="center">
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/menu.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <b-button @click="ownerMenusPage" variant="dark">Accéder</b-button>
          </b-card-footer>
        </b-card>
        <b-card border-variant="dark" header="Statistiques" header-bg-variant="dark"
                header-text-variant="white" align="center">
          <b-card-text><img height="100" alt="Menu" src="@/assets/images/owners/stats.png"></b-card-text>
          <b-card-footer footer-bg-variant="white">
            <!--          <b-button @click="ownerStatsPage" variant="dark">Accéder</b-button> -->
            <p>#Soon</p>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}


.line-up {
  margin: 70px;
}
</style>


