import { createRouter, createWebHashHistory  } from 'vue-router'
import listProducts from '../components/products/listProducts.vue'
import cmSales from '@/components/cmSales.vue';
import cmItems from '@/components/ingresos/cmItems.vue';
//import newProduct from '@/components/products/newProduct.vue';
import cmIngresos from '@/components/ingresos/cmIngresos.vue';
import CmSummary from '@/components/cmSummary.vue';
import cmBills from '@/components/cmBills.vue';
import cmStock from '@/components/cmStock.vue';
//import cmList from '@/components/listNegocio/cmList.vue';
import vListNegocio from '@/views/vListNegocio.vue';
import vAddProducts from '@/views/vAddProducts.vue';

const routes = [
  {
    path: '/',
    name: 'sales',
    component: cmSales,
  },
  {
    path: '/addProduct',
    name: 'vAddProducts',
    component: vAddProducts,
  },
  {
    path: '/listProducts',
    name: 'listProducts',
    component: listProducts,
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: cmIngresos,
  },
  {
    path: '/items',
    name: 'items',
    component: cmItems,
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
  {
    path: '/stock',
    name: 'stock',
    component: cmStock,
  },
  {
    path: '/listaNegocio',
    name: 'vListNegocio',
    component: vListNegocio,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
