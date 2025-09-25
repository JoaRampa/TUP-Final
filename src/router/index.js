import { createRouter, createWebHashHistory  } from 'vue-router'
import listProducts from '../components/products/listedStock.vue'
import vHome from '@/views/vHome.vue'
import cmTransactions from '../components/cmTransactions.vue';
import balance from '../components/balance.vue';
import dataExpenses from '../components/expenses/history.vue';

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
    path: '/sales',
    name: 'sales',
    component: cmTransactions,
  },
  {
    path: '/balance',
    name: 'balance',
    component: balance,
  },
    {
    path: '/expenses',
    name: 'expenses',
    component: dataExpenses,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
