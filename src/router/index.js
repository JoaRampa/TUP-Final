import { createRouter, createWebHashHistory  } from 'vue-router'
import listProducts from '../components/products/listProducts.vue'
import cmSales from '@/components/cmSales.vue';
/*import cmItems from '@/components/ingresos/cmItems.vue';
import cmIngresos from '@/components/ingresos/cmIngresos.vue';
import CmSummary from '@/components/cmSummary.vue';
import cmBills from '@/components/cmBills.vue';
import vAddProducts from '@/views/vAddProducts.vue';*/

const routes = [
  {
    path: '/',
    name: 'sales',
    component: cmSales,
  },
  {
    path: '/stock',
    name: 'listProducts',
    component: listProducts,
  },
  /*{
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
  },*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
