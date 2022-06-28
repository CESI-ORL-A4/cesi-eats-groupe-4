import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3';
import Datepicker from '@vuepic/vue-datepicker';
import Toast, { POSITION } from "vue-toastification";

import "vue-toastification/dist/index.css";
import '@vuepic/vue-datepicker/dist/main.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { store, storeKey } from './stores/store';
import axios from 'axios';

const app = createApp(App)

app.use(BootstrapVue3);
app.use(Toast, {
    position: POSITION.TOP_CENTER
});
app.component('Datepicker', Datepicker);
app.use(router)
app.use(store, storeKey);
app.mount('#app')

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('jwt');
    if (token && config.headers) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
})
