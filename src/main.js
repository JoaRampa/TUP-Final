import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

if (window.location.protocol === 'file:') {
  window.env = { MODE: 'electron' };
}

createApp(App).use(router).mount('#app')
