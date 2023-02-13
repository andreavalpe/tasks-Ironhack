import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import './assets/style.css';

// import VCalendar from 'v-calendar';
// import Vue from 'vue';

// Vue.use(VCalendar);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
