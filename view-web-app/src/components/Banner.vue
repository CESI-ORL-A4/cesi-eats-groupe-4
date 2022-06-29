<script setup lang="ts">
import { logoutAPI } from "@/modules/authAPI";
import useGlobalStore from "@/stores/store";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import LogoutIcon from "./icons/LogoutIcon.vue";
import NotificationIcon from "./icons/NotificationIcon.vue";

const store = useGlobalStore();
const router = useRouter();

const user = computed(() => store.state.user);;
const isLogged = computed(() => !!store.state.user);
const isLoadingUser = computed(() => store.state.isLoadingUserData);
const role = localStorage.getItem('role')


function redirection(){
  if(role == "BASIC"){
    router.push('/restaurants')
  }
  else{
    router.push('/home')
  }
}


const personalButtonText = computed(() => {
    const role = store.state.user?.role;
    if (!role) return "";
    return role === "BASIC" ? "Panier" : "Dashboard";
});
const personalButtonLink = computed(() => {
    const role = store.state.user?.role;
    if (!role) return "";
    return role === "BASIC" ? "/home" : "/home";
});

function logout() {
    logoutAPI(store);
    router.push("/home");
}
</script>

<template>
  <header class="flex-container">
    <p class="header-title" @click="redirection()">Cesi <span>Eats</span></p>
    <div v-if="!isLoadingUser" class="right-nav">
      <div class="logged-items-wrapper" v-show="isLogged">
        <p class="user-name" @click="router.push('/account')">{{ user?.firstName }} - Mon compte</p>
        <p class="personal-button" @click="router.push(personalButtonLink)">{{ personalButtonText }}</p>
        <div class="notification-icon">
            <NotificationIcon/>
        </div>
        <div class="logout-icon" @click="logout()">
            <LogoutIcon/>
        </div>
      </div>
      <button v-show="!isLogged" @click="router.push('/signIn')" type="button" class="btn_sign_in">Connexion</button>
      <button v-show="!isLogged" @click="router.push('/signUp')" type="button" class="btn_sign_up">Inscription</button>
    </div>
  </header>
</template>


<style scoped>
.logged-items-wrapper {
    display: flex;
    align-items: center;
}

.personal-button {
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 8px 30px;
    cursor: pointer;
    margin: 0 12px;
}

.logout-icon {
    width: 30px;
    cursor: pointer;
}

.logout-icon:hover {
    opacity: 0.9;
}

.notification-icon {
    width: 25px;
    margin-right: 10px;
    cursor: pointer;
}

.user-name {
    margin: 0;
    cursor: pointer;
    font-family: Poppins;
    font-size: 16px;
}

.user-name:hover {
    color: #06C167; 
}

button {
  outline: none;
  border: none;
  font-family: Poppins;
}

button:hover {
  opacity: 0.9;
}

.btn_notif {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 10px;
  width: 43px;
  height: 43px;
}

.btn_account {
  margin-right: 20px;
  background-color: #F6F6F6;
  border-radius: 100px;
  width: 126px;
  height: 43px;
}

.btn_sign_up {
  font-size: 15px;
  background-color: white;
  border-radius: 100px;
  padding: 8px 30px 8px 30px;
}

.btn_sign_in {
  font-size: 14px;
  margin-right: 20px;
  background-color: white;
  border-radius: 100px;
  padding: 8px 30px 8px 30px;
}


.flex-container {
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 20px;
  gap: 5px;
  box-shadow: 0 5px 20px black;
}

.flex-container > div {
  border-radius: 5px;
  padding: 0px;
}

p {
  margin: 12px;
}

.header-title {
  /* flex:0 1 auto; */
  font-family: "Poppins";
  font-size: 28px;
  margin-left: 15px;
  flex-shrink: 1;
  align-self: center;
  color: white;
  margin: 0;
  cursor: pointer;
}

.header-title span {
  color: #06C167;
  font-family: "PoppinsSemiBold";
}

.right-nav {
  /* flex:0 1 auto; */
  align-self: center;
  color: white;
}
</style>
