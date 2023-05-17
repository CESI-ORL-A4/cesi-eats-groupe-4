<script setup lang="ts">
import {onBeforeMount, onBeforeUpdate, ref} from "vue";
import {getNotificationsCount} from "@/modules/notificationAPI";
import {computed} from "@vue/reactivity";
import {store} from "@/stores/store";

const notificationUnreadCount = ref(0);

onBeforeMount(async () => {
  if (localStorage.getItem('userId')){
    const count = await getNotificationsCount(localStorage.getItem('userId'))
    store.commit("setNotificationCount", count);
  }

})

const notificationCount = computed(() => {
  return store.state.notificationCount;
});
</script>

<template>
<svg fill="white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 30" id="Layer_30"><path class="cls-1" d="M27,27H5a1,1,0,0,1-.89-1.45,18.14,18.14,0,0,0,1.89-8V14a10,10,0,0,1,20,0v3.53a18.14,18.14,0,0,0,1.89,8A1,1,0,0,1,27,27ZM6.55,25h18.9A20.14,20.14,0,0,1,24,17.53V14A8,8,0,0,0,8,14v3.53A20.14,20.14,0,0,1,6.55,25Z"/><path class="cls-1" d="M16,31a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,.88,2.12,3.08,3.08,0,0,0,4.24,0,1,1,0,0,1,1.42,1.42A5,5,0,0,1,16,31Z"/><path class="cls-1" d="M16,6a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V5A1,1,0,0,1,16,6Z"/></g></svg>
<span class="unseen-count">{{notificationCount}}</span>
</template>
<style scoped>
.unseen-count {
  right: 3.4rem;
  width: 22px;
  height: 22px;
  background: #06c167;
  border-radius: 50%;
  top: 1.2rem;
  position: absolute;
  box-shadow: 0 2px 5px rgb(0 0 0 / 50%);
  text-align: center;
  font-family: sans-serif;
  color: #fff;
}
</style>
