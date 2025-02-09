import { createRouter, createWebHashHistory  } from 'vue-router'
import vListProducts from '../views/vListProducts.vue'
import SalesView from '@/views/SalesView.vue';
import vItems from '@/views/vItems.vue';
import vAddProduct from '@/views/vAddProduct.vue';
import vIngreso from '@/views/vIngreso.vue';
import CmSummary from '@/components/cmSummary.vue';
import cmBills from '@/components/cmBills.vue';

const routes = [
  {
    path: '/',
    name: 'sales',
    component: SalesView,
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: vAddProduct,
  },
  {
    path: '/listProducts',
    name: 'listProducts',
    component: vListProducts,
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: vIngreso,
  },
  {
    path: '/items',
    name: 'items',
    component: vItems,
  },
  {
    path: '/summary',
    name: 'summary',
    component: CmSummary,
  },
  {
    path: '/bills',
    name: 'bills',
    component: cmBills,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
