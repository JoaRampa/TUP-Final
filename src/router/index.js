import { createRouter, createWebHashHistory  } from 'vue-router'
import listProducts from '../components/products/listProducts.vue'
import vHome from '@/views/vHome.vue'
/*import CmSummary from '@/components/cmSummary.vue';
import cmBills from '@/components/cmBills.vue';*/

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
  /*{
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
