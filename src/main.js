import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

if (window.location.protocol === 'file:') {
  window.env = { MODE: 'electron' };
}

createApp(App).use(router).use(store).mount('#app');
