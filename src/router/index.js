import { createRouter, createWebHashHistory  } from 'vue-router'
import listProducts from '../components/products/listProducts.vue'
import vHome from '@/views/vHome.vue'
import cmTransactions from '../components/cmTransactions.vue';

const routes = [
  {
    path: '/',
    name: 'vHome',
    component: vHome,
  },
  {
    path: '/stock',
    name: 'listProducts',
    component: listProducts,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: cmTransactions,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
