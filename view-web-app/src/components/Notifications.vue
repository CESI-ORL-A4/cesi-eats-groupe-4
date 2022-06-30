<script setup lang="ts">

import {onBeforeMount, ref} from "vue";
import {makeNotificationsRead, getNotifications, deleteNotification} from "@/modules/notificationAPI";
import {store} from "@/stores/store";
import ReloadIcon from "@/components/icons/ReloadIcon.vue"

let notifications = ref([])
const userId = localStorage.getItem('userId');
const charged = ref(false);

onBeforeMount(async () => {
  await updateNotifications();

})

const updateNotifications = async() =>{
  charged.value = false;
  store.commit("setNotificationCount", 0)
  if (userId)
  {
    notifications.value = await getNotifications(userId);
    notifications.value = notifications.value.reverse();
    notifications.value.forEach(notification =>{
      if (notification && notification.createdAt)
      {
        const date = new Date(notification.createdAt);
        notification.createdAt = date.toLocaleString();
      }
    })
    charged.value = true;
    makeNotificationsRead(userId);
  }
}

async function deleteNotificationEvent(notificationId: any) {
  console.log(notificationId);
  await deleteNotification(notificationId);
  notifications.value = notifications.value.filter((notification) => notification._id !== notificationId);
}

async function deleteNotificationsEvent(userId: any) {
  await deleteNotification(userId);
}

const fields = [
  {key: 'read', label: ' '},
  {key: 'createdAt', label: 'Date'},
  {key: 'description', label: 'Description'},
  {key: 'delete', label: ''},
]
</script>

<template>
  <div class="orders-header">
    <h2>Notifications :</h2>
    <span class="flex-grow"/>
    <div class="reload-button" @click="updateNotifications()">
      <ReloadIcon/>
    </div>
  </div>
  <template v-if="charged">
    <div class="content">
      <b-card >
        <b-media>
          <div>
            <b-table class="table" :items="notifications" :fields="fields" caption-top>
              <template  #cell(read)="notification" >
                <p class="new-text">{{notification.item.read===false?"NEW":""}}</p>
              </template>
              <template  #cell(createAd)="notification" >
                <p class="text">{{notification.item.created_at}} </p>
              </template>
              <template #cell(description)="notification" >
                <p class="text">{{notification.item.description}} </p>
              </template>
              <template #cell(delete)="notification" >
                <b-button size="sm" pill variant="success" class="button" @click="deleteNotificationEvent(notification.item._id)">Supprimer</b-button>
              </template>
            </b-table>
          </div>
          <template #aside>
            <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
          </template>
        </b-media>
      </b-card>
    </div>
  </template>
</template>

<style scoped>
.title{
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 30px;
  font-family: 'PoppinsSemiBold',serif;
}
.content{
  font-family: 'PoppinsSemiBold',serif;
}
.button{
  font-family: 'Poppins',serif;
}
.new-text{
  color: #30e330;
  font-style: italic;
  font-size: 17px;
}
p{
  margin:0;
}
.reload-button {
  width: 30px;
  cursor: pointer;
}

.flex-grow {
  flex: 1;
}

.orders-header {
  display: flex;
  align-items: center;
  margin: 1.5% 3%;
}
</style>
