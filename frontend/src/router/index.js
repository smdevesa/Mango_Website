import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../pages/GeneralView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GeneralView
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../pages/TransferWindow.vue')
    }
  ]
})

export default router